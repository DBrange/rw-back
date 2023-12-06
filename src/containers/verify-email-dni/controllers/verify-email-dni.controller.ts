import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { VerifyEmailDniService } from '../services/verify-email-dni.service';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('verify-email-dni')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class VerifyEmailDniController {
  constructor(private readonly verifyEmailDniService: VerifyEmailDniService) {}

  @PublicAccess()
  @Post('')
  public async verifyEmailDni(
    @Query('email') email?: string,
    @Query('dni') dni?: string,
    @Query('enrollment') enrollment?: string,
  ) {
    const result = await this.verifyEmailDniService.verifyEmailDni(
      email,
      dni,
      enrollment,
    );

    return result;
  }
}
