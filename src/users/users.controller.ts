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
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-User.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const User = await this.UsersService.findAll();
    if (!User) throw new NotFoundException();
    return User;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const User = await this.UsersService.findOne({ id: +id });
    if (!User) throw new NotFoundException();
    return User;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const User = await this.UsersService.update(+id, updateUserDto);
    if (!User) throw new NotFoundException();
    return User;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const User = await this.UsersService.remove(+id);
    if (!User) throw new NotFoundException();
    return User;
  }
}
