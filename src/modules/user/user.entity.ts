import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({name: "user_id"})
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({default: "Client"})
  userType: string;

  @Column()
  avatar: string;

  @ManyToMany(type => ProductEntity, product => product.users)
  @JoinTable()
  products: ProductEntity[];
}
