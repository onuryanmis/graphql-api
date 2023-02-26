import { DataSource, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Content } from '../entity/content.entity';

@Service()
export class ContentRepository extends Repository<Content> {
  private readonly categoryRepository: Repository<Content>;

  public constructor(dataSource: DataSource) {
    super(Content, dataSource.manager);
    this.categoryRepository = dataSource.getRepository(Content);
  }
}