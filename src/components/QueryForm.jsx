import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const QueryForm = () => {
  const [target, setTarget] = useState("")
  const [scanType, setScanType] = useState("")
  const [portRange, setPortRange] = useState("")
  const [maxRetries, setMaxRetries] = useState("")
  const [hostTimeout, setHostTimeout] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const targetRegex = /^[a-zA-Z0-9.-]+$/
    const positiveIntRegex = /^\d*$/
    const portRangeRegex = /^\d+(,\s*\d+)*(-\d+(,\s*\d+)*)?$/

    if (!targetRegex.test(target)) {
      setErrorMessage("Invalid target")

      return
    }

    if (maxRetries && !positiveIntRegex.test(maxRetries)) {
      setErrorMessage("Invalid max retries")

      return
    }

    if (hostTimeout && !positiveIntRegex.test(hostTimeout)) {
      setErrorMessage("Invalid host timeout")

      return
    }

    let convertedPortRange = []

    if (scanType !== "-sO" && portRange && portRangeRegex.test(portRange)) {
      if (portRange.includes("-")) {
        convertedPortRange = [portRange.trim()]
      } else {
        convertedPortRange = portRange.split(",").map((port) => port.trim())
      }
    } else if (scanType !== "-sO" && portRange) {
      setErrorMessage("Invalid port range")

      return
    }

    const finalScanType = scanType || "-sS"

    try {
      setLoading(true)

      const response = await axios.post("/api/postQuery", {
        target,
        scanType: finalScanType,
        portRange: convertedPortRange,
        maxRetries: parseInt(maxRetries),
        hostTimeout: parseInt(hostTimeout),
      })

      setSuccessMessage("Query submitted successfully!")
      // eslint-disable-next-line no-console
      console.log("Query submitted successfully!", response.data)

      setTimeout(() => {
        router.push("/lastScan")
      }, 2000)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      setErrorMessage("Error submitting query")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-screen"
    >
      <div className="p-8 bg-gradient-to-l from-stone-100 to-purple-100 rounded-sm mx-auto w-4/12 space-y-4 shadow-xl hover:shadow-lg">
        <div>
          <label
            htmlFor="target"
            className="block text-gray-800 font-bold mb-2 mt-3"
          >
            Target:
          </label>
          <input
            type="text"
            id="target"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            required
            placeholder="Enter target (e.g., example.com or 192.168.10.1)"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-green-300"
          />
        </div>
        <div>
          <label
            htmlFor="scanType"
            className="block text-gray-800 font-bold mb-2"
          >
            Scan Type:
          </label>
          <select
            id="scanType"
            value={scanType}
            onChange={(event) => setScanType(event.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-green-300"
          >
            <option value="">Select Scan Type</option>
            <option value="-sS">TCP SYN (Default)</option>
            <option value="-sO">IP Protocol</option>
            <option value="-sU">UDP</option>
            <option value="-sV">Version Detection</option>
          </select>
        </div>
        {scanType === "-sO" ? (
          <p className="text-red-500">
            Port range is not applicable for IP Protocol Scan (-sO).
          </p>
        ) : (
          <div>
            <label
              htmlFor="portRange"
              className="block text-gray-800 font-bold mb-2"
            >
              Port Range:
            </label>
            <input
              type="text"
              id="portRange"
              value={portRange}
              onChange={(event) => setPortRange(event.target.value)}
              placeholder="Enter port range (e.g., 80-100 or 22,80,443)"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-green-300"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="maxRetries"
            className="block text-gray-800 font-bold mb-2"
          >
            Max Retries:
          </label>
          <input
            type="number"
            id="maxRetries"
            value={maxRetries}
            onChange={(event) => setMaxRetries(event.target.value)}
            placeholder="Enter max retries"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-green-300"
          />
        </div>
        <div>
          <label
            htmlFor="hostTimeout"
            className="block text-gray-800 font-bold mb-2"
          >
            Host Timeout:
          </label>
          <input
            type="number"
            id="hostTimeout"
            value={hostTimeout}
            onChange={(event) => setHostTimeout(event.target.value)}
            placeholder="Enter host timeout"
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-green-300"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-32 text-white font-bold py-2 px-4 mt-3 rounded-sm focus:outline-none ${
              loading
                ? "bg-[#00ff00]"
                : "bg-purple-500 hover:bg-purple-700 focus:bg-purple-800"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Scan"}
          </button>
        </div>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </form>
  )
}

export default QueryForm
