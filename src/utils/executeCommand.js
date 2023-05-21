import { exec } from "child_process"

export const executeCommand = (command) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve([false, stdout, stderr])
      } else {
        resolve([true, stdout, stderr])
      }
    })
  })
}
