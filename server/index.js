const keys = require("./keys/index");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connect } = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = keys.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: keys.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connect(keys.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
