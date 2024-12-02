import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    const book = await this.booksService.findAll();
    if (!book) throw new NotFoundException();
    return book;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne({ id: +id });
    if (!book) throw new NotFoundException();
    return book;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.booksService.update(+id, updateBookDto);
    if (!book) throw new NotFoundException();
    return book;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const book = await this.booksService.remove(+id);
    if (!book) throw new NotFoundException();
    return book;
  }
}
