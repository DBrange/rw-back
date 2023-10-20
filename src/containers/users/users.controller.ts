import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { UserUserBrokerDTO } from './dto/allUser.dto';

@Controller('users')
// @UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @Post('register-login')
  public async registerUserInLogin(@Body() body: UserUserBrokerDTO) {
    return await this.usersService.createUserInLogin(body);
  }

  // @AdminAccess()
  @Get('all')
  public async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return await this.usersService.getUsersById(id);
  }

  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
