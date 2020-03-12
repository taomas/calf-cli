#!/usr/bin/env node

const program = require('commander')
const utils = require('lazy-cache')(require)
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version')

// 新建项目
// 项目命名，生成模板文件
program
  .command('init', 'init project')
  .description('create project')
  .action(argv => {
    let exe = utils('../script/task/init')
    argv = typeof argv === 'string' ? argv : null
    exe()(argv)
  })

// 部署到远端服务器
program
  .command('deploy', 'deploy to remote server')
  .description('deploy to remote server')
  .action(() => {
    let exe = utils('../script/task/deploy')
    exe()()
  })

program.on('-h, --help', function() {})

program.parse(process.argv)
