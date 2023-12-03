import  { mergeResolvers } from "@graphql-tools/merge"
import { userResolvers } from "./userResolver.js";
import { productResolver } from "./productResolver.js";
import { transactionResolver } from "./transactionResolver.js";

export const mergedResolvers = mergeResolvers([userResolvers,productResolver,transactionResolver]);
