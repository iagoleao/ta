import { RegisterDto } from '@app/auth/dtos/register.dto';
import { AuthService } from '@app/auth/service/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@app/auth/decorator/current-user.decorator';
import { LoginDto } from '@app/auth/dtos/login.dto';
import { AuthGuard } from '@app/auth/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() data: RegisterDto) {
    return this.authService.create(data);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  public me(@CurrentUser() user) {
    return user;
  }

  @Post('/login')
  @HttpCode(200)
  public login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
