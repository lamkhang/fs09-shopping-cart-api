import { IsNotEmpty, Length } from "class-validator";


export class CreateCategoryDTO {
  @IsNotEmpty()
  @Length(2, 5)
  code: string;

  @IsNotEmpty()
  @Length(2)
  name: string
}