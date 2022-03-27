import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Cuisine } from "../entities/Cuisine";

@Resolver()
export class CuisineResolver {
    @Query(() => [Cuisine])
    getAllCuisines() {
        return Cuisine.find();
    }

    @Query(() => Cuisine)
    getOneCuisine(
        @Arg("cuis_id") cuis_id: number
    ) {
        return Cuisine.findOne(cuis_id);
    }

    @Mutation(() => Cuisine)
    async createCuisine(
        @Arg("cuis_name") cuis_name: string
    ): Promise<Cuisine> {
        return Cuisine.create({ cuisine_name: cuis_name }).save();
    }

    @Mutation(() => Boolean)
    async deleteCuisine(
        @Arg("cuis_id") cuis_id: number
    ): Promise<Boolean> {
        await Cuisine.delete(cuis_id);
        return true;
    }
}