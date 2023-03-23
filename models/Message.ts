import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MessageSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
