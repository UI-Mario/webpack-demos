const mongoose = require("mongoose");
// db是数据库名称哦，没有的话会自动创建
const DB_ADDRESS = "mongodb://localhost/db1";
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    log.fatal({ msg: "[Mongoose] database connect failed!", err });
  } else {
    console.log("[Mongoose] database connect success!");
  }
});

module.exports = mongoose;
