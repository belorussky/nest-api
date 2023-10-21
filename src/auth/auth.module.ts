import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, AuthSchema } from './models/user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JWTStratagy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{ name: UserModel.name, schema: AuthSchema }]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
	],
	providers: [AuthService, JWTStratagy],
})
export class AuthModule {}
