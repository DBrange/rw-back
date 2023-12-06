import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonalUserDTO, UpdatePersonalUserDTO } from '../dto/personal-user.dto';
import { PersonalUserService } from '../services/personal-user.service';

@Controller('personal-user')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class PersonalUserController {
  constructor(private readonly personalUserService: PersonalUserService) {}

  @Post('')
  public async createUser(@Body() body: PersonalUserDTO) {
    return await this.personalUserService.createPersonalUser(body);
  }

  @Get('')
  public async getUsers() {
    return await this.personalUserService.getPersonalUsers();
  }

  @Get(':personalUserId')
  public async getUserById(@Param('personalUserId') id: string) {
    return await this.personalUserService.getPersonalUserById(id);
  }

  @Put(':personalUserId')
  public async updateUser(
    @Param('personalUserId') id: string,
    @Body() body: UpdatePersonalUserDTO,
  ) {
    return await this.personalUserService.updatePersonalUser(id, body);
  }

  @Delete(':personalUserId')
  public async deleteUser(@Param('personalUserId') id: string) {
    return await this.personalUserService.deletePersonalUser(id);
  }
}
