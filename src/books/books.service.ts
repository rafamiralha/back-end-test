import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  create(dto: CreateBookDto) {
    const book = this.bookRepository.create(dto);
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id) {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id, dto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) return null;
    this.bookRepository.merge(book, dto);
    return this.bookRepository.save(book);
  }

  async remove(id) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) return null;
    return this.bookRepository.remove(book);
  }
}
