import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Content } from './content.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column({ length: '100', unique: true })
  name: string;

  @Field(() => [Content])
  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];

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