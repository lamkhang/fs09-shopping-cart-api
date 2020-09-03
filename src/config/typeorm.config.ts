import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  entities: [__dirname + "/../modules/**/*.entity.{ts,js}"],  // dinh nghia path tro den models
  database: 'fs09-shopping-cart',
  synchronize: true,
}