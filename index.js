require("./db/dbConfig");
const express = require("express");
const cors = require("cors");
const route = require("./routers");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("ami port"));
