import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Request} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';




@Controller('articles')
@ApiTags('articles')
@ApiBearerAuth()
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,

  ) {}

  
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ type: ArticleEntity })
  

  create(@Body() createArticleDto: CreateArticleDto, @Request() req: any) {
    return this.articlesService.create(createArticleDto, req.user.id );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id') id: string) {
  const article = await this.articlesService.findOne(+id); // +id คือการเปลี่ยน string เป็น number
  
  // ถ้าหาไม่เจอ ให้โยน Error 404 ออกไป
  if (!article) {
    throw new NotFoundException(`Article with ID ${id} not found`);
  }
  
  return article;
}

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  try {
    return await this.articlesService.update(+id, updateArticleDto);
  } catch (error) {
    throw new NotFoundException(`Article with ID ${id} to update was not found`);
  }
}

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
    async remove(@Param('id') id: string) {
  try {
    return await this.articlesService.remove(+id);
  } catch (error) {
    throw new NotFoundException(`Article with ID ${id} to delete was not found`);
      }
    }
  }
