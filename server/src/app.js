const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");

const api = require("./api");
const app = express();

const httpServer = http.createServer(app);

app.use(cors({ origin: "*" }));

app.use(express.json());

const startApollo = async () => {
  const server = new ApolloServer({
    // ...api.v1,
    resolvers: api.v1.resolvers,
    typeDefs: api.v1.schemas,

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
};

startApollo();

module.exports = httpServer;
