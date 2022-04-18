import UserModel, { User } from '../model/user.model';

export const createUser = async (input: Partial<User>) => {
  return UserModel.create(input);
};

export const verifyUser = async (verificationCode: string) => {
  const foundUser = await UserModel.findOne({
    verificationCode: verificationCode,
  });

  if (foundUser) {
    foundUser.isVerified = true;

    await foundUser.save();
    return foundUser;
  }
  return null;
};

export const findUserById = async (id: string) => {
  return UserModel.findById(id);
};
export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const findUserByPasswordResetCode = async (
  passwordResetCode: string
) => {
  return UserModel.findOne({ passwordResetCode });
};
