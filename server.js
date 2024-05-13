console.log("server is starting");

var express = require("express");

var app = express();

var server = app.listen(4000, listening);

function listening() {
  console.log("running...");
}

app.use(express.static("."));
