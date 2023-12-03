import prisma from "../db/db.config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const userResolvers = {
  Query: {
    getUser: async(_, { email }) => {
      return await prisma.user.findUnique({
        where: { email:email },
        include: { products: true, transactions: true }
      });
    },
  },
  Mutation: {
    signup: async (_, { firstName, lastName, address, email, phoneNumber, password }) => {
      // Find user by email
      const existsUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existsUser) {
        throw new Error('User with the given email already exist');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in the database
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          address,
          email,
          phoneNumber,
          password: hashedPassword
        }
      });

      // Generate and return a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key');
      return token;
    },
    login: async (_, { email, password }) => {

      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });

      // Check if the user exists
      if (!user) {
        throw new Error('User not found');
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      // Generate and return a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key');
      return token;
    },
  },
};