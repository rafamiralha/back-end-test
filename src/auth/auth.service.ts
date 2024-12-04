import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/Users.service';
import { AuthDto } from './dto/Auth.dto';
import { compareSync as bcryptCompareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { jwtconstants } from 'src/constants/constants';
@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>('6000');
  }

  // Gerar o JWT
  async SignIn(email: string, password: string): Promise<AuthDto> {
    const foundUser = await this.usersService.findByEmail(email);
    if (!foundUser || bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtconstants.secret,
    });

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
