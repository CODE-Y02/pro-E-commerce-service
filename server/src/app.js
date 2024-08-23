const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");

// Import middlewares
const middlewares = require("./middlewares");

// Import your API definitions
const api = require("./api");
const { seedInitData } = require("./seed");

const app = express();
const httpServer = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

// Apply API key middleware
// app.use(middlewares.auth.apiKey);

// decode jwt and get user
// app.use(middlewares.auth.jwt);

// Example route to seed initial data
app.get("/load-static", (_, res) => {
  seedInitData();
  res.send("static data loaded");
});

// Custom error formatter
const formatError = (error) => ({
  message: error.message,
  code: error.extensions.code || "INTERNAL_SERVER_ERROR",
});

const startApollo = async () => {
  const server = new ApolloServer({
    resolvers: api.v1.resolvers,
    typeDefs: api.v1.schemas,
    context: ({ req }) => ({
      token: req.headers.token, // If you need the raw token
      user: req.user, // User information from JWT
    }),
    formatError,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

startApollo();

module.exports = httpServer;
