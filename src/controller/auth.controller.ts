import { Request, Response } from 'express';
import { get } from 'lodash';
import { CreateSessionInput } from '../schema/auth.schema';
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from '../service/auth.services';
import { verifyJwt } from '../utils/jwt';
import log from '../utils/logger';
import { findUserByEmail, findUserById } from '../service/user.service';
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

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const message = 'Refresh token is invalid';

  const refreshToken = get(req, 'headers.x-refresh-token');
  if (!refreshToken) {
    return res.status(401).send({ message });
  }
  try {
    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      'refreshTokenPublicKey'
    );
    if (!decoded) {
      return res.status(401).send({
        message: message,
      });
    }
    const { session } = decoded;
    const foundSessions = await findSessionById(session);
    if (!foundSessions || !foundSessions.valid) {
      return res.status(404).send({
        message: message,
      });
    }

    const user = await findUserById(String(foundSessions.user));
    if (!user)
      return res.status(404).send({
        message: message,
      });

    const accessToken = signAccessToken(user);
    return res.status(200).send({
      accessToken,
    });
  } catch (error) {
    log.error(error);
    return res.status(500).send(error);
  }
};
