import { object, string, TypeOf } from 'zod';

export const getNewsByCategorySchema = object({
  params: object({
    category: string({
      required_error: 'Category is required',
    }),
  }),
});

export type GetNewsByCategoryInput = TypeOf<
  typeof getNewsByCategorySchema
>['params'];
