export const formatOutput = (output) => {
  const lines = output.split("\n")
  const formattedOutput = []

  lines.forEach((line) => {
    if (
      line.includes("Nmap scan report") ||
      line.includes("Host is up") ||
      line.includes("Other addresses") ||
      (line.includes("/") && line.includes("open"))
    ) {
      formattedOutput.push(line)
    } else if (line.includes("PORT")) {
      formattedOutput.push(line.toUpperCase())
    }
  })

  return formattedOutput.join("\n")
}

export default formatOutput
