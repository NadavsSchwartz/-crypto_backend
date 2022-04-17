import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { signAccessToken, signRefreshToken } from '../service/auth.services';
import { findUserByEmail } from '../service/user.service';
import log from '../utils/logger';

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    log.debug(`User with email ${email} found`);
    if (!user) {
      return res.status(404).send({
        message: 'User not found or invalid password',
      });
    }
    if (!user.isVerified) {
      return res.status(403).send({
        message: 'User not verified',
      });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(403).send({
        message: 'Invalid password',
      });
    }

    //sign a token
    const accessToken = signAccessToken(user);
    // sign refresh token
    const refreshToken = await signRefreshToken({ userId: user._id });
    //send token

    return res.status(200).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    log.error(error);
    return res.status(500).send(error);
  }
};
