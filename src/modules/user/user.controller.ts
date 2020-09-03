import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from "./user.service";
import { async } from 'rxjs';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from "./user.entity";
@Controller('/users')
export class UserController {
  constructor(private usersService: UsersService){}

  @Post('/')
  async createUser(@Body() user: CreateUserDTO): Promise<UserEntity> {
    return await this.usersService.createUser(user);
  }
  @Get('/')
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.getUsers();
  }
  @Get('/:id')
  async getUserById(@Param("id") id: number): Promise<UserEntity> {
    return await this.usersService.getUserById(id)
  }
  @Get('/products/v2')
  async getProductByUser(): Promise<UserEntity[]> {
    return await this.usersService.getProductByUser();
  }
  @Put('/:id')
  async putUser(@Param("id") id: number, @Body() user: CreateUserDTO): Promise<UserEntity>{
    return await this.usersService.updateUser(id, user)
  }
  @Delete('/:id')
  async deleteUser(@Param("id") id: number) {
    return await this.usersService.deleteUser(id);
  }
  @Post('/product/:id')
  async addProductToUser(@Param("id") id: number){
    return await this.usersService.addProductToUser(id);
  }
  
}