import prisma from "../db/db.config.js";

export const transactionResolver = {
  Query: {
    getUserTransactions: async (_, { userId }) => {
      return await prisma.transaction.findMany({
        where: { userId: parseInt(userId) },
        include: { product: true, user: true },
      });
    },
  },
};