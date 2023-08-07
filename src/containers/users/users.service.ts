import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User)
           private  readonly userRepository: Repository<User>,
     ){}


     public async createUser(body: UserDTO) : Promise<User> {
          try {
               return await this.userRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
     


     public async getUsers(): Promise<User[]> {
          try {
               const users:User[]  =  await this.userRepository.find()
               if(users.length === 0 ){
                    throw new ErrorManager({
                         type: 'BAD_REQUEST',
                         message: 'No users found',
                    })
               }
               return users;
          } catch (error) {
               throw new ErrorManager.createSignaturError(error.message);
          }
     };


     public async getUsersById(id: string): Promise<User> {

          try {
              const user = await this.userRepository
               .createQueryBuilder('user')
               .where({ id })
               .getOne();

               if(!user) {
                    throw new ErrorManager({
                         type: 'BAD_REQUEST',
                         message: 'No users found',
                    })
               }
               return user;
          } catch (error) {
               throw new ErrorManager.createSignaturError(error.message);

          }
     };
     

     public async updateUser(id: string, body: UserUpdateDTO): Promise<UpdateResult> {
        
          try {
               const updatedUser = await this.userRepository.update(id, body);
               if(updatedUser.affected === 0){
                    throw new ErrorManager({
                         type: 'BAD_REQUEST',
                         message: 'No users were updated',
                    })
               }
               return updatedUser;
          } catch (error) {
               throw new ErrorManager.createSignaturError(error.message);
          }
     };

      
     public async deleteUser(id: string): Promise<DeleteResult | void> {
        
          try {
               const deleteUser = await this.userRepository.delete( id );
               if(deleteUser.affected === 0){
                    throw new ErrorManager({
                         type: 'BAD_REQUEST',
                         message: `User ${id} cannot be found or deleted`,
                    })
               }
               return deleteUser;
          } catch (error) {
               throw new ErrorManager.createSignaturError(error.message);
          }
     };
};
