const { updater } = require('@architect/utils')
const { join } = require('path')
const tsc = require('./cli')
const utils = require('./utils')

let watcherProcess
const update = updater('TypeScriptCompiler')

module.exports = {
    sandbox: {
        start: async () => {
          // copy initial project files
          utils.copyProject()
          // start tsc watcher
          update.start('Starting watcher...')
          watcherProcess = await tsc.startWatcher()
          update.done('Started watcher')
        },
        end: () => {
          update.start('Stopping watcher...')
          watcherProcess.kill()
          update.done('Stopped watcher')
        },
        watcher: async function (params) {
          let { filename, /* event, */ inventory } = params
          let tsDir = join(inventory.inv._project.cwd, 'ts')
          if (filename.startsWith(tsDir) && !filename.endsWith('.ts') && !filename.endsWith('.tsx') && !filename.endsWith('.mts')) {
            utils.copyFile(filename)
            update.done(`${filename} updated`)
          }
        }
      },
  }
