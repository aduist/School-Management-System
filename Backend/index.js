const express = require("express");
const app = express();
const logger = require("morgan");
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use('/uploads', express.static(path.join(__dirname, 'storage')))

//uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception occurred! shutting down');
  process.exit(1)
})
require("./database/database");

//middleware
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

//routes
require("./features/routes/index")(app);

app.get("/", async (req, res, next) => {
  res.send("<h4>Welcome to App Pharmacy</h4>");
});

app.all('*', async (req, res, next) => {
  const err = `can't find ${req.originalUrl} on the server!`
  next(err);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App Server running on port ${port}`);
});

process.on('UnhandledRejection', (err) => {
  console.log(err)
  console.log('Unhandled Rejection Occurs! Shutting Down..')
  server.close(() => {
    process.exit(1)
  })
})