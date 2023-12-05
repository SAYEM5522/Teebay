import prisma from "../db/db.config.js";

export const productResolver = {
  Query: {
    getProduct: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { user: true, rents: true },
      });
    },
    getAllproducts: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Fetch all available products
      const allProducts = await prisma.product.findMany({
        include: {
          rents: true, // Include rents associated with each product
        },
      });

      return allProducts;
    },
    userProducts: async (_, __, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }
    
      // Fetch products specific to the authenticated user
      const userProducts = await prisma.product.findMany({
        where: {
          userId: context.userId,
        },
        include: {
          rents: true, // Include rents associated with each product
        },
      });
    
      return userProducts;
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
          createdAt: new Date(),
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
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Find the existing product
      const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: { rents: true },
      });

      // Check if the user is the owner of the product
      if (existingProduct.userId !== context.userId) {
        throw new Error('Permission denied. You are not the owner of this product.');
      }

      // Update product in the database
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          name: name || existingProduct.name,
          categories: categories || existingProduct.categories,
          description: description || existingProduct.description,
          price: price || existingProduct.price,
          rents: {
            update: {
              where: { id: existingProduct.rents[0]?.id || -1 },
              data: {
                price: rentPrice || existingProduct.rents[0]?.price,
                duration: rentDuration || existingProduct.rents[0]?.duration,
              },
            },
          },
        },
        include: {
          user: true,
          rents: true,
        },
      });

      return updatedProduct;
    },
    deleteProduct: async (_, { productId }, context) => {
       // Check if the user is authenticated
       if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Find the existing product
      const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: { rents: true },
      });

      // Check if the user is the owner of the product
      if (existingProduct.userId !== context.userId) {
        throw new Error('Permission denied. You are not the owner of this product.');
      }
      await prisma.rent.deleteMany({
        where: { productId: parseInt(productId) },
      });
      await prisma.transaction.deleteMany({
        where: { productId: parseInt(productId) },
      });
      // Delete product from the database
      await prisma.product.delete({
        where: { id: parseInt(productId) },
      });

      return `Product with ID ${productId} has been deleted by user with ID ${context.userId}`;
    },
    buyProduct: async (_, { productId }, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Get information about the product and its seller
      const productInfo = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: { user: true }, // Assuming there is a user association
      });

      if (!productInfo) {
        throw new Error('Product not found');
      }

      if (productInfo.isBought) {
        throw new Error('This product has already been bought');
      }

      // Buy product logic
      await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          isBought: true,
        },
      });

      // Log transaction for the buyer
      await prisma.transaction.create({
        data: {
          type: 'BOUGHT', // Indicate that the user has bought the product
          productId: parseInt(productId),
          userId: context.userId,
        },
      });

      // Log transaction for the seller
      await prisma.transaction.create({
        data: {
          type: 'SOLD', // Indicate that the seller has sold the product
          productId: parseInt(productId),
          userId: productInfo.user.id,
        },
      });

      return `Product with ID ${productId} has been bought by user with ID ${context.userId}`;
    },
    rentProduct: async (_, { productId, startTime, endTime }, context) => {
      // Check if the user is authenticated
      if (!context.userId) {
        throw new Error('Authentication required');
      }

      // Find the product with associated rents
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: { rents: true },
      });
      console.log(product)
      
    const rent = product?.rents[0];
      
      if (product.isBought) {
        throw new Error('This product has been sold');
      }
      const isRented = await prisma.transaction.findFirst({
        where: {
          productId: parseInt(productId),
          type: 'RENTED',
        },
      });

      if (isRented) {
        throw new Error('This product is already rented.');
      }
     
      // Update the rent with new information
      const updatedRent = await prisma.rent.update({
        where: { id: rent.id },
        data: {
          startTime: startTime ? new Date(startTime) : rent.startTime,
          endTime: endTime ? new Date(endTime) : rent.endTime,
        },
      });

      // Log transaction
      await prisma.transaction.create({
        data: {
          type: 'RENTED',
          productId: parseInt(productId),
          userId: context.userId,
        },
      });

      return updatedRent;
    },
    viewProduct: async (_, { productId }, context) => {
     // Check if the user is authenticated
     if (!context.userId) {
      throw new Error('Authentication required');
    }

    // Find the product
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    // Check if the user's email is already associated with the product's views
    const userView = await prisma.productView.findFirst({
      where: {
        productId: parseInt(productId),
        userEmail: context.userEmail, // Assuming userEmail is available in context
      },
    });

    // If the user's email is not associated with the product's views, increase the view count
    if (!userView) {
      await prisma.productView.create({
        data: {
          productId: parseInt(productId),
          userEmail: context.userEmail, // Assuming userEmail is available in context
        },
      });

      // Increment the product's view count
      await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          views: product.views + 1,
        },
      });
    }

    return product;
    },
  },
};

