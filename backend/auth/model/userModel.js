const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const experienceSchema = require("../schema/experienceSchema");
const qualificationSchema = require("../schema/qualificationSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  mobile_no: {
    type: Number,
    trim: true,
  },
  linkedIn: {
    type: String,
  },
  qualifications: qualificationSchema,
  jobRoles: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  experience: experienceSchema,
  preferredLocations: {
    type: [String],
  },
  profilePhoto: {
    type: String,
  },
  resume: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
