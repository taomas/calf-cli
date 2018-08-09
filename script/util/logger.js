/*
 * @Author: liu_tao
 * @Date: 2018-08-09 14:29:01
 * @LastEditors: liu_tao
 * @LastEditTime: 2018-08-09 14:29:01
 * @Description: logger util
 */

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
