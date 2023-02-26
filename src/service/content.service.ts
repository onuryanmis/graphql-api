import { Service } from 'typedi';
import { GraphQLError } from 'graphql';
import { ContentRepository } from '../repository/content.repository';
import { Content } from '../entity/content.entity';
import { ContentInput } from '../input/content.input';

@Service()
export class ContentService {
  private readonly contentRepository: ContentRepository;

  public constructor(contentRepository: ContentRepository) {
    this.contentRepository = contentRepository;
  }

  public async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: {
        category: true,
      },
    });
  }

  public async findOneById(id: number): Promise<Content | null> {
    return this.findOneOrNotFound(id);
  }

  public async findOneOrNotFound(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!content) throw new GraphQLError('Not Found!');

    return content;
  }

  public async create(data: ContentInput): Promise<Content> {
    const { title, isActive, description, fullContent, category } = data;
    const content = this.contentRepository.create({ category, title, isActive, description, fullContent });
    return this.contentRepository.save(content);
  }

  public async delete(id: number): Promise<Content> {
    const content = await this.findOneOrNotFound(id);
    await this.contentRepository.delete({ id: content.id });
    return content;
  }

  public async update(id: number, contentInput: ContentInput): Promise<Content> {
    const content = await this.findOneOrNotFound(id);
    return this.contentRepository.save({ ...content, ...contentInput });
  }
}