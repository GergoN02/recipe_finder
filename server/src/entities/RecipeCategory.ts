import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Recipe } from "./Recipe";


@Entity()
export class RecipeCategory extends BaseEntity {

    @PrimaryColumn()
    category_id!: number;

    @PrimaryColumn()
    recipe_id!: number

    @ManyToOne(() => Recipe, recipe => recipe.catConnection, { primary: true })
    @JoinColumn({ name: "recipe_id" })
    recipe: Promise<Recipe>;

    @ManyToOne(() => Category, category => category.recipeConnection, { primary: true })
    @JoinColumn({ name: "category_id" })
    category: Promise<Category>;
}


