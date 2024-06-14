const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { ROLES } = require("../../Utils/constants");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  hash: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

authSchema.plugin(passportLocalMongoose);
authSchema.plugin(findOrCreate);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
