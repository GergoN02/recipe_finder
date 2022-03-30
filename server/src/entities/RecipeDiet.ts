import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Diet } from "./Diet";
import { Recipe } from "./Recipe";


@Entity()
export class RecipeDiet extends BaseEntity {

    @PrimaryColumn()
    diet_id!: number;

    @PrimaryColumn()
    recipe_id!: number

    @ManyToOne(() => Diet, diet => diet.recipeConnection, { primary: true })
    @JoinColumn({ name: "diet_id" })
    diet: Promise<Diet>;

    @ManyToOne(() => Recipe, recipe => recipe.dietConnection, { primary: true })
    @JoinColumn({ name: "recipe_id" })
    recipe: Promise<Recipe>;
}


