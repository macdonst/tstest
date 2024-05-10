const { spawn } = require('child_process')

/**
 * Spawns the TypeScript Compiler in watcher mode, for use during local development.
 * Returns the process handle.
 */
exports.startWatcher = function startTypeScriptCompiler (inputPath, outputPath, options = {}) {
  const { update } = options
  const watcherProcess = spawn(
    'npx',
    [
      'tsc',
      '-w'
    ],
    { shell: true } // fixes issue with Windows
  )
  watcherProcess.stdout.on('data', (data) => { update?.status(String(data).trim()) })
  watcherProcess.on('exit', (code) => {
    if (code === null) return
    update?.err(`TypeScript Compiler closed unexpectedly with code ${code}`)
    process.exit(code)
  })
  return watcherProcess
}
