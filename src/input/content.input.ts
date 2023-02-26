import { Field, InputType } from 'type-graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Category } from '../entity/category.entity';

@InputType({ description: 'Create Content Input' })
export class ContentInput {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @Field(() => String)
  @IsOptional()
  @MaxLength(250)
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  fullContent: string;

  @Field(() => Number)
  @IsNotEmpty()
  category: Category;

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;
}