import  { mergeTypeDefs } from "@graphql-tools/merge"
import { userTypes } from "./userSchema.js";
import { productSchema } from "./productSchema.js";
import { transactionSchema } from "./transactionSchema.js";

export const mergedTypes = mergeTypeDefs([userTypes,productSchema,transactionSchema]);