import { Body, Controller, Get, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { AccessLevelGuard } from '../guards/access-level.guard';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PublicAccess } from '../decorators/public.decorator';

@Controller('auth')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @PublicAccess()
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password);
    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate.id);

    return jwt;
  }

  @Post('refresh-token/:userId')
  async generateRefreshJWT(@Param('userId') userId: string) {
    return await this.authService.generateRefreshJWT(userId);
  }
}
