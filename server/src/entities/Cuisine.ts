import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";


@ObjectType()
@Entity()
export class Cuisine extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    cuisine_name!: string;

    @Field(() => String)
    @Column({ nullable: true })
    cuisine_location?: string;

    @OneToMany(() => Recipe, recipe => recipe.cuisine)
    recipes: Promise<Recipe[]>;
}
