import express from "express"
import cors from "cors"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer } from "apollo-server-express"
import { mergedTypes } from "./schema/mergeSchema.js"
import { mergedResolvers } from "./resolvers/mergeResolver.js"
import jwt from "jsonwebtoken"
const PORT=process.env.PORT||8081
const app=express()
app.use(cors())

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

app.get("/",(req,res)=>{
  res.status(200).send("done")
})

let server=null
async function startServer() {
   server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // Extract user ID from the token
      const token = req.headers.authorization || '';
      const decodedToken = jwt.decode(token.replace('Bearer ', ''), '123456');
      const userId = decodedToken ? decodedToken.userId : null;
      const userEmail = decodedToken ? decodedToken.email : null;
      return { userId,userEmail };
    },
  
  });
  await server.start();
  server.applyMiddleware({ app, path: '/teebay' });

}
startServer();

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
  console.log(`gql path is ${server.graphqlPath}`);

})