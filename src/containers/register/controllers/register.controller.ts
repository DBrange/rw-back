import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDTO } from '../dto/register.dto';
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
  public async registerUser(@Body() body: RegisterDTO) {
    return await this.registerService.registerUser(body);
  }
}
