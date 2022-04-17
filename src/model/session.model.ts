import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Session {
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;

  @prop()
  expiresAt: Date;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true },
});

export default SessionModel;
