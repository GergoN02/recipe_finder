import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepo";
import { LoginInfo, RegInfo, UserResponse } from "./ResTypes";

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg("user_info") user_info: RegInfo
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

        const hashedPass = await argon2.hash(user_info.password)
        const user = User.create({ user_name: user_info.user_name, email: user_info.email, password: hashedPass });
        await user.save();
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("user_info") user_info: LoginInfo
    ): Promise<UserResponse> {
        const userRepo = getCustomRepository(UserRepository);
        const user = user_info.user.includes('@') ? await userRepo.findByEmail(user_info.user) : await userRepo.findByUserName(user_info.user);
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
        return { user };
    }
}