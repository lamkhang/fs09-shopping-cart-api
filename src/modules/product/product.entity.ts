import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { CategoryEntity } from "../category/category.entity";
import { UserEntity } from "../user/user.entity";

@Entity({name: 'product'})
export class ProductEntity extends BaseEntity{
  @PrimaryGeneratedColumn({name: 'product_id'})
  id: number;

  @Column({ name: 'category_id'})
  @JoinColumn({name: 'category_id'})
  @ManyToOne(
    type=> CategoryEntity,
    category => category.products
    )
  categoryId: Number;

  @Column()
  name: string;

  @Column({ name: 'image_url'})
  imageUrl: string

  @Column()
  price: number

  @ManyToMany(type => UserEntity, user => user.products)
  users: UserEntity[]

  
}