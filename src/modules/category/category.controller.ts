import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { CategorySerivce } from './category.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDTO } from './category.dto';
import { ProductEntity } from '../product/product.entity';
import { JwtAuthGuard } from '../auth/jwtauth.guard';
import { AuthorizeGuard } from '../auth/authorize.guard';

@UseGuards(JwtAuthGuard)
// @UseGuards(AuthorizeGuard)
@Controller('/categories')
export class CategoryController {
  constructor(
    private categoryService : CategorySerivce
  ) {}
  @Get('/')
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories();
  }
  @Get('/:id')
  async getCategoryById(@Param("id") id: number): Promise<CategoryEntity> {
    return await this.categoryService.getCategoryById(id)
  }
  @Post('/')
  async createCategory(@Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(data);
  }
  @Put('/:id')
  async putCategory(@Param('id') id: number, @Body() data: CreateCategoryDTO): Promise<CategoryEntity> {
    return await this.categoryService.updateCategory(id, data)
  }
  @Delete('/:id')
  async DeleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id)
  }

  @Get('/:id/products')
  async getProductsByCategoryId(
    @Param('id') id:number
  ): Promise<ProductEntity[]> {
    return await this.categoryService.getProductsByCategoryId(id)
  }
}
