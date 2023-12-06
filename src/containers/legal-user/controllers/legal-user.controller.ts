import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LegalUserDTO, UpdateLegalUserDTO } from '../dto/legal-user.dto';
import { LegalUserService } from '../services/legal-user.service';

@Controller('legal-user')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class LegalUserController {
  constructor(private readonly legalUserService: LegalUserService) {}

  @Post('')
  public async createUser(@Body() body: LegalUserDTO) {
    return await this.legalUserService.createLegalUser(body);
  }

  @Get('')
  public async getUsers() {
    return await this.legalUserService.getLegalUsers();
  }

  @Get(':legalUserId')
  public async getUserById(@Param('legalUserId') id: string) {
    return await this.legalUserService.getLegalUserById(id);
  }

  @Put(':legalUserId')
  public async updateUser(
    @Param('legalUserId') id: string,
    @Body() body: UpdateLegalUserDTO,
  ) {
    return await this.legalUserService.updateLegalUser(id, body);
  }

  @Delete(':legalUserId')
  public async deleteUser(@Param('legalUserId') id: string) {
    return await this.legalUserService.deleteLegalUser(id);
  }
}
