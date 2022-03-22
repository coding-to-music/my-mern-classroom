import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mern-classroom";

console.log("MONGODB_URI", MONGODB_URI);

// Connection URL
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Test connection
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
