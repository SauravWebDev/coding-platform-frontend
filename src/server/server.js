const express = require("express");
const path = require("path");
const app = express();
const buildDirPath = path.join(__dirname, "../../", "build");
const buildFilePath = path.join(buildDirPath, "index.html");
const port = 3000;

app.use(express.static(buildDirPath));

app.get("/*", function (req, res) {
  res.sendFile(buildFilePath);
});
app.listen(port);
