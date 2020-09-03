import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityRepository } from "typeorm";
import { CategoryRepository } from "./category.repository";
import { CategorySerivce } from "./category.service";
import { CategoryController } from "./category.controller";
import { ProductRepository } from "../product/product.repository";


@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, ProductRepository])],
  controllers: [CategoryController],
  providers: [CategorySerivce]
})
export class CategoryModule {}