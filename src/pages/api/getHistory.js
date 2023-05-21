import QueryModel from "@/db/models/QueryModel"
import mongoose from "mongoose"
import config from "../../../config"

const getHistory = async (req, res) => {
  await mongoose.connect(config.db.uri)

  try {
    const stdout = await QueryModel.find()
    res.status(200).json(stdout)
  } finally {
    await mongoose.disconnect()
  }
}

export default getHistory
