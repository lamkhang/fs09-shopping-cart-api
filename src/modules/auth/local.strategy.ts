import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.AuthService.authorize(username, 'admin');
    console.log(user);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
      }, HttpStatus.FORBIDDEN);
    }
    return null;
  }
}