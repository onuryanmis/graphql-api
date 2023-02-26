import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { ContentInput } from '../input/content.input';
import { ContentService } from '../service/content.service';
import { Content } from '../entity/content.entity';

@Resolver()
@Service()
export class ContentResolver {
  private readonly contentService: ContentService;

  public constructor(contentService: ContentService) {
    this.contentService = contentService;
  }

  @Query(() => [Content])
  public async contents(): Promise<Content[]> {
    return this.contentService.findAll();
  }

  @Query(() => Content, { nullable: true })
  public async content(@Arg('id') id: number): Promise<Content | null> {
    return this.contentService.findOneById(id);
  }

  @Mutation(() => Content, { nullable: true })
  public async createContent(@Arg('data') data: ContentInput): Promise<Content> {
    return this.contentService.create(data);
  }

  @Mutation(() => Content, { nullable: true })
  public async updateContent(@Arg('id') id: number, @Arg('data') data: ContentInput): Promise<Content> {
    return this.contentService.update(id, data);
  }

  @Mutation(() => Content, { nullable: true })
  public async deleteContent(@Arg('id') id: number): Promise<Content> {
    return this.contentService.delete(id);
  }
}