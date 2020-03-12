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

/**
 * 将原路径文件复制到目标路径
 * @param {原路径} srcPath 
 * @param {目标路径} targetPath 
 */
function copyFile(srcPath, targetPath) {
  var readstream = fs.createReadStream(srcPath)
  var writestream = fs.createWriteStream(targetPath)
  readstream.pipe(writestream)
}

/**
 * 判断原文件是文件还是目录，文件则直接复制到目标文件，目录则在目标路径创建目录后复制文件
 * @param {原路径} srcDir 
 * @param {目标路径} targetDir 
 */
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

/**
 * 将模板里的文件复制到项目路径对应的目录下
 * @param {模板路径}} templatePath 
 * @param {项目路径} projectPath 
 */
async function copyFolder(templatePath, projectPath) {
  let files = await util.promisify(fs.readdir)(templatePath)
  files.forEach(filename => {
    let srcDir = path.join(templatePath, filename)
    let targetDir = path.join(projectPath, filename)
    stats(srcDir, targetDir)
  })
}

/**
 * 创建对应目录
 * @param {绝对路径} projectPath 
 */
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
