import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column({ length: '100', unique: true })
  name: string;

  @Field(() => Boolean)
  @Column()
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}