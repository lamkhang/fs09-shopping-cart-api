import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtauthStrategy } from "./jwt.strategy";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<number>('jwt.expiresIn') },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtauthStrategy, LocalStrategy]
})
export class AuthModule {}