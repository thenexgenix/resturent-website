import mongoose from "mongoose";

const blackListUserSchemma = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Automatically delete documents after 24 hours (86400 seconds)
  },
});

const BlacklistUser =
  mongoose.model.BlackListToken ||
  mongoose.model("BlackListToken", blackListUserSchemma);

export default BlacklistUser;
