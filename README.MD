<!-- TOC -->

- [搭建基于 webpack 的 cli 工具](#搭建基于-webpack-的-cli-工具)
    - [hello saber](#hello-saber)
    - [生成项目模版](#生成项目模版)

<!-- /TOC -->

# 搭建基于 webpack 的 cli 工具

## hello saber

1. 安装所需依赖 commander：

```
yarn add commander
```

2. 在 `package.json` 中添加 `bin` 字段：

```js
// ...
"bin":{
    "saber": "./bin/saber-cli.js"
}
```

其中 `saber` 为 cli 的名称，`./bin/saber-cli.js` 为执行 `saber` 命令时调用的文件地址。

3. 实现 `saber-cli.js`

在 bin 下添加 `saber-cli.js`。添加内容：

```javascript
#!/usr/bin/env node
const program = require("commander");

/**
 * project init
 */
program
  .command("init")
  .description("project init")
  .action(() => {
    console.log("hello saber");
  });
```

其中 `#!/usr/bin/env node` 必须在文件开头定义，用于让不同的操作系统找到自己的解释器，具体可参考[#!/usr/bin/env node 到底是什么？](https://juejin.im/post/5cb93cd651882578b148c637)。

剩余部分就是 commander 的用法，具体可参考[这里](https://github.com/tj/commander.js/)

4. 执行 `npm link`

`npm link` 命令可以将一个任意位置的 npm 包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该 npm 包。以 mac 为例，执行之后，会在 `/usr/local/bin` 文件夹下新建一个名为 `saber` 的替身文件。

5. 执行 `saber init`

在任意位置的命令行下，执行 `saber init`，结果如下：

![saber-init](./static/saber-init.jpg)

好了，我们已经实现了一个简单的 cli 工具，是不是非常容易呢！


## 生成项目模版

作为 cli 工具，自动生成标准的项目模版也是最为基础的能力，接下来我们将首先完成该功能