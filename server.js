const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
const DB = 'mongodb+srv://iamsun:iamsunnatoursapp@natours-app.avhtge2.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => {
  console.log("DB connection succesful!!!");
});

const app = require("./app");
const { type } = require("os");
const server = require("http").createServer(app);

server.listen(process.env.PORT, "0.0.0.0", () => console.log("server running..."));

// handling unhandled promise rejection
process.on("uncaughtException", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("uncaught exception shutting down");
  console.log(err.name, err.name);
  server.close(() => {
    process.exit(1);
  });
});

