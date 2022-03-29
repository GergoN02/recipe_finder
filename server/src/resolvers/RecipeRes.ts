import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { createQueryBuilder, EntityManager, getManager } from "typeorm";
import { Category } from "../entities/Category";
import { Recipe } from "../entities/Recipe";
import { User } from "../entities/User";
import { UserSavedRecipes } from "../entities/UserSavedRecipe";
import { ServerContext } from "../types";
import { RecipeInput, TagsInput } from "./ResTypes";


@Resolver()
export class RecipeResolver {

    //Returns all recipes for user
    @Query(() => User, { nullable: true })
    async getRecipes(
        @Ctx() { req }: ServerContext
    ) {
        return User.findOne(req.session!.userId);
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
    async addNewRecipe(
        @Arg("input") recipe_input: RecipeInput,
        @Ctx() { req }: ServerContext
    ): Promise<Recipe> {
        return Recipe.create({
            ...recipe_input,
            recipe_author: req.session!.userId,
        }).save();
    }


    @Mutation(() => Boolean)
    async addRecipeTags(
        @Arg("recipe_id") recipe_id: number,
        @Arg("tags") tags: TagsInput
    ): Promise<Boolean> {
        const recipe = await Recipe.findOne(recipe_id);
        const { id, ..._ } = recipe!;

        await getManager().query(`
        UPDATE table 
        SET recipes = array_append(recipes, $1)
        WHERE category = $2
        `, [id, tags.category_id])

        await getManager().query(`
        UPDATE table 
        SET recipes = array_append(recipes, $1)
        WHERE cuisine = $2
        `, [id, tags.cuisine_id])

        await getManager().query(`
        UPDATE table 
        SET recipes = array_append(recipes, $1)
        WHERE diet = $2
        `, [id, tags.diet_id])

        return true;

    }


    //Add Recipe to joint table
    //For new recipe, addNewRecipe ==> get the returned JSON ==> addUserSavedRecipe with current session userId
    //For recipe already in DB (different author) ==> find recipe ==> addUserSavedRecipe with current session userId

    @Mutation(() => Boolean)
    async addUserSavedRecipe(
        @Arg("recipe_id") recipe_id: number,
        @Arg("user_id") user_id: number
    ) {
        await UserSavedRecipes.create({ user_id, recipe_id }).save();
        return true;
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

    //Delete Owned Recipe
    @Mutation(() => Recipe)
    async deleteOwnedRecipe(
        @Arg("id") id: number
    ): Promise<Boolean> {
        await UserSavedRecipes.delete(id);
        await Recipe.delete(id);
        return true;
    }

    //Delete Saved Recipe

    @Mutation(() => Recipe)
    async deleteSavedRecipe(
        @Arg("user_id") user_id: number,
        @Arg("recipe_id") recipe_id: number
    ): Promise<Boolean> {
        await UserSavedRecipes.delete({ user_id: user_id, recipe_id: recipe_id });
        return true;
    }

}