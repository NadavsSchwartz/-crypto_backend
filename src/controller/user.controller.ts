import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import {
  CreateUserInput,
  ForgotPasswordInput,
  VerifyUserInput,
} from '../schema/user.schema';
import {
  createUser,
  findUserByEmail,
  verifyUser,
} from '../service/user.service';
import log from '../utils/logger';
import sendEmail from '../utils/mailer';
import config from 'config';

const baseURL = config.get<string>('baseURL');
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'DoNotReply <support@cryptoapp.win>',
      to: user.email,
      subject: 'Verify your email',
      text: `Hello ${user.firstName},
                Please verify your email by clicking on the following link:
                ${baseURL}/api/users/verify/${user.verificationCode}
                `,
    });
    return res.status(201).send(user);
  } catch (error: any) {
    if (error.code == 11000) {
      return res.status(409).send({
        message: 'User already exists',
      });
    }
    return res.status(500).send(error);
  }
};
export const verifyUserHandler = async (
  req: Request<VerifyUserInput>,
  res: Response
) => {
  const verificationCode = req.params.verificationCode;

  const user = await verifyUser(verificationCode);
  if (user) {
    return res.status(200).send('user verified successfully');
  }
  return res.status(404).send({
    message: 'User not found, or already verified',
  });
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  //forgot password send email to user email

  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);

    const resetPasswordMessage =
      "if an account with this email exists, you'll receive an email with a link to reset your password";

    const notVerifiedMessage = 'The account with this email is not verified';
    if (!user) {
      log.debug(`User with email ${email} not found`);
      return res.send(resetPasswordMessage);
    }
    if (!user.isVerified) {
      log.debug(`User with email ${email} is not verified`);
      return res.send(notVerifiedMessage);
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendEmail({
      from: 'DoNotReply <cryptoapp@cryptoapp.win>',
      to: user.email,
      subject: 'Reset your password',
      text: `Hello ${user.firstName},
                Please reset your password by clicking on the following link:
                ${baseURL}/api/users/reset-password/${passwordResetCode}
                `,
    });

    return res.send(resetPasswordMessage);
  } catch (error) {
    return res.status(500).send(error);
  }
};
