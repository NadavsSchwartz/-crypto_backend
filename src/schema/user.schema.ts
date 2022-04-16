import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Email is not valid'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters long'),
    passwordConfirmation: string({
      required_error: 'Password Confirm is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password and Password Confirmation must match',
    path: ['passwordConfirmation'],
  }),
});

export const verifyUserSchema = object({
  params: object({
    verificationCode: string({
      required_error: 'Verification Code is required',
    }),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is not valid'),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
