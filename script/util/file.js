/*
 * @Author: liu_tao
 * @Date: 2018-08-09 14:28:48
 * @LastEditors: liu_tao
 * @LastEditTime: 2018-08-09 14:28:48
 * @Description: file util
 */

const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')

function copyFile(srcPath, targetPath) {
  var readstream = fs.createReadStream(srcPath)
  var writestream = fs.createWriteStream(targetPath)
  readstream.pipe(writestream)
}

function copyFolder(templatePath, projectPath) {
  fs.readdir(templatePath, function(err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function(filename) {
        var srcDir = path.join(templatePath, filename)
        var targetDir = path.join(projectPath, filename)
        fs.stat(srcDir, function(error, stats) {
          if (!error) {
            var isFile = stats.isFile()
            var isDir = stats.isDirectory()
            if (isFile) {
              copyFile(srcDir, targetDir)
            }
            if (isDir) {
              createProjectFolder(targetDir)
              copyFolder(srcDir, targetDir)
            }
          }
        })
      })
    }
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
