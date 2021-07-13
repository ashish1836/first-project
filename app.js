const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ejs = require("ejs");
const users = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);

app.all("*", (req, res, next) => {
  res.status(404).json({ status: "fail", message: `Invalid request` });
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
