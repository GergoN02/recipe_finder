import { In } from "typeorm";
import { Category } from "../entities/Category";
import { RecipeCategory } from "../entities/RecipeCategory";

const DataLoader = require('dataloader');

const batchFunction = async (keys: number[]) => {
    const fetchedCategories = await RecipeCategory.find({
        join: {
            alias: "RecipeCategory",
            innerJoinAndSelect: {
                recipe: "RecipeCategory.category"
            }
        },
        where: {
            recipe_id: In(keys)
        }
    });

    const recipeMap: { [key: number]: Category[] } = {};

    fetchedCategories.forEach(category => {
        if (category.recipe_id in recipeMap) {
            recipeMap[category.recipe_id].push((category as any).__category__);
        } else {
            recipeMap[category.recipe_id] = [(category as any).__category__];
        }
    });

    return keys.map(recipe_id => recipeMap[recipe_id]);
};

export const CategoryLoader = () => new DataLoader(batchFunction);