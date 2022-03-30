import { In } from "typeorm";
import { Recipe } from "../entities/Recipe";
import { RecipeDiet } from "../entities/RecipeDiet";

const DataLoader = require('dataloader');

const batchFunction = async (keys: number[]) => {
    const fetchedDiets = await RecipeDiet.find({
        join: {
            alias: "RecipeDiet",
            innerJoinAndSelect: {
                recipe: "RecipeDiet.recipe"
            }
        },
        where: {
            diet_id: In(keys)
        }
    });

    const dietMap: { [key: number]: Recipe[] } = {};

    fetchedDiets.forEach(recipe => {
        if (recipe.diet_id in dietMap) {
            dietMap[recipe.diet_id].push((recipe as any).__recipe__);
        } else {
            dietMap[recipe.diet_id] = [(recipe as any).__recipe__];
        }
    });
}


export const dietLoader = () => new DataLoader(batchFunction);