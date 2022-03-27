import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    getAllCategories() {
        return Category.find();
    }

    @Query(() => Category)
    getOneCategory(
        @Arg("cat_id") cat_id: number
    ) {
        return Category.findOne(cat_id);
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("cat_name") cat_name: string,
        @Arg("cat_desc") cat_desc?: string
    ): Promise<Category> {
        return Category.create({ category_name: cat_name, category_desc: cat_desc }).save();
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg("cat_id") cat_id: number
    ): Promise<Boolean> {
        await Category.delete(cat_id);
        return true;
    }
}