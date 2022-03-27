import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Cuisine } from "./Cuisine";
import { Diet } from "./Diet";
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

    // @Field()
    // @Column({ nullable: true })
    // recipe_category_id: number;

    // @Field()
    // @Column({ nullable: true })
    // recipe_diet_id: number;

    // @Field()
    // @Column({ nullable: true })
    // recipe_cuisine_id: number;

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

    @ManyToOne(() => Cuisine, cuisine => cuisine.recipes)
    cuisine!: Promise<Cuisine>;

    @ManyToOne(() => Category, category => category.recipes)
    category!: Promise<Category>;

    @ManyToOne(() => Diet, diet => diet.recipes)
    diet!: Promise<Diet>;

}