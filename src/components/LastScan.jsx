import axios from "axios"
import { useEffect, useState } from "react"
import { formatOutput } from "../utils/formatOutput"
import { formatTimestamp } from "../utils/formatTimestamp"

const LastScan = () => {
  const [lastScan, setLastScan] = useState(null)

  useEffect(() => {
    fetchLastScan()
  }, [])

  const fetchLastScan = async () => {
    try {
      const response = await axios.get("/api/getLastScan")
      setLastScan(response.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching last query:", error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-gradient-to-l from-stone-100 to-purple-100 rounded-sm mx-auto w-6/12 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 mt-4">
          Last Scan
        </h2>
        {lastScan ? (
          <div>
            <div className="mb-2">
              <span className="font-semibold">Target:</span> {lastScan.target}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Scan Type:</span>{" "}
              {lastScan.scanType}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Port Range:</span>{" "}
              {lastScan.portRange.join(", ")}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Max Retries:</span>{" "}
              {lastScan.maxRetries}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Host Timeout:</span>{" "}
              {lastScan.hostTimeout}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Query:</span> {lastScan.input}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Output:</span>{" "}
              {formatOutput(lastScan.output)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {formatTimestamp(lastScan.createdAt)}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No query found.</p>
        )}
      </div>
    </div>
  )
}

export default LastScan
