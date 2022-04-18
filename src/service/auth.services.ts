import UserModel, { privateFields, User } from '../model/user.model';
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

export const findSessionById = async (sessionId: string) =>
  SessionModel.findById(sessionId);

export const verifySession = async (sessionId: string) => {
  const foundSession = await findSessionById(sessionId);
  if (foundSession) {
    return foundSession;
  }
  return null;
};

export const findUserByEmail = async (email: string) =>
  UserModel.findOne({ email });

export const findUserByPasswordResetCode = async (passwordResetCode: string) =>
  UserModel.findOne({ passwordResetCode });

export const verifyUser = async (verificationCode: string) => {
  const foundUser = await findUserByEmail(verificationCode);
  if (foundUser) {
    foundUser.isVerified = true;
    await foundUser.save();
    return foundUser;
  }
  return null;
};
