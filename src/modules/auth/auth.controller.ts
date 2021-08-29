import { UsePipes, ValidationPipe, Controller, Post, Body } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';


@UsePipes(new ValidationPipe())
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: AuthDTO){
    return await this.authService.login(data);
  }
}