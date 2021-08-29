import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { InjectRepository } from "@nestjs/typeorm";
import { isPasswordMatched } from "src/common/utils";
import { UserRepository } from "../user/user.repository";
import { AuthDTO } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(userLogin: AuthDTO) {
    const { email, password } = userLogin;
    const user = await this.userRepository.findOne({email});

    if(!user || !isPasswordMatched(password, user.password)) {
      throw new UnauthorizedException();
    };

    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      ...payload,
    };

  }

  async authorize(email, userTypeArr) {
    const user = await this.userRepository.findOne({email});
    if(user && userTypeArr.indexOf(user.userType) === -1)
      return user.userType
    return null
  }
}