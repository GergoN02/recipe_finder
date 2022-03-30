import { TypeormLoader } from "type-graphql-dataloader";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn, RelationId } from "typeorm";
import { Lazy } from "../types";
import { Category } from "./Category";
import { Recipe } from "./Recipe";


@Entity()
export class RecipeCategory extends BaseEntity {

    @PrimaryColumn()
    category_id!: number;

    @PrimaryColumn()
    recipe_id!: number

    @ManyToOne(() => Recipe, (recipe) => recipe.recipeCat, { primary: true, lazy: true })
    @TypeormLoader(() => Recipe, (recipeCat: RecipeCategory) => recipeCat.recipe)
    recipe: Lazy<Recipe>;

    @RelationId((recipeCat: RecipeCategory) => recipeCat.recipe)
    recipeId?: number;

    @ManyToOne(() => Category, category => category.recipeConnection, { primary: true, lazy: true })
    @TypeormLoader(() => Category, (category: Category) => category.recipeConnection)
    category: Lazy<Category>;

    @RelationId((recipeConnection: RecipeCategory) => recipeConnection.category)
    categoryId?: number;
}


