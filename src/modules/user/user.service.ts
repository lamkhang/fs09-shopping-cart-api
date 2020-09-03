import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDTO } from "./user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository"
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from "./../product/product.repository";
import { getConnection } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProductRepository) private productRepository: ProductRepository
  ) {}
  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['products']
    });
  }
  async getUserById(id: number): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne(id);
    if(!foundUser) throw new NotFoundException('User not found');
    return foundUser
  }
  async createUser(user: CreateUserDTO): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({email: user.email});
    if(foundUser) throw new ConflictException("User is exist")
    const newUser = this.userRepository.create(user);
    await newUser.save();
    return newUser;
  }
  async updateUser(id: number, user: any): Promise<UserEntity> {
    const foundUser = await this.getUserById(id);
    Object.keys(user).forEach(key => {
      foundUser[key] = user[key]
    });
    return foundUser.save();
  }
  async deleteUser(id: number) {
    const foundUser = await this.getUserById(id);
    return await this.userRepository.delete(id);
  }
  async addProductToUser(product_id: number): Promise<any> {
    const user_id = 1;
    const  object = {
      id: user_id,
      relations: ['products']
    }
    const foundUser = await this.userRepository.findOne(object);
    const foundProduct = await this.productRepository.findOne({id: product_id});
    if(!foundProduct) throw new NotFoundException("Product not found");
    foundUser.products = [foundProduct];
    return await foundUser.save();
  }

  async getProductByUser(): Promise<any> {
    const user_id = 1;
    const  object = {
      id: user_id,
      relations: ['products']
    }
    return await this.userRepository.find(object);
  }
}