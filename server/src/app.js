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

const middlewares = require("./middlewares");

const app = express();

const httpServer = http.createServer(app);

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/load-static", (req, res) => {
  seedInitData();
  res.send("hi");
});

// Custom error formatter
const formatError = (error) => {
  // Customize the error message and structure as needed
  return {
    message: error.message,
    code: error.extensions.code || "INTERNAL_SERVER_ERROR",
  };
};

// Custom response formatter
// const formatResponse = (response, { context }) => {
//   // Wrap response data and errors in a structured format

//   console.log("DEBUG \n ", JSON.stringify(response));
//   return {
//     data: response.data,
//     errors: response.errors ? response.errors.map(formatError) : null,
//     // Additional metadata can be included here if needed
//   };
// };

const startApollo = async () => {
  const server = new ApolloServer({
    resolvers: api.v1.resolvers,
    typeDefs: api.v1.schemas,
    // context: authenticateUser, // Pass the middleware function directly to context
    formatError, // Use custom error formatter
    //formatResponse, // Use custom response formatter

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
