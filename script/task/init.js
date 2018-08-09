const colors = require('colors')
const inquirer = require('inquirer')
const file = require('../util/file')
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
            name: 'vue (include calf-ui)',
            value: 'vue-template'
          }
        ]
      }
    ])
    .then(answers => {
      const projectPath = path.join(process.cwd(), answers.project)
      const templatePath = path.join(rootPath, 'template/' + answers.template)
      file.createProjectFolder(projectPath)
      file.copyFolder(templatePath, projectPath)
    })
}
