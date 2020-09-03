import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity({name: 'category'})
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'category_id'})
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
  @Column({name: 'image_url', nullable: true})
  imageUrl: string

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;

  // relation 
  @OneToMany(
    type => ProductEntity, 
    product => product.categoryId
    )
    products: ProductEntity
}

