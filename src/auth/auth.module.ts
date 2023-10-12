import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models/auth.model';

@Module({
	controllers: [AuthController],
	imports: [MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }])],
})
export class AuthModule {}
