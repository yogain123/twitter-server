const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(cookieParser());
require("dotenv").config();
const routing = require("./routing");

const port = process.env.PORT || 7777;

app.use("/", routing);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
