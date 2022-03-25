import DataLoader from "dataloader";
import { In } from "typeorm"
import { Recipe } from "../../entities/Recipe";
import { UserSavedRecipes } from "../../entities/UserSavedRecipe"


const batchRecipes = async (userIds: readonly number[]) => {
    const idArray: number[] = [];
    userIds.forEach(id => idArray.push(id));
    const savedRecipes = await UserSavedRecipes.find({
        join: {
            alias: "UserSavedRecipes",
            innerJoinAndSelect: {
                recipe: "UserSavedRecipes.recipe"
            }
        },
        where: {
            user_id: In(idArray)
        }
    });

    const userIdToRecipes: { [key: number]: Recipe[] } = {};

    savedRecipes.forEach(recipe => {
        if (recipe.user_id in userIdToRecipes) {
            userIdToRecipes[recipe.user_id].push((recipe as any).__recipe__);
        } else {
            userIdToRecipes[recipe.user_id] = [(recipe as any).__recipe__];
        }
    });

    return idArray.map(user_id => userIdToRecipes[user_id]);
};

export const createRecipeLoader = () => new DataLoader(batchRecipes);