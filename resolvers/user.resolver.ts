import { UserModel } from '@/models/user.model';

export const resolvers = {
  Query: {
    users: async () => {
      return await UserModel.find();
    },
    user: async (_, { id }) => {
      return await UserModel.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = new UserModel(input);
      return await newUser.save();
    },
    updateUser: async (_, { input }) => {
      const { id, ...updateData } = input;
      return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteUser: async (_, { id }) => {
      await UserModel.findByIdAndDelete(id);
      return { message: 'User deleted successfully' };
    },
  },
};
