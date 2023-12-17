import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDTO, UpdateUserDTO } from '../dto/user.dto';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Get('')
  public async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  public async getUserById(@Param('userId') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':userId')
  public async updateUser(
    @Param('userId') id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('last-record/:userId')
  public async updateLastRecord(
    @Param('userId') userId: string,
    @Query('date') date?: Date,
  ) {
    console.log(date, '------------')
    return await this.userService.updateLastRecord(userId, date);
  }

  @Get('inspections/:userId')
  public getInspectionsOfClient(@Param('userId') userId: string) {
    return this.userService.getInspectionsOfClient(userId);
  }

  @Get('notifications/:userId')
  public getClientNotificationsById(@Param('userId') userId: string) {
    return this.userService.getClientNotificationsById(userId);
  }

  @Post('email/:email')
  public async findUserByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
