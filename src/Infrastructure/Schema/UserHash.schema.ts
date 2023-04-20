import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserHash {
  @Prop()
  id: string;
  @Prop()
  avatarHash: string;
}
export const UserHashSchema = SchemaFactory.createForClass(UserHash);
