const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const config = require("./config");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./tennisnote.yaml");
const {
  cors: { allowedOrigin },
} = require("./config");
const cron = require("node-cron");

const authRouter = require("./router/auth");
const studentRouter = require("./router/student");
const clubRouter = require("./router/club");
const utilRouter = require("./router/util");
const app = express();

const corsOption = { origin: allowedOrigin, optionsSuccessStatus: 200, credentials: true };

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
app.use("/student", studentRouter);
app.use("/club", clubRouter);
app.use("/util", utilRouter);

app.listen(config.port, async () => {
  console.log(`π Listening on PORT: ${config.port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// μ€μΌμ₯΄λ¬ μ€μ : κ° μμΌμ μμ λ§λ€, κ·Έ μ λ μ μμμ΄ μμλ μκ°μμ μμ νμ 1νμ© μ°¨κ°
const { minusUserCounts } = require("./controllers/functions/sequelize");
const days = [
  { id: 1, name: "Mon", toMinus: 7 },
  { id: 2, name: "Tue", toMinus: 1 },
  { id: 3, name: "Wed", toMinus: 2 },
  { id: 4, name: "Thu", toMinus: 3 },
  { id: 5, name: "Fri", toMinus: 4 },
  { id: 6, name: "Sat", toMinus: 5 },
  { id: 7, name: "Sun", toMinus: 6 },
];
days.forEach((day) => {
  cron.schedule(`0 0 0 * * ${day.name}`, async () => {
    try {
      const updated = await minusUserCounts(day.toMinus);
      console.log({ message: "counts updated", updated });
    } catch (err) {
      console.error(err);
    }
  });
});

// μ€μΌμ₯΄λ¬ μ€μ : λ§€μΌ μ€μ  10μλ§λ€, μμ νμκ° 0μΈ μκ°μμκ² μ¬κ²°μ  μλ¦Ό λ³΄λ΄κΈ°
const { findAllClubInfo } = require("./controllers/functions/sequelize");
const { sendRepaymentSMS } = require("./controllers/util");
cron.schedule("0 0 9 * * *", async () => {
  try {
    const { clubs } = await findAllClubInfo();
    clubs.forEach(async (clubInfo) => await sendRepaymentSMS(clubInfo));
  } catch (err) {
    console.error(err);
  }
});
