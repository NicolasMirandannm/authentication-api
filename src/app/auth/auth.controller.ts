import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AuthController {
  // constructor() {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(): string {
    return 'x';
  }
}
