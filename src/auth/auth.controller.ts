import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { authValidationSchema } from './dto/auth-validation.schema';
import { ValidationPipe } from '@nestjs/common';
import { JoiValidationPipe } from 'src/validation/joi-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  signUp(
    @Body(new JoiValidationPipe(authValidationSchema))
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
