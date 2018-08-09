const colors = require('colors')

function logCreateSuccess(answers) {
  console.log(`
${colors.green('create project success!')}
you can:
        ${colors.green('cd ' + answers.project)}
        ${colors.green('cnpm install')}
        ${colors.green('npm run dev')}
      `)
}

module.exports = {
  logCreateSuccess
}
