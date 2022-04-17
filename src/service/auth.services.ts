import { privateFields, User } from '../model/user.model';
import { DocumentType } from '@typegoose/typegoose';
import { signJwt } from '../utils/jwt';
import SessionModel from '../model/session.model';
import { omit } from 'lodash';

export const createSession = async (userId: string) =>
  SessionModel.create({ user: userId });

export const signAccessToken = (user: DocumentType<User>) => {
  const userObject = omit(user.toJSON(), privateFields);
  return signJwt(userObject, 'accessTokenPrivateKey', { expiresIn: '1h' });
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const createdSession = await createSession(userId);
  return signJwt(
    {
      session: createdSession._id,
    },
    'refreshTokenPrivateKey',
    { expiresIn: '14d' }
  );
};
