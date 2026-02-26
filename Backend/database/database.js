const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1:27017/KSHS")
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

connection.on("connected", () => {
  console.log("Mongoose connected to database");
});

connection.on("error", (err) => {
  console.log(err.message);
});

connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("Sign", async () => {
  await connection.close();
  process.exit(0);
});
