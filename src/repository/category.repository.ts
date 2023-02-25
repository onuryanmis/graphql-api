import { DataSource, Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { Service } from 'typedi';

@Service()
export class CategoryRepository extends Repository<Category> {
  private readonly categoryRepository: Repository<Category>;

  public constructor(dataSource: DataSource) {
    super(Category, dataSource.manager);
    this.categoryRepository = dataSource.getRepository(Category);
  }
}