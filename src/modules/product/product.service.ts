import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "./product.repository";
import { ProductEntity } from "./product.entity";
import { CreateProductDTO } from "./product.dto";
import { getConnection } from "typeorm";



@Injectable()
export class ProductService {
  constructor( 
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) { }

  // Array <ProductEntity>
  async getProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['categoryId']
    })
  }
  async getProduct_v2(): Promise<any> {
    const sqlQuery = `
    SELECT 
      category.name AS category_name,
      product.*
    FROM product
    INNER JOIN category
      ON category.category_id = product.category_id
      `;
    const sqlRecords = await getConnection().query(sqlQuery) || [];
    const _sqlRecords = sqlRecords.map(record => {
      return {
        ...record,
        category: {
          id: record.category_id,
          name: record.category_name
        },
        category_id: undefined,
        category_name: undefined
      }
    })
    return _sqlRecords;
  }
  async createProduct(data: CreateProductDTO): Promise<ProductEntity> {
    const foundProduct = await this.productRepository.findOne({name: data.name});
    if(foundProduct && (foundProduct.categoryId === data.categoryId)) throw new ConflictException("Product is exist")
    const newProduct = this.productRepository.create(data);
    await newProduct.save();
    return newProduct;
  }
}