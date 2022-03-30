import { Ctx, Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServerContext } from "../types";
import { Category } from "./Category";
import { Diet } from "./Diet";
import { RecipeCategory } from "./RecipeCategory";
import { RecipeDiet } from "./RecipeDiet";
import { UserSavedRecipes } from "./UserSavedRecipe";


@ObjectType() // For type-graphql API
@Entity() // For TypeORM
export class Recipe extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    recipe_author!: number;

    @Field()
    @Column()
    recipe_name!: string;

    @Field()
    @Column()
    recipe_desc!: string;

    @Field(() => [String])
    @Column("text", { array: true })
    ingredients!: String[];

    @Field(() => [String])
    @Column("text", { array: true })
    quantities!: string[];

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

    @OneToMany(() => RecipeCategory, cc => cc.recipe)
    catConnection: Promise<RecipeCategory[]>;

    // @OneToMany(() => RecipeDiet, dc => dc.recipe)
    // dietConnection: Promise<RecipeDiet[]>;

    @Field(() => [Category], { nullable: true })
    async recipeCategory(@Ctx() { categoryLoader }: ServerContext): Promise<Category[]> {
        return categoryLoader!.load(this.id);
    }

    // @Field(() => Diet, { nullable: true })
    // async recipeDiet(@Ctx() { dietLoader }: ServerContext): Promise<Diet[]> {
    //     return dietLoader!.load(this.id);
    // }

}