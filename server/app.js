const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const config = require("./config");
const {
  cors: { allowedOrigin },
} = require("./config");

const authRouter = require("./router/auth");
const clubRouter = require("./router/club");
const app = express();

const corsOption = { origin: allowedOrigin, optionsSuccessStatus: 200, credentials: true };
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Tennis Note!");
});
app.use("/auth", authRouter);
app.use("/club", clubRouter);

app.listen(config.port, async () => {
  console.log(`🚀 Listening on PORT: ${config.port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
