import mongoose from "mongoose"
import QuerySchema from "../schemas/QuerySchema"

const QueryModel = mongoose.models.Query || mongoose.model("Query", QuerySchema)

export default QueryModel
