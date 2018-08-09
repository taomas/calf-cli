/*
 * @Author: liu_tao
 * @Date: 2018-08-09 14:28:35
 * @LastEditors: liu_tao
 * @LastEditTime: 2018-08-09 14:28:35
 * @Description: init task
 */

const inquirer = require('inquirer')
const file = require('../util/file')
const logger = require('../util/logger')
const path = require('path')

const rootPath = path.join(__dirname, '../../')

module.exports = name => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'project',
        message: 'Name the project:',
        default: name
      },
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: [
          {
            name: 'vue (basic template)',
            value: 'vue-template'
          },
          {
            name: 'vue (include calf-ui)',
            value: 'vue-template-calf-ui'
          }
        ]
      }
    ])
    .then(answers => {
      const projectPath = path.join(process.cwd(), answers.project)
      const templatePath = path.join(rootPath, 'template/' + answers.template)
      file.createProjectFolder(projectPath)
      file.copyFolder(templatePath, projectPath)
      logger.logCreateSuccess(answers)
    })
}
