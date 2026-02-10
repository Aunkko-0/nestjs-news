import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma.service';

@Injectable()

export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, userId: number) {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const randomImageUrl = `https://picsum.photos/id/${randomId}/600/400`;

  return this.prisma.article.create({
    data:{
    ... createArticleDto, 
    authorId: userId,
    image: randomImageUrl,
    }
  });
}

  findAll() {
  return this.prisma.article.findMany({
    where: { published: true },
    orderBy: {
      createdAt: 'desc', // desc = descending (จากใหม่ไปเก่า)
    },
    include: { 
        author: true
    }
  });
}

  findOne(id: number) {
    return this.prisma.article.findUnique({
    where: { id },
  });
}

  update(id: number, updateArticleDto: UpdateArticleDto) {
  return this.prisma.article.update({
    where: { id },
    data: { ...updateArticleDto }, // ใช้ spread operator ตามที่เราเคยตกลงกันไว้
  });
}

  remove(id: number) {
  return this.prisma.article.delete({
    where: { id },
  });
  }
} 
