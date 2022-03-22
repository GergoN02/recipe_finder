import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepo";
import { ServerContext } from "../types";
import { LoginInfo, RegInfo, UserResponse } from "./ResTypes";

@Resolver()
export class UserResolver {

    //WHO AM I

    @Query(() => User, { nullable: true })
    async whoami(
        @Ctx() { req }: ServerContext
    ) {
        //not logged in
        if (!req.session!.userId) {
            return null
        }

        const user = await User.findOne(req.session!.userId);
        return user;
    }

    //REGISTER

    @Mutation(() => UserResponse)
    async register(
        @Arg("user_info") user_info: RegInfo,
        @Ctx() { req }: ServerContext
    ): Promise<UserResponse> {

        if (user_info.user_name.length <= 2) {
            return {
                errors: [{
                    field: "username",
                    message: "username needs to be at least 3 characters"
                }]
            };
        }
        if (!user_info.email.includes('@')) {
            return {
                errors: [{
                    field: "email",
                    message: "a valid email is required"
                }]
            };
        }
        if (user_info.password.length <= 2) {
            return {
                errors: [{
                    field: "password",
                    message: "password needs to be at least 3 characters"
                }]
            };
        }
        if (await User.findOne({ user_name: user_info.user_name })) {
            return {
                errors: [{
                    field: "username",
                    message: "user already exitst"
                }]
            }
        }

        if (await User.findOne({ email: user_info.email })) {
            return {
                errors: [{
                    field: "email",
                    message: "email already registered"
                }]
            }
        }

        const hashedPass = await argon2.hash(user_info.password)
        const user = User.create({ user_name: user_info.user_name, email: user_info.email, password: hashedPass });
        await user.save();

        req.session!.userId = user.id;
        return { user };
    }

    //LOGIN

    @Mutation(() => UserResponse)
    async login(
        @Arg("user_info") user_info: LoginInfo,
        @Ctx() { req }: ServerContext
    ): Promise<UserResponse> {
        const userRepo = getCustomRepository(UserRepository);
        const user = user_info.username.includes('@') ? await userRepo.findByEmail(user_info.username) : await userRepo.findByUserName(user_info.username);
        if (!user) {
            return {
                errors: [{
                    field: "username",
                    message: "username or email doesn't exist"
                }]
            };
        }

        const validate = await argon2.verify(user.password, user_info.password);

        if (!validate) {
            return {
                errors: [{
                    field: "password",
                    message: "Incorrect creditentials"
                }]
            };
        }

        req.session!.userId = user.id;

        return { user };
    }
}