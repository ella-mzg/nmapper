import { formatOutput } from "@/utils/formatOutput"
import { formatTimestamp } from "@/utils/formatTimestamp"
import axios from "axios"
import { useEffect, useState } from "react"

const ScanDetail = (props) => {
  const [scan, setScan] = useState({})
  const { scanId } = props

  useEffect(() => {
    const fetchScanDetail = async () => {
      try {
        const response = await axios.get(`/api/${scanId}`)
        setScan(response.data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching scan details:", error)
      }
    }

    fetchScanDetail()
  }, [scanId])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-gradient-to-l from-stone-100 to-purple-100 rounded-sm mx-auto w-6/12 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 mt-4">
          Scan Detail
        </h2>
        <div className="font-semibold text-gray-800">Target: {scan.target}</div>
        <div className="font-semibold text-gray-800">
          Scan Type: {scan.scanType}
        </div>
        <div className="font-semibold text-gray-800">
          Port Range: {scan.portRange && scan.portRange.join(", ")}
        </div>
        <div className="font-semibold text-gray-800">
          Max Retries: {scan.maxRetries}
        </div>
        <div className="font-semibold text-gray-800">
          Host Timeout: {scan.hostTimeout}
        </div>
        <div className="font-semibold text-gray-800">Command: {scan.input}</div>
        <div className="font-semibold text-gray-800">
          Output: {formatOutput(String(scan.output))}
        </div>
        <div className="font-semibold text-gray-800">
          Date: {formatTimestamp(scan.createdAt)}
        </div>
      </div>
    </div>
  )
}

export default ScanDetail
