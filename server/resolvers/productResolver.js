import prisma from "../db/db.config.js";

export const productResolver = {
  Query: {
    getProduct: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { user: true, rents: true },
      });
    },
  },
  Mutation: {
    createProduct: async (_, { name, categories, description, price, rentPrice, rentDuration }, context) => {
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Create product in the database
      const product = await prisma.product.create({
        data: {
          name,
          categories,
          description,
          price,
          createdAt: new Date().toISOString(), // Set creation timestamp
          userId: context.userId,
          rents: {
            create: {
              startTime:null,
              endTime:null,
              price: rentPrice,
              durationType: rentDuration
            }
          }
        },
        include: {
          user: true,
          rents: true
        }
      });

      // Log transaction
      await prisma.transaction.create({
        data: {
          type: 'CREATED',
          productId: product.id,
          userId: context.userId,
        }
      });

      return product;
    },
    editProduct: async (_, { productId, name, categories, description, price, rentPrice, rentDuration }, context) => {
      // Implementation
    },
    deleteProduct: async (_, { productId }, context) => {
      // Implementation
    },
    buyProduct: async (_, { productId }, context) => {
      // Implementation
    },
    rentProduct: async (_, { productId, startTime, endTime }, context) => {
      // Implementation
    },
    viewProduct: async (_, { productId }, context) => {
      // Implementation
    },
  },
};

