import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDTO } from '../dto/register.dto';
import { Response } from 'express';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('register')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // @PublicAccess()
  @Post('')
  public async createUserInLogin(@Body() body: RegisterDTO) {
    return await this.registerService.createUserInLogin(body);
  }

  @Get('confirm/:token')
  public async confirmEmail(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    const emailConfirmed = this.registerService.confirmEmail(token);

    if (emailConfirmed) {
      return res.redirect('http://localhost:5173/public/verificado');
    } else {
      return res.redirect('http://localhost:5173/public/no-verificado');
    }
  }
}
