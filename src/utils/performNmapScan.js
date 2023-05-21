import { executeCommand } from "./executeCommand.js"

export const performNmapScan = async (formData) => {
  const { target, scanType, maxRetries, portRange, hostTimeout } = formData

  let command = "nmap"

  command +=
    scanType === "-sS"
      ? " -sS"
      : scanType === "-sV"
      ? " -sV"
      : scanType === "-sU"
      ? " -sU"
      : scanType === "-sO"
      ? " -sO"
      : ""

  command +=
    portRange && portRange.length > 0 && scanType !== "-sO"
      ? ` -p ${portRange}`
      : ""

  command += maxRetries ? ` --max-retries ${maxRetries}` : ""

  command += hostTimeout ? ` --host-timeout ${hostTimeout}` : ""

  command += ` ${target}`

  try {
    const [success, stdout, stderr] = await executeCommand(command)

    if (success) {
      // eslint-disable-next-line no-console
      console.log("Nmap output:", stdout)
      const openPorts = parseNmapOutput(stdout)

      return { openPorts, nmapInput: command, nmapOutput: stdout }
    } else {
      throw new Error(stderr)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error performing Nmap scan:", error)
    throw error
  }
}

const parseNmapOutput = (output) => {
  const openPorts = []
  const lines = output.split("\n")

  lines.forEach((line) => {
    if (line.includes("open") && line.includes("tcp")) {
      const portMatch = line.match(/(\d+)\/(tcp|udp|sctp)/)

      if (portMatch) {
        const port = parseInt(portMatch[1])
        openPorts.push(port)
      }
    }
  })

  return openPorts
}

export default performNmapScan
