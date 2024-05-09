const { connect } = require("mongoose");

require("dotenv").config();

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASS);

connect(db).then(() => {
  console.log("ami db");
});
console.log();
