import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
     constructor(private readonly usersService: UsersService){}

     @Post('register')
     public async registerUser(@Body() body: UserDTO){
          return await this.usersService.createUser(body)
     };

     @Get('all')
     public async getAllUsers(){
          return await this.usersService.getUsers();
     };

     @Get(':id')
     public async getUserById(@Param('id') id: string){
          return await this.usersService.getUsersById(id);
     };

     @Put('edit/:id')
     public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO){
          return await this.usersService.updateUser(id, body);
     };

     @Delete('delete/:id')
          public async deleteUser(@Param('id') id: string) {
               return await this.usersService.deleteUser(id);
          }

};
