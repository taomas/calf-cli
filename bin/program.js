const program = require('commander')
const utils = require('lazy-cache')(require)
const pkg = require('../package.json')

program.version(pkg.version)

// 新建项目
// 项目命名，生成模板文件
program
  .command('init')
  .description('create project')
  .action(() => {
    let exe = utils('../scripts/task/init')
    exe()()
  })
