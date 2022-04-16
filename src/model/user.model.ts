import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from '@typegoose/typegoose';
import argon2 from 'argon2';
import { nanoid } from 'nanoid';
import log from '../utils/logger';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({
  email: 1,
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop({ required: true, default: false })
  isVerified: boolean;

  @prop()
  passwordResetCode: string | null;

  async comparePassword(this: DocumentType<User>, inputPassword: string) {
    try {
      return await argon2.verify(this.password, inputPassword);
    } catch (error) {
      log.error(error, "couldn't Verify Password");
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
