import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { UserUserBrokerDTO } from './dto/allUser.dto';
import {Response} from 'express'
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @PublicAccess()
  @Post('register-login')
  public async registerUserInLogin(@Body() body: UserUserBrokerDTO) {
    return await this.usersService.createUserInLogin(body);
  }
  // @AdminAccess()
  // @AccessLevel(10)
  // @Roles('CLIENT')
  @PublicAccess()
  @Get('all')
  public async getUsers() {
    return await this.usersService.getUsers();
  }

  @PublicAccess()
  @Get('confirm/:token')
  public async confirmEmail(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    const emailConfirmed = this.usersService.confirmEmail(token);

    if (emailConfirmed) {
      return res.redirect('/confirm.html');
    } else {
      return res.redirect('/error.html');
    }
  }

  @Roles('ADMIN')
  @PublicAccess()
  @Get('all-users')
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUsersById(id);
    return user;
  }

  @PublicAccess()
  @Post('verify')
  public async verifyEmailDni(
    @Query('email') email?: string,
    @Query('dni') dni?: string,
    @Query('enrollment') enrollment?: string,
  ) {
    const user = await this.usersService.verifyEmailDni(email, dni, enrollment);

    return user;
  }

  // @Roles('CLIENT')
  @PublicAccess()
  @Post('add-client/:client/:broker')
  public async addClient(
    @Param('client') client: string,
    @Param('broker') broker: string,
  ) {
    return this.usersService.addClient(client, broker);
  }

  @PublicAccess()
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(id, body);
  }

  @PublicAccess()
  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
