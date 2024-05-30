require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const { credentials } = require("./middlewares/passport");
const CustomError = require("./Utils/customError");
const { NOT_FOUND } = require("./Utils/constants");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const authRouter = require("./auth/router/routes");

credentials(passport);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);

app.all("*", (req, res, next) => {
  const error = new CustomError(NOT_FOUND.message, NOT_FOUND.status);
  next(error);
});

app.use(globalErrorHandler);

mongoose
  .connect(process.env.MONGO_TEST_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started and db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
