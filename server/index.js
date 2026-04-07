require("dotenv").config();

const router = require("./Routes");
const express = require("express");
const dbConnection = require("./config/db");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


app.use(
  session({
    secret: process.env.SESSION_SECRET || "my_secret_key_12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);


app.use(router);


dbConnection();


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});