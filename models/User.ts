import mongoose from "mongoose"
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  uid: {
    type: String,
    required: true,
    unique: true
  },
  activityIds: {
    type: Array<String>,
    ref: 'Activity'
  }
});

const User = mongoose.model('User', userSchema);

export default User;