import { IsNotEmpty, Length } from "class-validator";


export class AuthDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string
}