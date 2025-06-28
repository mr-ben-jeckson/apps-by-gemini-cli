import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async googleLogin(user: any) {
    if (!user) {
      return 'No user from google';
    }

    const payload = { email: user.email, sub: user.accessToken };
    return {
      message: 'User information from google',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}