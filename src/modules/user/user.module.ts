import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UsersService } from "./user.service";
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProductRepository])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {};