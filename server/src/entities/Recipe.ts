import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserSavedRecipes } from "./UserSavedRecipe";


@ObjectType() // For type-graphql API
@Entity() // For TypeORM
export class Recipe extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    recipe_author: number;

    @Field()
    @Column({ unique: true })
    recipe_name!: string;

    @Field()
    @Column()
    recipe_desc!: string;

    @Field()
    @Column()
    recipe_cat!: string;

    @Field(() => [String])
    @Column("text", { array: true })
    ingredients!: String[];

    @Field(() => [String])
    @Column("text", { array: true })
    quantities!: string[];

    @Field()
    @Column()
    recipe_img: string;

    @Field()
    @CreateDateColumn()
    created_at!: Date

    @Field()
    @UpdateDateColumn()
    updated_at!: Date

    @OneToMany(() => UserSavedRecipes, ur => ur.recipe)
    userConnection: Promise<UserSavedRecipes[]>

}