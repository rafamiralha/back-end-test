import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Validações de login (usuário fictício)
  async validateUser(username: string, password: string): Promise<any> {
    const user = { username: 'user', password: '$2a$10$...' }; // Exemplo de usuário com senha criptografada

    if (
      username === user.username &&
      bcrypt.compareSync(password, user.password)
    ) {
      return { username: user.username };
    }
    return null;
  }

  // Gerar o JWT
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
