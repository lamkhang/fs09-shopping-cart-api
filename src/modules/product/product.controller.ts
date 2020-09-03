import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './product.dto';

@Controller('/products')
export class ProductController {
  constructor( private productService: ProductService){}

  @Get('/')
  async getProduct(): Promise<ProductEntity[]> {
    return await this.productService.getProduct()
  }

  @Get('/v2')
  async getProduct_v2(): Promise<ProductEntity[]> {
    return await this.productService.getProduct_v2()
  }
  @Post('/')
  async createProduct(@Body() data: CreateProductDTO): Promise<ProductEntity> {
    return await this.productService.createProduct(data);
    
  }
}