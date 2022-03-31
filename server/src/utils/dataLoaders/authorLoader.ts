import { User } from "../../entities/User";

import DataLoader from 'dataloader';

const batchFunction = async (keys: readonly number[]) => {
    const fetchedRecipes = await User.findByIds(keys as number[]);

    const userMap: Record<number, User> = {};

    fetchedRecipes.forEach(user => {
        userMap[user.id] = user;
    });

    return keys.map(userId => userMap[userId]);
};

export const RecipeLoader = () => new DataLoader(batchFunction);