import { Schema } from "mongoose"

const QuerySchema = new Schema(
  {
    target: {
      type: String,
      required: true,
    },
    scanType: String,
    portRange: [String],
    maxRetries: Number,
    hostTimeout: Number,
    input: String,
    output: String,
  },
  {
    timestamps: true,
  }
)

export default QuerySchema
