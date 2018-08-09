#!/usr/bin/env node

const program = require('commander')
const utils = require('lazy-cache')(require)
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version')

// 新建项目
// 项目命名，生成模板文件
program
  .command('init')
  .description('create project')
  .action(argv => {
    let exe = utils('../script/task/init')
    argv = typeof argv === 'string' ? argv : null
    exe()(argv)
  })

program.on('-h, --help', function() {
  console.log('  Examples:')
  console.log('')
  console.log('    $ custom-help --help')
  console.log('    $ custom-help -h')
  console.log('')
})

program.parse(process.argv)
