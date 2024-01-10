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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }
  @PublicAccess()
  @Get('')
  public async getUsers() {
    return await this.userService.getUsers();
  }

  // @Roles('CLIENT')
  @PublicAccess()
  @Get('brokers/:id')
  public async getBrokers(
    @Param('id') id: string,
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.userService.getBrokers(
      id,
      searchField,
      typeToFilter,
      page,
      limit,
    );
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin')
  public async getUsersForAdmin(
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('typeToFilterUser') typeToFilterUser?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.userService.getUsersForAdmin(
      searchField,
      typeToFilter,
      typeToFilterUser,
      page,
      limit,
    );
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/new')
  public async dashboardNewUser() {
    return await this.userService.dashboardNewUser();
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/role')
  public async dashboardUserRole() {
    return await this.userService.dashboardUserRole();
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/level')
  public async dashboardLevelBrokers() {
    return await this.userService.dashboardLevelBrokers();
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/services')
  public async dashboardCurrentServices() {
    return await this.userService.dashboardCurrentServices();
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/user-quantity')
  public async dashboardUsersQuantity() {
    return await this.userService.dashboardUsersQuantity();
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/income')
  public async dashboardIncome() {
    return await this.userService.dashboardIncome();
  }

  @PublicAccess()
  @Get(':userId')
  public async getUserById(@Param('userId') id: string) {
    return await this.userService.getUserById(id);
  }

  @Put(':userId')
  public async updateOnlyBroker(
    @Param('userId') id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.userService.updateOnlyBroker(id, body);
  }

  @Delete(':userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }

  // @Roles('CLIENT', 'BROKER', 'CLIENT')
  @PublicAccess()
  @Post('last-record/:userId')
  public async updateLastRecord(
    @Param('userId') userId: string,
    @Query('date') date?: Date,
  ) {
    return await this.userService.updateLastRecord(userId, date);
  }

  @Get('inspections/:userId')
  public getInspectionsOfClient(@Param('userId') userId: string) {
    return this.userService.getInspectionsOfClient(userId);
  }

  // @Roles('CLIENT', 'BROKER', 'CLIENT')
  @PublicAccess()
  @Get('notifications/:userId')
  public getClientNotificationsById(
    @Param('userId') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.userService.getClientNotificationsById(userId, page, limit);
  }

  // @Roles('BROKER')
  @PublicAccess()
  @Post('email/:email')
  public async findUserByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }

  // @Roles('CLIENT', 'BROKER', 'CLIENT')
  @PublicAccess()
  @Get('profile/:userId')
  public async updateMyProfile(
    @Param('userId') userId: string,
    @Query('phoneNumber') phoneNumber: string,
    @Query('address') address: string,
  ) {
    return await this.userService.updateMyProfile(userId, phoneNumber, address);
  }

  // @Roles('CLIENT', 'BROKER', 'ADMIN')
  @PublicAccess()
  @Post('password/:userId')
  public async updatePassword(
    @Param('userId') userId: string,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return await this.userService.updatePassword(
      userId,
      body.oldPassword,
      body.newPassword,
    );
  }

  @PublicAccess()
  @Post('forgottem-password')
  public async newPasswordForMissingEmail(@Query('email') email: string) {
    return await this.userService.newPasswordForForgottem(email);
  }

  // @Roles('CLIENT')
  @PublicAccess()
  @Post('delete-broker/:clietnId/:userBrokerId')
  public async deleteBroker(
    @Param('clietnId') clietnId: string,
    @Param('userBrokerId') userBrokerId: string,
  ) {
    return await this.userService.deleteBroker(clietnId, userBrokerId);
  }

  //-------------------------------
  // Admin
}
