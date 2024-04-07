const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");

const api = require("./api");
const { seedInitData } = require("./seed");
const app = express();

const httpServer = http.createServer(app);

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/load-static", (req, res) => {
  seedInitData();
  res.send("hi");
});

const startApollo = async () => {
  const server = new ApolloServer({
    // ...api.v1,
    resolvers: api.v1.resolvers,
    typeDefs: api.v1.schemas,

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
};

startApollo();

module.exports = httpServer;
