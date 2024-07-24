require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const { credentials } = require("./config/passport.config");
const CustomError = require("./Utils/customError");
const { NOT_FOUND } = require("./Utils/constants");
const globalErrorHandler = require("./Utils/globalErrorHandler");
const authRouter = require("./auth/router/routes");
const XSSValidateMW = require("./middlewares/inputValidator");
const cookieParser = require("cookie-parser");
const userRouter = require("./user/router/routes");

credentials(passport);

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(XSSValidateMW);

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  const error = new CustomError(NOT_FOUND.message, NOT_FOUND.status);
  next(error);
});

app.use(globalErrorHandler);

mongoose
  .connect(process.env.MONGO_TEST_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started and db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
