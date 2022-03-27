import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";


@ObjectType()
@Entity()
export class Diet extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    diet_name!: string;

    @Field(() => String)
    @Column({ nullable: true })
    diet_desc?: string;

    @OneToMany(() => Recipe, recipe => recipe.diet)
    recipes: Promise<Recipe[]>;
}
