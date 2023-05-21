import QueryModel from "@/db/models/QueryModel.js"
import mongoose from "mongoose"
import config from "../../../config"
import { performNmapScan } from "../../utils/performNmapScan"

const postQuery = async (req, res) => {
  const { target, scanType, portRange, maxRetries, hostTimeout } = req.body

  try {
    const { openPorts, nmapInput, nmapOutput } = await performNmapScan({
      target,
      scanType,
      portRange,
      maxRetries,
      hostTimeout,
    })

    await mongoose.connect(config.db.uri)
    await QueryModel.create({
      target,
      scanType,
      portRange,
      maxRetries,
      hostTimeout,
      input: nmapInput,
      output: nmapOutput,
    })
    await mongoose.disconnect()

    res.json({ openPorts })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(500).send("Error performing Nmap scan")
  }
}

export default postQuery
