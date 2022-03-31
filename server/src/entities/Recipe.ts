import { Ctx, Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServerContext } from "../types";
import { RecipeAuthors } from "./joinTables/RecipeAuthor";
import { RecipeTags } from "./joinTables/RecipeTags";
import { Tag } from "./Tag";
import { UserSavedRecipes } from "./joinTables/UserSavedRecipe";
import { RecipeIngredients } from "./joinTables/RecipeIngredients";
import { User } from "./User";
import { Ingredient } from "./Ingredient";
import { RecipeSteps } from "./joinTables/RecipeSteps";
import { Step } from "./Step";


@ObjectType() // For type-graphql API
@Entity() // For TypeORM
export class Recipe extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    recipe_name!: string;

    @Field()
    @Column()
    recipe_desc!: string;

    @Field()
    @Column({ nullable: true })
    recipe_img?: string;

    @Field()
    @CreateDateColumn()
    created_at!: Date

    @Field()
    @UpdateDateColumn()
    updated_at!: Date

    @OneToMany(() => UserSavedRecipes, ur => ur.recipe)
    userConnection: Promise<UserSavedRecipes[]>

    @OneToMany(() => RecipeAuthors, ra => ra.recipe)
    authorConnection: Promise<RecipeAuthors[]>

    @OneToMany(() => RecipeIngredients, ri => ri.recipe)
    ingredientConnection: Promise<RecipeIngredients[]>;

    @OneToMany(() => RecipeSteps, rs => rs.recipe)
    stepConnection: Promise<RecipeSteps[]>

    @OneToMany(() => RecipeTags, rt => rt.tag)
    tagConnection: Promise<RecipeTags[]>

    @Field(() => [User], { nullable: true })
    async recipeAuthors(@Ctx() { authorLoader }: ServerContext): Promise<User[]> {
        return authorLoader.load(this.id);
    }

    @Field(() => [Ingredient], { nullable: true })
    async recipeIngredients(@Ctx() { ingredientLoader }: ServerContext): Promise<Ingredient[]> {
        return ingredientLoader.load(this.id);
    }

    @Field(() => [Step], { nullable: true })
    async recipeSteps(@Ctx() { stepLoader }: ServerContext): Promise<Step[]> {
        return stepLoader.load(this.id);
    }

    @Field(() => [Tag], { nullable: true })
    async recipeTags(@Ctx() { tagsLoader }: ServerContext): Promise<Tag[]> {
        return tagsLoader!.load(this.id);
    }

}