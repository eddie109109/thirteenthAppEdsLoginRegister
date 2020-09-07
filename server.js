const express = require("express");
const path = require("path");
const app = express();

app.use(express.json);

app.get("/", (req, res) => {
  res.send(200);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
