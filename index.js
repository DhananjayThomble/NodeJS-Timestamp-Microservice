const express = require("express");
const app = express();
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// to validate date
const isDate = function (dateString) {
  let date = new Date(dateString);
  return date instanceof Date && isFinite(date.getTime());
};

app.get("/api/:input", (request, response) => {
  let input = request.params.input;
  let responseObject = {};
  if (isDate(input)) {
    // got valid date, ex: yyyy-mm-dd
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  } else {
    // got input in unix time, ex:1451001600000
    input = parseInt(input);
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  }

  if (!responseObject["unix"] || !responseObject["utc"]) {
    response.json({ error: "Invalid Date" });
  } else response.json(responseObject);
});

app.get("/api", (request, response) => {
  let responseObject = {};
  responseObject["unix"] = new Date().getTime();
  responseObject["utc"] = new Date().toUTCString();

  response.json(responseObject);
});

// listen for requests :)
const listener = app.listen(3000, function () {
  console.log("Your app is listening on port 3000");
});
