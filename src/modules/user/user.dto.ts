import { IsNotEmpty, Length, IsEmail } from "class-validator";
export class CreateUserDTO {
  @IsNotEmpty({
    message: "email is require"
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 20, {
    message: "password is length between 5 and 20"
  })
  password: string;

  @IsNotEmpty()
  fullName: string;
}