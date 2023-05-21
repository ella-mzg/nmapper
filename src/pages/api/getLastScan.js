import QueryModel from "@/db/models/QueryModel"
import mongoose from "mongoose"
import config from "../../../config"

const getLastScan = async (req, res) => {
  await mongoose.connect(config.db.uri)

  try {
    const stdout = await QueryModel.findOne().sort({ createdAt: -1 })
    res.status(200).json(stdout)
  } finally {
    await mongoose.disconnect()
  }
}

export default getLastScan
