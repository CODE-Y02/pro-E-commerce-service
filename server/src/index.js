const app = require("./app.js");
const { PORT } = require("./config.js");
const connectDB = require("./db");

async function main() {
  connectDB()
    .then(() =>
      app
        .listen(PORT, () => {
          console.log(`Server running @PORT : ${PORT}`);
        })
        .on("error", (err) => {
          console.error(`Server starting Err @PORT : ${PORT} \n  Err: ${err} `);
        })
    )
    .catch((err) => {
      console.error(`DB connection err: ${err}`);
    });
}
main();
