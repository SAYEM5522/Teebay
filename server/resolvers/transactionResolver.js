import prisma from "../db/db.config.js";

export const transactionResolver = {
  Query: {
    mySales: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Fetch transactions where the user is the seller
      const mySales = await prisma.transaction.findMany({
        where: {
          userId: context.userId,
          type: 'SOLD',
        },
        include: {
          product: {
            include: {
              rents: true,
            },
          },
        },
       
      });

      return mySales;
    },

    myPurchases: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }
    
      // Fetch transactions where the user is the buyer
      const myPurchases = await prisma.transaction.findMany({
        where: {
          userId: context.userId,
          type: 'BOUGHT',
        },
        include: {
          product: {
            include: {
              rents: true,
            },
          },
        },
      });
    
      return myPurchases;
    },
    
  },
};