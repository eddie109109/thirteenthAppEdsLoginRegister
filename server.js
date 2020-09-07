const express = require("express");
const path = require("path");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "build"))); // connect to the static file through express

//direct the user to the built version of react front page, it only works once it is built(yarn built)

app.use("/", router);

// server static assets in production
if (process.env.NODE_ENV === "production") {
  //   app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
