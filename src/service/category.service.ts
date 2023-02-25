import { Service } from 'typedi';
import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../entity/category.entity';
import { CategoryInput } from '../input/category.input';
import { GraphQLError } from 'graphql';

@Service()
export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  public constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  public async findOneById(id: number): Promise<Category | null> {
    return this.findOneOrNotFound(id);
  }

  public async findOneOrNotFound(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new GraphQLError('Not Found!');
    return category;
  }

  public async create({ name, isActive }: CategoryInput): Promise<Category> {
    const category = this.categoryRepository.create({ name, isActive });
    return this.categoryRepository.save(category);
  }

  public async delete(id: number): Promise<Category> {
    const category = await this.findOneOrNotFound(id);
    await this.categoryRepository.delete({ id: category.id });
    return category;
  }

  public async update(id: number, categoryInput: CategoryInput): Promise<Category> {
    const category = await this.findOneOrNotFound(id);
    return this.categoryRepository.save({ ...category, ...categoryInput });
  }
}