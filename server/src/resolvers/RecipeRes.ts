import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Recipe } from "../entities/Recipe";
import { RecipeInput } from "./ResTypes";


@Resolver()
export class RecipeResolver {

    //Returns all recipes
    @Query(() => [Recipe])
    async getRecipes(): Promise<Recipe[]> {
        return Recipe.find();
    }

    //Returns one recipe
    @Query(() => Recipe, { nullable: true })
    async getOneRecipe(
        @Arg("id") id: number
    ): Promise<Recipe | undefined> {
        return Recipe.findOne(id);
    }

    //Add New Recipe
    @Mutation(() => Recipe)
    async addRecipe(
        @Arg("input") recipe_input: RecipeInput
    ): Promise<Recipe> {
        return Recipe.create(recipe_input).save();
    }

    //Update Existing Recipe
    @Mutation(() => Recipe)
    async updateRecipe(
        @Arg("id") id: number,
        @Arg("input") recipe_input: RecipeInput
    ): Promise<Recipe | undefined> {
        const recipe = await Recipe.findOne(id);
        if (!recipe) {
            return undefined;
        }
        Object.assign(recipe, recipe_input);
        await recipe.save();
        return recipe;
    }

    //Delete Recipe
    @Mutation(() => Recipe)
    async deleteRecipe(
        @Arg("id") id: number
    ): Promise<Boolean> {
        await Recipe.delete(id);
        return true;
    }

}