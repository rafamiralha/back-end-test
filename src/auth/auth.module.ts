import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BooksModule } from 'src/books/books.module';
import { jwtconstants } from 'src/constants/constants';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/Users.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BooksModule,
    JwtModule.register({
      global: true,
      secret: jwtconstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, ConfigService, UsersService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
