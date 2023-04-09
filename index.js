const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

//import typedefs and resolvers
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')

//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ],
  });
  await server.start()
  server.applyMiddleware({ path:"/graphql",app });

  // httpServer.listen({ port: process.env.PORT }, () =>
  // console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
  httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at ${process.env.VERCEL_URL}/graphql`); 
  });
}

//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());
const httpServer = http.createServer(app);

// Start the Apollo Server
startApolloServer(app, httpServer);

