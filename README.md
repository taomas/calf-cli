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

calf -v // 获取当前版本信息

calf -h // 获取帮助信息
```

### 模板

##### vue (basic template)

一个 `vue` 的基础模板，和 `vue-cli` 生成的模板一样

##### vue (include calf-ui)

包含了 `calf-ui` 组件库的模板，可直接使用 `calf-ui` 组件库
