const colors = require('colors')
const inquirer = require('inquirer')
const DecompressZip = require('decompress-zip')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')

const rootPath = path.join(__dirname, '../../')

function createProjectFolder(projectRoot) {
  if (fs.existsSync(projectRoot)) {
    let stats = fs.statSync(projectRoot)
    if (stats.isDirectory()) {
      throw new Error(`${projectRoot} is already exists`)
    }
  }
  mkdirp.sync(projectRoot, {})
}

function makeFile(tpl, projectRoot) {
  let zipFile = path.join(rootPath, 'template/' + tpl + '.zip')
  let unzipper = new DecompressZip(zipFile)
  unzipper.on('error', err => {
    throw new Error(err)
  })
  unzipper.on('extract', () => {
    console.log(colors.bgGreen(`[task ${leftPad('create', 12)}]`), 'done')
  })
  unzipper.extract({
    path: projectRoot
  })
}

function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'pkg',
        message: 'Name the project:'
      },
      {
        type: 'list',
        name: 'tpl',
        message: 'Choose a template:',
        choices: [
          {
            name: 'vue (include calf-ui)',
            value: 'vue(calf-ui)'
          }
        ]
      }
    ])
    .then(res => {
      const projectRoot = path.join(process.cwd(), res.pkg)
      console.log(projectRoot)
    })
}

export default init
