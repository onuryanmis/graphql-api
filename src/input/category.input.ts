import { Field, InputType } from 'type-graphql';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';

@InputType({ description: 'Create Category Input' })
export class CategoryInput {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;
}