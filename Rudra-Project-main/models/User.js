import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    friends: [{ type: Mongoose.SchemaTypes.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default Mongoose.model("User", userSchema);
