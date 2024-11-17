import Mongoose from "mongoose";
import { COLLABORATOR_ROLES } from "../utils/constants";

const projectSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: Mongoose.SchemaTypes.ObjectId, ref: "User" },
    collaborators: [
      {
        user: { type: Mongoose.SchemaTypes.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: Object.values(COLLABORATOR_ROLES),
          default: COLLABORATOR_ROLES.VIEWER,
        },
      },
    ],
  },
  { timestamps: true }
);

export default Mongoose.model("Project", projectSchema);
