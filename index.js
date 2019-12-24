const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const routing = require("./routing");

const port = process.env.PORT || 7777;

require("dotenv").config();

app.use("/", routing);

app.listen(port, () => {
  console.log("App listening on port 3000!");
});
