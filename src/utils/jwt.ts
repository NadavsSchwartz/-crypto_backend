import JWT from 'jsonwebtoken';
import config from 'config';
import log from './logger';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: JWT.SignOptions | undefined
) => {
  const key = config.get<string>(keyName);
  return JWT.sign(payload, key, { ...(options && options) });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  console.log(token);
  const key = config.get<string>(keyName);
  try {
    return JWT.verify(token, key) as T;
  } catch (error) {
    log.error(error, "couldn't Verify JWT");
    return null;
  }
};
