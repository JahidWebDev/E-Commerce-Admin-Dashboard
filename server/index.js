require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dbConnection = require("./config/db");
const router = require("./Routes");
// const cors = require("cors"); 

const app = express();
const port = 3000;


app.use(express.json());

const store = new MongoDBStore({ 
  uri: process.env.DB_URL,
  collection: "mySessions"
})


// app.use(
//   cors({
//     origin: "http://localhost:5173", 
//     credentials: true,
//   })
// );


app.use(
  session({
    secret: "ecommerceapi",
    resave: false,
    saveUninitialized: true,
    store: store,
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