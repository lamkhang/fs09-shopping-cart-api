import { IsNotEmpty, Length } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  categoryId: number;

  @Length(2)
  name: string;

  imageUrl: string;
  
  @IsNotEmpty()
  price: number
}