import { In } from "typeorm";
import { Category } from "../entities/Category";
import { RecipeCategory } from "../entities/RecipeCategory";

const DataLoader = require('dataloader');

const batchFunction = async (keys: number[]) => {
    const fetchedCategories = await RecipeCategory.find({
        join: {
            alias: "RecipeCategory",
            innerJoinAndSelect: {
                category: "RecipeCategory.category"
            }
        },
        where: {
            recipe_id: In(keys)
        }
    });

    const categoryMap: { [key: number]: Category[] } = {};

    fetchedCategories.forEach(category => {
        if (category.recipe_id in categoryMap) {
            categoryMap[category.recipe_id].push((category as any).__category__)
        } else {
            categoryMap[category.recipe_id] = [(category as any).__category__]
        }
    });

    return keys.map(recipe_id => categoryMap[recipe_id]);
};


export const CategoryLoader = () => new DataLoader(batchFunction);