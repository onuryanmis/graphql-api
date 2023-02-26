import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  BeforeInsert, BeforeUpdate,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Category } from './category.entity';
import slugify from 'slugify';

@Entity()
@ObjectType()
export class Content {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column({ length: '255' })
  title: string;

  @Field(() => String)
  @Index({ unique: true })
  @Column({ length: '300' })
  slug: string;

  @Field(() => String)
  @Column({ length: '250' })
  description: string;

  @Field(() => String)
  @Column({ type: 'text' })
  fullContent: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @Field(() => Boolean)
  @Column()
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public updateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }
}