import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Diet } from "../entities/Diet";

@Resolver()
export class DietResolver {
    @Query(() => [Diet])
    getAllDiets() {
        return Diet.find();
    }

    @Query(() => Diet)
    getOneDiet(
        @Arg("diet_id") diet_id: number
    ) {
        return Diet.findOne(diet_id);
    }

    @Mutation(() => Diet)
    async createDiet(
        @Arg("diet_name") diet_name: string,
        @Arg("diet_desc") diet_desc?: string
    ): Promise<Diet> {
        return Diet.create({ diet_name: diet_name, diet_desc: diet_desc }).save();
    }

    @Mutation(() => Boolean)
    async deleteDiet(
        @Arg("diet_id") diet_id: number
    ): Promise<Boolean> {
        await Diet.delete(diet_id);
        return true;
    }
}