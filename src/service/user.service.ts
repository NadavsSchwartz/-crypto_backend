import UserModel, { User } from "../model/user.model"
export const createUser = async (input: Partial<User>) => {
return UserModel.create(input)
}