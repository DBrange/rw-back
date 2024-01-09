import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RegisterDTO } from '../dto/register.dto';
import { RegisterService } from '../services/register.service';

@Controller('register')
@UseGuards(AuthGuard)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @PublicAccess()
  @Post('')
  public async createUserInLogin(@Body() body: RegisterDTO) {
    return await this.registerService.createUserInLogin(body);
  }
  
  @PublicAccess()
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
