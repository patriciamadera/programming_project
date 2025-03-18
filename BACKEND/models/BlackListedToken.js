const mongoose = require("mongoose");

const BlacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("BlacklistToken", BlacklistTokenSchema);