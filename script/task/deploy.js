/*
 * @Author: liutao
 * @Date: 2018-08-10 08:46:55
 * @LastEditors: liutao
 * @LastEditTime: 2018-08-10 08:46:55
 * @Description: deploy task
 */

const ora = require('ora')
const client = require('scp2')
const path = require('path')
const fs = require('fs')
const utils = require('lazy-cache')(require)
const colors = require('colors')

const projectRoot = process.cwd()
const configPath = path.resolve(projectRoot, 'calf.json')
const spinner = ora('project in deployment...')
const calfConfig = utils(`${configPath}`)()
const defaultConfig = {
  ftp: {
    host: '',
    username: '',
    password: '',
    path: ''
  },
  ftpFolder: ''
}

function upload(targetPath, ftp) {
  spinner.start()
  client.scp(
    targetPath,
    {
      host: ftp.host,
      username: ftp.username,
      password: ftp.password,
      path: ftp.path
    },
    err => {
      spinner.stop()
      if (err) {
        console.log(colors.red(`${err}`))
      } else {
        console.log(colors.green('deploy success'))
      }
    }
  )
}

function validConfig(config, targetPath) {
  const ftp = config.ftp
  const validFtp = ['host', 'username', 'password', 'path'].every(
    key => ftp[key] && ftp[key].length > 0
  )
  let validFtpFolder = config.ftpFolder && config.ftpFolder.length > 0
  const exists = fs.existsSync(targetPath)
  if (!validFtp) {
    console.log(colors.red('Error: invalid ftp config'))
  } else if (!validFtpFolder) {
    console.log(colors.red('Error: invalid dist folder'))
  } else if (!exists) {
    console.log(colors.red(`Error: ${targetPath} folder not exist`))
  } else {
    return validFtp && validFtpFolder
  }
}

function deploy() {
  const config = { ...defaultConfig, ...calfConfig }
  const targetPath = path.resolve(projectRoot, config.ftpFolder)
  const isValideConfig = validConfig(config, targetPath)
  if (isValideConfig) {
    upload(targetPath, config.ftp)
  }
}

module.exports = deploy
