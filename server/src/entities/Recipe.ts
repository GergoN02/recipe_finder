import { Field, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Lazy } from "../types";
import { Category } from "./Category";
import { RecipeCategory } from "./RecipeCategory";
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

    @Field(() => [Category])
    @OneToMany(() => RecipeCategory, (recipeCat) => recipeCat.recipe, { lazy: true })
    @TypeormLoader((recipeCat: RecipeCategory) => recipeCat.recipe_id, { selfKey: true })
    recipeCat: Lazy<Category[]>;

    // @Field(() => [Diet], { nullable: true })
    // @OneToMany(() => RecipeDiet, dc => dc.recipe, { lazy: true })
    // @TypeormLoader()
    // diet: Lazy<RecipeDiet[]>;

}