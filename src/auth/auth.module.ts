import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BooksModule } from 'src/books/books.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtconstants } from 'src/constants/constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    BooksModule,
    JwtModule.register({
      global: true,
      secret: jwtconstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
