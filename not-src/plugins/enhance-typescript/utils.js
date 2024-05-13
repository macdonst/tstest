const { copyFileSync, mkdirSync, statSync } = require('fs')
const { globSync } = require('glob')

const SRC_DIR = 'ts'
const DEST_DIR = 'app'

const copyProject = function() {
    const files = globSync("ts/**/*",{"ignore":['ts/**/*.mts', "ts/**/*.ts", "ts/**/*.tsx"]})
    files.forEach((srcPath) => {
        copyFile(srcPath)
    })
}

const copyFile = function(srcPath) {
    const destPath = srcPath.replace(SRC_DIR, DEST_DIR);
    const stats = statSync(srcPath)
    if (stats.isDirectory()) {
        mkdirSync(destPath, { recursive: true })
    } else {
        copyFileSync(srcPath, destPath)
    }
}

module.exports = {
    copyProject,
    copyFile
}
