import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  create(dto: CreateUserDto) {
    const User = this.UserRepository.create(dto);
    return this.UserRepository.save(User);
  }

  findAll() {
    return this.UserRepository.find();
  }

  findOne(id) {
    return this.UserRepository.findOne({ where: { id } });
  }

  findByUsername(username) {
    return this.UserRepository.findOne({ where: { username } });
  }
  findByEmail(email) {
    return this.UserRepository.findOneByOrFail(email);
  }

  async update(id, dto: UpdateUserDto) {
    const User = await this.UserRepository.findOne({ where: { id } });
    if (!User) return null;
    this.UserRepository.merge(User, dto);
    return this.UserRepository.save(User);
  }

  async remove(id) {
    const User = await this.UserRepository.findOne({ where: { id } });
    if (!User) return null;
    return this.UserRepository.remove(User);
  }
}
