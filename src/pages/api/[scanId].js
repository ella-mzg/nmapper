import QueryModel from "@/db/models/QueryModel"
import mongoose from "mongoose"
import config from "../../../config"

const getScanById = async (req, res) => {
  const { scanId } = req.query
  await mongoose.connect(config.db.uri)

  try {
    const stdout = await QueryModel.findById(scanId)
    res.status(200).json(stdout)
  } finally {
    await mongoose.disconnect()
  }
}

export default getScanById
