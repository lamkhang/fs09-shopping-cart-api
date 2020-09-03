import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { CategoryEntity } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryRepository } from "./category.repository";
import { CategoryController } from "./category.controller";
import { CreateCategoryDTO } from "./category.dto";
import { NOTFOUND } from "dns";
import { ProductRepository } from "../product/product.repository";
import { ProductEntity } from "../product/product.entity";
@Injectable()
export class CategorySerivce {
  constructor( 
    @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
    @InjectRepository(ProductRepository) private productRepository: ProductRepository
   ) {}
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }
  async getCategoryById(id: number): Promise<CategoryEntity> {
    const foundCatagory = await this.categoryRepository.findOne(id);
    if(!foundCatagory) throw new NotFoundException('Category not found');
    return foundCatagory;
  }
  async createCategory(data: CreateCategoryDTO): Promise<CategoryEntity> {
    const foundCatagory = await this.categoryRepository.findOne({code: data.code});
    if(foundCatagory) throw new ConflictException("Category is exist")
    const newCategory =  this.categoryRepository.create(data);
    await newCategory.save();
    return newCategory;
  }
  async updateCategory(id: number, data: any): Promise<CategoryEntity> {
    const foundCatagory = await this.getCategoryById(id);
    Object.keys(data).forEach(key => {
      foundCatagory[key] = data[key];
    });
    // foundCatagory.code = data.code;
    // foundCatagory.name = data.name;
    return await  foundCatagory.save();
  }
  async deleteCategory(id: number) {
    const foundCatagory = await this.getCategoryById(id);
    // return await this.categoryRepository.remove(foundCatagory);
    return await this.categoryRepository.delete(id);
    // await categories.save();
  }
  async getProductsByCategoryId(id: number): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      categoryId: id
    })
  }
}