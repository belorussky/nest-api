import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema({ timestamps: true })
export class AuthModel {
	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
