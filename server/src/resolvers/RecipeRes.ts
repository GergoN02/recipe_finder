import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { In } from "typeorm";
import { Recipe } from "../entities/Recipe";
import { RecipeTags } from "../entities/RecipeTags";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { UserSavedRecipes } from "../entities/UserSavedRecipe";
import { ServerContext } from "../types";
import { RecipeInput, TagsInput } from "./ResTypes";


@Resolver()
export class RecipeResolver {


    //FIX THIS!!!


    // @FieldResolver()
    // @Loader<number, Category[]>(async (ids: number[]) => {
    //     const categories = await Category.find({
    //         where: {
    //             id: In(ids)
    //         }
    //     })

    //     const categoryMap = groupBy(categories, "categoryId");

    //     return ids.map((id) => categoryMap[id] ?? []);
    // })
    // Categories(@Root() root: Recipe) {
    //     return (dataLoader: DataLoader<number, Category[]>) =>
    //         dataLoader.load(root.id)

    // }

    //Returns all recipes for user
    @Query(() => User, { nullable: true })
    async getSavedRecipes(
        @Ctx() { req }: ServerContext
    ) {
        return User.findOne(req.session!.userId);
    }

    @Query(() => [Recipe], { nullable: true })
    async getRecipes() {
        return Recipe.find();
    }

    //Returns one recipe
    @Query(() => Recipe, { nullable: true })
    async getOneRecipe(
        @Arg("id") id: number
    ) {
        return Recipe.findOne(id);
    }

    //Add New Recipe
    @Mutation(() => Recipe)
    async addNewRecipe(
        @Arg("input") recipe_input: RecipeInput,
        @Arg("tags") tags: TagsInput,
        @Ctx() { req }: ServerContext
    ) {
        const newRecipe = await Recipe.create({
            ...recipe_input,
            recipe_author: req.session!.userId
        }).save();

        const getTags = await Tag.find({
            where: {
                id: In(tags.tag_id)
            }
        })
        for (const tag of getTags) {
            await RecipeTags.create({
                recipe_id: newRecipe.id,
                tag_id: tag.id
            }).save();
        }

        return await RecipeTags.find({
            where: {
                recipe_id: newRecipe.id
            },
            relations: ["recipe", "tag"]
        })

    }


    // @Mutation(() => Boolean)
    // async addRecipeTags(
    //     @Arg("recipe_id") recipe_id: number,
    //     @Arg("tags") tags: TagsInput
    // ): Promise<Boolean> {
    //     return true;
    // }


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