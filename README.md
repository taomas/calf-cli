# calf-cli

> 卡牛内部脚手架工具

### 用法

```bash
// 全局安装calf-cli
cnpm install @cardniu/calf-cli -g

// 创建项目
calf init my-project

// 进入项目目录
cd my-project

// 安装依赖
cnpm install

// 运行
cnpm run dev
```

### 指令

```bash
calf init <project> // 创建项目

calf deploy // 部署dist目录到远端服务器，配置信息详见calf.json

calf -v // 获取当前版本信息

calf -h // 获取帮助信息
```

### calf.json

```json
{
  "ftp": {
    // 主机地址
    "host": "",
    // 主机用户名
    "username": "",
    // 主机密码
    "password": "",
    // 部署路径
    "path": ""
  },
  // 部署文件夹
  "ftpFolder": "",
  // webpack别名
  "alias": {
    // 相对于项目根目录的绝对路径
    "@": "src",
    // 以~开头，直接显示不做转换，用于node_module相关的路径映射
    "calf-ui": "~@cardniu/calf-ui/lib"
  },
  // proxy代理
  "proxy": {
    // 是否开启proxy代理
    "open": false,
    // 代理api接口地址
    "root": "http://www.baidu.com",
    // 代理api接口列表
    "apis": ["/login", "/login-out"]
  }
}
```

### 模板

##### vue (basic template)

一个 `vue` 的基础模板，和 `vue-cli` 生成的模板一样

##### vue (include calf-ui)

包含了 `calf-ui` 组件库的模板，可直接使用 `calf-ui` 组件库

##### react (basic template)

一个 `react` 的基础模板，和 `create-react-app` 生成的模板一样

### changelog

- v0.0.4
  支持了`calf init <project>`命令直接创建项目，支持选择两种模板`vue (basic template)`和`vue (include calf-ui)`
- v0.0.5
  支持了`calf deploy`命令，直接部署到远端服务器，配置信息详见`calf.json`
- v0.0.6
  支持了`react (basic template)`模板
- v0.0.7
  新增`vue`模板的`calf.json`中相关配置功能，支持配置`ftp/alias/proxy`等信息
