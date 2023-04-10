import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: number;
  @Prop()
  email: string;
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  avatar: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
