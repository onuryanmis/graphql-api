import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';
import { CategoryInput } from '../input/category.input';

@Resolver()
@Service()
export class CategoryResolver {
  private readonly categoryService: CategoryService;

  public constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @Query(() => [Category])
  public async categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { nullable: true })
  public async category(@Arg('id') id: number): Promise<Category | null> {
    return this.categoryService.findOneById(id);
  }

  @Mutation(() => Category, { nullable: true })
  public async createCategory(@Arg('data') data: CategoryInput): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Mutation(() => Category, { nullable: true })
  public async updateCategory(@Arg('id') id: number, @Arg('data') data: CategoryInput): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Mutation(() => Category, { nullable: true })
  public async deleteCategory(@Arg('id') id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}