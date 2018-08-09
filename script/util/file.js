/*
 * @Author: liu_tao
 * @Date: 2018-08-09 16:54:37
 * @LastEditors: liu_tao
 * @LastEditTime: 2018-08-09 16:54:37
 * @Description: file tools
 */

const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const util = require('util')

function copyFile(srcPath, targetPath) {
  var readstream = fs.createReadStream(srcPath)
  var writestream = fs.createWriteStream(targetPath)
  readstream.pipe(writestream)
}

async function stats(srcDir, targetDir) {
  let stats = await util.promisify(fs.stat)(srcDir)
  let isFile = stats.isFile()
  let isDir = stats.isDirectory()
  if (isFile) {
    copyFile(srcDir, targetDir)
  } else if (isDir) {
    createProjectFolder(targetDir)
    copyFolder(srcDir, targetDir)
  }
}

async function copyFolder(templatePath, projectPath) {
  let files = await util.promisify(fs.readdir)(templatePath)
  files.forEach(filename => {
    let srcDir = path.join(templatePath, filename)
    let targetDir = path.join(projectPath, filename)
    stats(srcDir, targetDir)
  })
}

function createProjectFolder(projectPath) {
  const exists = fs.existsSync(projectPath)
  if (!exists) {
    mkdirp.sync(projectPath)
  }
}

module.exports = {
  copyFile,
  copyFolder,
  createProjectFolder
}
