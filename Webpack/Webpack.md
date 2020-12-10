# Webpack

> Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

## 编写代码

**src/index.js**

```js
import bar from './bar';

bar();
```

**src/bar.js**

```js
export default function bar() {
  //
}
```

## 使用 webpack 打包

**Without config** or provide custom **webpack.config.js**

```js
const path = require('path');

module.exports = {
  // 所有模块的入口，Webpack 从入口开始递归解析出所有依赖的模块
  entry: './src/index.js',
  output: {
    // 把入口所依赖的所有模块打包成一个文件 bundle.js 输出 
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

然后在命令行运行 `webpack` 就会创建 `bundle.js`。

使用打包后的 `bundle.js`

**page.html**

```html
<!doctype html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

Webpack的优点是：

- 专注于处理模块化的项目，能做到开箱即用一步到位；
- 通过 Plugin 扩展，完整好用又不失灵活；
- 使用场景不仅限于 Web 开发；
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
- 良好的开发体验。

Webpack的缺点是只能用于采用模块化开发的项目。

# 安装使用

要安装 Webpack 到本项目，可按照你的需要选择以下任意命令运行：

```bash
# npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies
# 安装最新稳定版
npm i -D webpack

# 安装指定版本
npm i -D webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta
```

安装完后你可以通过这些途径运行安装到本项目的 Webpack：

- 在项目根目录下对应的命令行里通过 `node_modules/.bin/webpack` 运行 Webpack 可执行文件。

- 在 [Npm Script](https://webpack.wuhaolin.cn/1入门/常见的构建工具及对比/npm_script.md) 里定义的任务会优先使用本项目下的 Webpack，代码如下：

  ```json
  "scripts": {
      "start": "webpack --config webpack.config.js"
  }
  ```

安装到全局后你可以在任何地方共用一个 Webpack 可执行文件，而不用各个项目重复安装，安装方式如下：

```bash
npm i -g webpack
```

虽然介绍了以上两种安装方式，但是我们推荐安装到本项目，原因是可防止不同项目依赖不同版本的 Webpack 而导致冲突。

Webpack 在执行构建时默认会从项目根目录下的 `webpack.config.js` 文件读取配置，所以你还需要新建它，其内容如下：

```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  }
}
```

> 声明：以下内容来自 《深入浅出 Webpack》 [吴浩麟](https://github.com/gwuhaolin)拥有本书的著作权。**其它人不能将本书用于商用用途，不能转载，不能以任何形式发行，违者将追究法律责任**。
>
> 本文仅做个人学习时的笔记📒 请尊重作者合法权益

# 使用 Loader

Webpack 把一切文件看作模块，CSS 文件也不例外，要引入 `main.css` 需要像引入 JavaScript 文件那样，修改入口文件 `main.js` 如下：

```js
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack');
```

但是这样修改后去执行 Webpack 构建是会报错的，因为 Webpack 不原生支持解析 CSS 文件。要支持非 JavaScript 类型的文件，需要使用 Webpack 的 Loader 机制。Webpack的配置修改使用如下：

```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        //使用顺序由后到前，每一个Loader都可以通过 URL 查询字符串方式传入参数
        use: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```

Loader 可以看作具有文件转换功能的翻译员，配置里的 `module.rules` 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。

如上配置告诉 Webpack 在遇到以 `.css` 结尾的文件时先使用 `css-loader` 读取 CSS 文件，再交给 `style-loader` 把 CSS 内容注入到 JavaScript 里。 在配置 Loader 时需要注意的是：

- `use` 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 `css-loader?minimize` 中的 `minimize` 告诉 `css-loader` 要开启 CSS 压缩。

给 Loader 传入属性的方式除了有 querystring 外，还可以通过 Object 传入，以上的 Loader 配置可以修改为如下：

```js
use: [
  'style-loader', 
  {
    loader:'css-loader',
    options:{
      minimize:true,
    }
  }
]
```

除了在 `webpack.config.js` 配置文件中配置 Loader 外，还可以在源码中指定用什么 Loader 去处理文件。 以加载 CSS 文件为例，修改上面例子中的 `main.js` 如下：

```js
require('style-loader!css-loader?minimize!./main.css');
```

这样就能指定对 `./main.css` 这个文件先采用 css-loader 再采用 style-loader 转换。

# 使用 Plugin

Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。

在上一节中通过 Loader 加载了 CSS 文件，本节将通过 Plugin 把注入到 `bundle.js` 文件里的 CSS 提取到单独的文件中，配置修改如下：

```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 把输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};
```

要让以上代码运行起来，需要先安装新引入的插件：

```bash
npm i -D extract-text-webpack-plugin
```

安装成功后重新执行构建，你会发现 dist 目录下多出一个 `main_1a87a56a.css` 文件，`bundle.js` 里也没有 CSS 代码了，再把该 CSS 文件引入到 `index.html` 里就完成了。

 Webpack 是通过 `plugins` 属性来配置需要使用的插件列表的。 `plugins` 属性是一个**数组**，里面的每一项都是插件的**一个实例**，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

# 使用 DevServer

实际开发中你可能会需要：

1. 提供 HTTP 服务而不是使用本地文件预览；
2. 监听文件的变化并自动刷新网页，做到实时预览；
3. 支持 Source Map，以方便调试。

对于这些， Webpack 都为你考虑好了。Webpack 原生支持上述第2、3点内容，再结合官方提供的开发工具 [DevServer](https://webpack.js.org/configuration/dev-server/) 也可以很方便地做到第1点。

DevServer 会启动一个 HTTP 服务器用于服务网页请求，同时会帮助启动 Webpack ，并接收 Webpack 发出的文件更变信号，通过 WebSocket 协议自动刷新网页做到实时预览。

下面为之前的小项目 `Hello,Webpack` 继续集成 DevServer。 首先需要安装 DevServer：

```bash
npm i -D webpack-dev-server
```

安装成功后执行 `webpack-dev-server` 命令， DevServer 就启动了，这时你会看到控制台有一串日志输出：

```
Project is running at http://localhost:8080/
webpack output is served from /
```

这意味着 DevServer 启动的 HTTP 服务器监听在 `http://localhost:8080/` ，DevServer 启动后会一直驻留在后台保持运行，访问这个网址你就能获取项目根目录下的 `index.html`。 

用浏览器打开这个地址你会发现页面空白错误原因是 `./dist/bundle.js` 加载404了。 

同时你会发现并没有文件输出到 `dist` 目录，原因是 DevServer 会把 Webpack 构建出的文件保存在内存中，在要访问输出的文件时，必须通过 HTTP 服务访问。 

由于 DevServer 不会理会 `webpack.config.js` 里配置的 `output.path` 属性，所以要获取 `bundle.js` 的正确 URL 是 `http://localhost:8080/bundle.js`，对应的 `index.html` 应该修改为：

```html
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
<div id="app"></div>
<!--导入 DevServer 输出的 JavaScript 文件-->
<script src="bundle.js"></script>
</body>
</html>
```

# 核心概念

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- **Output**：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。

每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 

这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。

最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

# Entry

`entry`是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

`entry` 配置是**必填的**，若不填则将导致 Webpack 报错退出。

## context

Webpack 在寻找相对路径的文件时会以 `context` 为根目录，`context` 默认为执行启动 Webpack 时所在的当前工作目录。 如果想改变 `context` 的默认配置，则可以在配置文件里这样设置它：

```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}
```

注意， `context` 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 `webpack --context` 来设置 `context`。

之所以在这里先介绍 `context`，是因为 Entry 的路径和其依赖的模块的路径可能采用相对于 `context` 的路径来描述，`context` 会影响到这些相对路径所指向的真实文件。

## Entry 类型

Entry 类型可以是以下三种中的一种或者相互组合：

| 类型   | 例子                                                         | 含义                                 |
| ------ | ------------------------------------------------------------ | ------------------------------------ |
| string | `'./app/entry'`                                              | 入口模块的文件路径，可以是相对路径。 |
| array  | `['./app/entry1', './app/entry2']`                           | 入口模块的文件路径，可以是相对路径。 |
| object | `{ a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}` | 配置多个入口，每个入口生成一个 Chunk |

如果是 `array` 类型，则搭配 `output.library` 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。

## Chunk 名称

Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：

- 如果 `entry` 是一个 `string` 或 `array`，就只会生成一个 Chunk，这时 Chunk 的名称是 `main`；
- 如果 `entry` 是一个 `object`，就可能会出现多个 Chunk，这时 Chunk 的名称是 `object` 键值对里键的名称。

## 配置动态 Entry

假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：

```js
// 同步函数
entry: () => {
  return {
    a:'./pages/a',
    b:'./pages/b',
  }
};
// 异步函数
entry: () => {
  return new Promise((resolve)=>{
    resolve({
       a:'./pages/a',
       b:'./pages/b',
    });
  });
};
```

# Output

`output` 配置如何输出最终想要的代码。`output` 是一个 `object`，里面包含一系列配置项

## filename

`output.filename` 配置输出文件的名称，为string 类型。 如果只有一个输出文件，则可以把它写成静态不变的：

```js
filename: 'bundle.js'
```

但是在有多个 Chunk 要输出时，就需要借助模版和变量了。前面说到 Webpack 会为每个 Chunk取一个名称，可以根据 Chunk 的名称来区分输出的文件名：

```js
filename: '[name].js'
```

代码里的 `[name]` 代表用内置的 `name` 变量去替换`[name]`，这时你可以把它看作一个字符串模块函数， 每个要输出的 Chunk 都会通过这个函数去拼接出输出的文件名称。

内置变量除了 `name` 还包括：

| 变量名    | 含义                       |
| --------- | -------------------------- |
| id        | Chunk 的唯一标识，从0开始  |
| name      | Chunk 的名称               |
| hash      | Chunk 的唯一标识的 Hash 值 |
| chunkhash | Chunk 内容的 Hash 值       |

其中 `hash` 和 `chunkhash` 的长度是可指定的，`[hash:8]` 代表取8位 Hash 值，默认是20位。

> 注意 [ExtractTextWebpackPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 插件是使用 `contenthash` 来代表哈希值而不是 `chunkhash`， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。

## chunkFilename

`output.chunkFilename` 配置无入口的 Chunk 在输出时的文件名称。 chunkFilename 和上面的 filename 非常类似，但 chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。 常见的会在运行时生成 Chunk 场景有在使用 CommonChunkPlugin、使用 `import('path/to/module')` 动态加载等时。 chunkFilename 支持和 filename 一致的内置变量。

## path

`output.path` 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 `path` 模块去获取绝对路径：

```js
path: path.resolve(__dirname, 'dist_[hash]')
```

## publicPath

在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。

`output.publicPath` 配置发布到线上资源的 URL 前缀，为 String 类型。 默认值是空字符串 `''`，即使用相对路径。

这样说可能有点抽象，举个例子，需要把构建出的资源文件上传到 CDN 服务上，以利于加快页面的打开速度。配置代码如下：

```js
filename:'[name]_[chunkhash:8].js'
publicPath: 'https://cdn.example.com/assets/'
```

这时发布到线上的 HTML 在引入 JavaScript 文件时就需要：

```html
<script src='https://cdn.example.com/assets/a_12345678.js'></script>
```

使用该配置项时要小心，稍有不慎将导致资源加载404错误。

`output.path` 和 `output.publicPath` 都支持字符串模版，内置变量只有一个：`hash` 代表一次编译操作的 Hash 值。

## crossOriginLoading

Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 [JSONP](https://zh.wikipedia.org/wiki/JSONP) 方式实现的。 JSONP 的原理是动态地向 HTML 中插入一个 `<script src="url"></script>` 标签去加载异步资源。 `output.crossOriginLoading` 则是用于配置这个异步插入的标签的 `crossorigin` 值。

script 标签的 crossorigin 属性可以取以下值：

- `anonymous`(默认) 在加载此脚本资源时不会带上用户的 Cookies；
- `use-credentials` 在加载此脚本资源时会带上用户的 Cookies。

通常用设置 crossorigin 来获取异步加载的脚本执行时的详细错误信息。

## libraryTarget 和 library

当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

- `output.libraryTarget` 配置以何种方式导出库。
- `output.library` 配置导出库的名称。

它们通常搭配在一起使用。

`output.libraryTarget` 是字符串的枚举类型，支持以下配置。

### var (默认)

编写的库将通过 `var` 被赋值给通过 `library` 指定名称的变量。

假如配置了 `output.library='LibraryName'`，则输出和使用的代码如下：

```js
// Webpack 输出的代码
var LibraryName = lib_code;

// 使用库的方法
LibraryName.doSomething();
```

假如 `output.library` 为空，则将直接输出：

```js
lib_code
```

> 其中 `lib_code` 代指导出库的代码内容，是有返回值的一个自执行函数。

### CommonJS

编写的库将通过 CommonJS 规范导出。

假如配置了 `output.library='LibraryName'`，则输出和使用的代码如下：

```js
// Webpack 输出的代码
exports['LibraryName'] = lib_code;

// 使用库的方法
require('library-name-in-npm')['LibraryName'].doSomething();
```

> 其中 `library-name-in-npm` 是指模块发布到 Npm 代码仓库时的名称。

### CommonJS2

编写的库将通过 CommonJS2 规范导出，输出和使用的代码如下：

```js
// Webpack 输出的代码
module.exports = lib_code;

// 使用库的方法
require('library-name-in-npm').doSomething();
```

> CommonJS2 和 CommonJS 规范很相似，差别在于 CommonJS 只能用 `exports` 导出，而 CommonJS2 在 CommonJS 的基础上增加了 `module.exports` 的导出方式。
>
> 在 `output.libraryTarget` 为 `commonjs2` 时，配置 `output.library` 将没有意义。

### this

编写的库将通过 `this` 被赋值给通过 `library` 指定的名称，输出和使用的代码如下：

```js
// Webpack 输出的代码
this['LibraryName'] = lib_code;

// 使用库的方法
this.LibraryName.doSomething();
```

### window

编写的库将通过 `window` 被赋值给通过 `library` 指定的名称，即把库挂载到 `window` 上，输出和使用的代码如下：

```js
// Webpack 输出的代码
window['LibraryName'] = lib_code;

// 使用库的方法
window.LibraryName.doSomething();
```

### global

编写的库将通过 `global` 被赋值给通过 `library` 指定的名称，即把库挂载到 `global` 上，输出和使用的代码如下：

```js
// Webpack 输出的代码
global['LibraryName'] = lib_code;

// 使用库的方法
global.LibraryName.doSomething();
```

## libraryExport

`output.libraryExport` 配置要导出的模块中哪些子模块需要被导出。 它只有在 `output.libraryTarget` 被设置成 `commonjs` 或者 `commonjs2` 时使用才有意义。

假如要导出的模块源代码是：

```js
export const a=1;
export default b=2;
```

现在你想让构建输出的代码只导出其中的 `a`，可以把 `output.libraryExport` 设置成 `a`，那么构建输出的代码和使用方法将变成如下：

```js
// Webpack 输出的代码
module.exports = lib_code['a'];

// 使用库的方法
require('library-name-in-npm')===1;
```

> 以上只是 `output` 里常用的配置项，还有部分几乎用不上的配置项没有一一列举，你可以在 [Webpack 官方文档](https://webpack.js.org/configuration/output/) 上查阅它们。

# Module

`module` 配置如何处理模块。

## 配置 Loader

`rules` 配置模块的读取和解析规则，通常用来配置 Loader。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 `rules` 时大致通过以下方式：

1. 条件匹配：通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。
2. 应用规则：对选中后的文件通过 `use` 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
3. 重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 `enforce` 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。

下面来通过一个例子来说明具体使用方法：

```js
module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ['babel-loader?cacheDirectory'],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, 'src')
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ['file-loader'],
    },
  ]
}
```

在 Loader 需要传入很多参数时，你还可以通过一个 Object 来描述，例如在上面的 babel-loader 配置中有如下代码：

```js
use: [
  {
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce:'post'
  },
  // 省略其它 Loader
]
```

上面的例子中 `test include exclude` 这三个命中文件的配置项只传入了一个字符串或正则，其实它们还都支持数组类型，使用如下：

```js
{
  test:[
    /\.jsx?$/,
    /\.tsx?$/
  ],
  include:[
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'tests'),
  ],
  exclude:[
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'bower_modules'),
  ]
}
```

数组里的每项之间是**或**的关系，即文件路径符合数组中的任何一个条件就会被命中。

## noParse

提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

`noParse` 是可选配置项，类型需要是 `RegExp`、`[RegExp]`、`function` 其中一个。

例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：

```js
// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
```

> 注意被忽略掉的文件里不应该包含 `import` 、 `require` 、 `define` 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

## parser

因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 AMD、CommonJS、SystemJS、ES6。 `parser` 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 `noParse` 配置项的区别在于 `parser` 可以精确到语法层面， 而 `noParse` 只能控制哪些文件不被解析。 `parser` 使用如下：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES6 import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用 browserify
      requireJs: false, // 禁用 requirejs
      }
    },
  ]
}
```

# Resolve

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 

Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。

## alias

`resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：

```js
// Webpack alias 配置
resolve:{
  alias:{
    components: './src/components/'
  }
}
```

当你通过 `import Button from 'components/button'` 导入时，实际上被 `alias` 等价替换成了 `import Button from './src/components/button'`。

以上 alias 配置的含义是把导入语句里的 `components` 关键字替换成 `./src/components/`。

这样做可能会命中太多的导入语句，alias 还支持 `$` 符号来缩小范围到只命中以关键字结尾的导入语句：

```js
resolve:{
  alias:{
    'react$': '/path/to/react.min.js'
  }
}
```

`react$` 只会命中以 `react` 结尾的导入语句，即只会把 `import 'react'` 关键字替换成 `import '/path/to/react.min.js'`。

## mainFields

有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 `package.json` 文件里，如下：

```json
{
  "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
  "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
}
```

Webpack 会根据 `mainFields` 的配置去决定优先采用那份代码，`mainFields` 默认如下：

```js
mainFields: ['browser', 'main']
```

Webpack 会按照数组里的顺序去`package.json` 文件里寻找，只会使用找到的第一个。

假如你想优先采用 ES6 的那份代码，可以这样配置：

```js
mainFields: ['jsnext:main', 'browser', 'main']
```

## extensions

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 `resolve.extensions` 用于配置在尝试过程中用到的后缀列表，默认是：

```js
extensions: ['.js', '.json']
```

也就是说当遇到 `require('./data')` 这样的导入语句时，Webpack 会先去寻找 `./data.js` 文件，如果该文件不存在就去寻找 `./data.json` 文件， 如果还是找不到就报错。

假如你想让 Webpack 优先使用目录下的 TypeScript 文件，可以这样配置：

```js
extensions: ['.ts', '.js', '.json']
```

## modules

`resolve.modules` 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 `node_modules` 目录下寻找。

有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 `import '../../../components/button'` 这时你可以利用 `modules` 配置项优化，假如那些被大量导入的模块都在 `./src/components` 目录下，把 `modules` 配置成

```js
modules:['./src/components','node_modules']
```

后，你可以简单通过 `import 'button'` 导入。

## descriptionFiles

`resolve.descriptionFiles` 配置描述第三方模块的文件名称，也就是 `package.json` 文件。默认如下：

```js
descriptionFiles: ['package.json']
```

## enforceExtension

`resolve.enforceExtension` 如果配置为 `true` 所有导入语句都必须要带文件后缀， 例如开启前 `import './foo'` 能正常工作，开启后就必须写成 `import './foo.js'`。

## enforceModuleExtension

`enforceModuleExtension` 和 `enforceExtension` 作用类似，但 `enforceModuleExtension` 只对 `node_modules` 下的模块生效。 `enforceModuleExtension` 通常搭配 `enforceExtension` 使用，在 `enforceExtension:true` 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 `enforceModuleExtension:false` 来兼容第三方模块。

# Plugin

Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。

## 配置 Plugin

Plugin 的配置很简单，`plugins` 配置项接受一个数组，数组里每一项都是一个要使用的 Plugin 的实例，Plugin 需要的参数通过构造函数传入。

```js
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码块中
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),
  ]
};
```

使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如何在 Webpack 中接入 Plugin。

几乎所有 Webpack 无法直接实现的功能都能在社区找到开源的 Plugin 去解决，你需要善于使用搜索引擎去寻找解决问题的方法。

# devServer

要配置 DevServer ，除了在配置文件里通过 `devServer` 传入参数外，还可以通过命令行参数传入。 注意只有在通过 DevServer 去启动 Webpack 时配置文件里 `devServer` 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 `devServer` 配置项。

## hot

`devServer.hot` 配置是否启用模块热替换功能。 DevServer 默认的行为是在发现源代码被更新后会通过自动刷新整个页面来做到实时预览，开启模块热替换功能后将在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览。

## inline

DevServer 的实时预览功能依赖一个注入到页面里的代理客户端去接受来自 DevServer 的命令和负责刷新网页的工作。

`devServer.inline` 用于配置是否自动注入这个代理客户端到将运行在页面里的 Chunk 里去，默认是会自动注入。 DevServer 会根据你是否开启 `inline` 来调整它的自动刷新策略：

- 如果开启 `inline`，DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷新。
- 如果关闭 `inline`，DevServer 将无法直接控制要开发的网页。这时它会通过 iframe 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 iframe 来实现实时预览。 但这时你需要去 `http://localhost:8080/webpack-dev-server/` 实时预览你的网页了。

如果你想使用 DevServer 去自动刷新网页实现实时预览，最方便的方法是直接开启 `inline`。

## historyApiFallback

`devServer.historyApiFallback` 用于方便的开发使用了 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 的单页应用。 这类单页应用要求服务器在针对任何命中的路由时都返回一个对应的 HTML 文件，例如在访问 `http://localhost/user` 和 `http://localhost/home` 时都返回 `index.html` 文件， 浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。

配置 `historyApiFallback` 最简单的做法是：

```js
historyApiFallback: true
```

这会导致任何请求都会返回 `index.html` 文件，这只能用于只有一个 HTML 文件的应用。

如果你的应用由多个单页应用组成，这就需要 DevServer 根据不同的请求来返回不同的 HTML 文件，配置如下：

```js
historyApiFallback: {
  // 使用正则匹配命中路由
  rewrites: [
    // /user 开头的都返回 user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // 其它的都返回 index.html
    { from: /./, to: '/index.html' },
  ]
}
```

## contentBase

`devServer.contentBase` 配置 DevServer HTTP 服务器的文件根目录。 默认情况下为当前执行目录，通常是项目根目录，所有一般情况下你不必设置它，除非你有额外的文件需要被 DevServer 服务。 例如你想把项目根目录下的 `public` 目录设置成 DevServer 服务器的文件根目录，你可以这样配置：

```js
devServer:{
  contentBase: path.join(__dirname, 'public')
}
```

这里需要指出可能会让你疑惑的地方，DevServer 服务器通过 HTTP 服务暴露出的文件分为两类：

- 暴露本地文件。
- 暴露 Webpack 构建出的结果，由于构建出的结果交给了 DevServer，所以你在使用了 DevServer 时在本地找不到构建出的文件。

`contentBase` 只能用来配置暴露本地文件的规则，你可以通过 `contentBase:false` 来关闭暴露本地文件。

## headers

`devServer.headers` 配置项可以在 HTTP 响应中注入一些 HTTP 响应头，使用如下：

```js
devServer:{
  headers: {
    'X-foo':'bar'
  }
}
```

## host

`devServer.host` 配置项用于配置 DevServer 服务监听的地址。 例如你想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 `--host 0.0.0.0`。 `host` 的默认值是 `127.0.0.1` 即只有本地可以访问 DevServer 的 HTTP 服务。

## port

`devServer.port` 配置项用于配置 DevServer 服务监听的端口，默认使用 8080 端口。 如果 8080 端口已经被其它程序占有就使用 8081，如果 8081 还是被占用就使用 8082，以此类推。

## allowedHosts

`devServer.allowedHosts` 配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回，使用如下：

```js
allowedHosts: [
  // 匹配单个域名
  'host.com',
  'sub.host.com',
  // host2.com 和所有的子域名 *.host2.com 都将匹配
  '.host2.com'
]
```

## disableHostCheck

`devServer.disableHostCheck` 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 `--host 0.0.0.0` 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。

## https

DevServer 默认使用 HTTP 协议服务，它也能通过 HTTPS 协议服务。 有些情况下你必须使用 HTTPS，例如 HTTP2 和 Service Worker 就必须运行在 HTTPS 之上。 要切换成 HTTPS 服务，最简单的方式是：

```js
devServer:{
  https: true
}
```

DevServer 会自动的为你生成一份 HTTPS 证书。

如果你想用自己的证书可以这样配置：

```js
devServer:{
  https: {
    key: fs.readFileSync('path/to/server.key'),
    cert: fs.readFileSync('path/to/server.crt'),
    ca: fs.readFileSync('path/to/ca.pem')
  }
}
```

## clientLogLevel

`devServer.clientLogLevel` 配置在客户端的日志等级，这会影响到你在浏览器开发者工具控制台里看到的日志内容。 `clientLogLevel` 是枚举类型，可取如下之一的值 `none | error | warning | info`。 默认为 `info` 级别，即输出所有类型的日志，设置成 `none` 可以不输出任何日志。

## compress

`devServer.compress` 配置是否启用 gzip 压缩。`boolean` 为类型，默认为 `false`。

## open

`devServer.open` 用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 `devServer.openPage` 配置项用于打开指定 URL 的网页。

# 其它配置项

## Target

JavaScript 的应用场景越来越多，从浏览器到 Node.js，这些运行在不同环境的 JavaScript 代码存在一些差异。 `target` 配置项可以让 Webpack 构建出针对不同运行环境的代码。 `target` 可以是以下之一：

| target值            | 描述                                              |
| ------------------- | ------------------------------------------------- |
| `web`               | 针对浏览器 **(默认)**，所有代码都集中在一个文件里 |
| `node`              | 针对 Node.js，使用 `require` 语句加载 Chunk 代码  |
| `async-node`        | 针对 Node.js，异步加载 Chunk 代码                 |
| `webworker`         | 针对 WebWorker                                    |
| `electron-main`     | 针对 Electron 主线程                              |
| `electron-renderer` | 针对 Electron 渲染线程                            |

例如当你设置 `target:'node'` 时，源代码中导入 Node.js 原生模块的语句 `require('fs')` 将会被保留，`fs` 模块的内容不会打包进 Chunk 里。                                                                       

## Devtool

`devtool` 配置 Webpack 如何生成 Source Map，默认值是 `false` 即不生成 Source Map，想为构建出的代码生成 Source Map 以方便调试，可以这样配置：

```js
module.export = {
  devtool: 'source-map'
}
```

## Watch 和 WatchOptions

前面介绍过 Webpack 的监听模式，它支持监听文件更新，在文件发生变化时重新编译。在使用 Webpack 时监听模式默认是关闭的，想打开需要如下配置：

```js
module.export = {
  watch: true
}
```

在使用 DevServer 时，监听模式默认是开启的。

除此之外，Webpack 还提供了 `watchOptions` 配置项去更灵活的控制监听模式，使用如下：

```js
module.export = {
  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时，才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms  
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每隔1000毫秒询问一次
    poll: 1000
  }
}
```

## Externals

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

有些 JavaScript 运行环境可能内置了一些全局变量或者模块，例如在你的 HTML HEAD 标签里通过以下代码：

```html
<script src="path/to/jquery.js"></script>
```

引入 jQuery 后，全局变量 `jQuery` 就会被注入到网页的 JavaScript 运行环境里。

如果想在使用模块化的源代码里导入和使用 jQuery，可能需要这样：

```js
import $ from 'jquery';
$('.my-element');
```

构建后你会发现输出的 Chunk 里包含的 jQuery 库的内容，这导致 jQuery 库出现了2次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。

Externals 配置项就是为了解决这个问题。

通过 `externals` 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。 要解决以上问题，可以这样配置 `externals`：

```js
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
}
```

## ResolveLoader

ResolveLoader 用来告诉 Webpack 如何去寻找 Loader，因为在使用 Loader 时是通过其包名称去引用的， Webpack 需要根据配置的 Loader 包名去找到 Loader 的实际代码，以调用 Loader 去处理源文件。

ResolveLoader 的默认配置如下：

```js
module.exports = {
  resolveLoader:{
    // 去哪个目录下寻找 Loader
    modules: ['node_modules'],
    // 入口文件的后缀
    extensions: ['.js', '.json'],
    // 指明入口文件位置的字段
    mainFields: ['loader', 'main']
  }
}
```

该配置项常用于加载本地的 Loader。

# 整体配置结构

下面通过一份代码来描述清楚：

```js
const path = require('path');

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array   
  entry: './app/entry', // 只有1个入口，入口只有1个文件
  entry: ['./app/entry1', './app/entry2'], // 只有1个入口，入口有2个文件
  entry: { // 有2个入口
    a: './app/entry-a',
    b: ['./app/entry-b1', './app/entry-b2']
  },

  // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
  output: {
    // 输出文件存放的目录，必须是 string 类型的绝对路径。
    path: path.resolve(__dirname, 'dist'),

    // 输出文件的名称
    filename: 'bundle.js', // 完整的名称
    filename: '[name].js', // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
    filename: '[chunkhash].js', // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的 URL 前缀，string 类型
    publicPath: '/assets/', // 放到指定目录下
    publicPath: '', // 放到根目录下
    publicPath: 'https://cdn.example.com/', // 放到 CDN 上去

    // 导出库的名称，string 类型
    // 不填它时，默认输出格式是匿名的立即执行函数
    library: 'MyLibrary',

    // 导出库的类型，枚举类型，默认是 var
    // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，
    libraryTarget: 'umd', 

    // 是否包含有用的文件路径信息到生成的代码里去，boolean 类型
    pathinfo: true, 

    // 附加 Chunk 的文件名称
    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js',

    // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunction: 'myWebpackJsonp',

    // 生成的 Source Map 文件名称
    sourceMapFilename: '[file].map',

    // 浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

    // 异步加载跨域的资源时使用的方式
    crossOriginLoading: 'use-credentials',
    crossOriginLoading: 'anonymous',
    crossOriginLoading: false,
  },

  // 配置模块相关
  module: {
    rules: [ // 配置 Loader
      {  
        test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
        include: [ // 只会命中这里面的文件
          path.resolve(__dirname, 'app')
        ],
        exclude: [ // 忽略这里面的文件
          path.resolve(__dirname, 'app/demo-files')
        ],
        use: [ // 使用那些 Loader，有先后次序，从后往前执行
          'style-loader', // 直接使用 Loader 的名称
          {
            loader: 'css-loader',      
            options: { // 给 html-loader 传一些参数
            }
          }
        ]
      },
    ],
    noParse: [ // 不用解析和处理的模块
      /special-library\.js$/  // 用正则匹配
    ],
  },

  // 配置插件
  plugins: [
  ],

  // 配置寻找模块的规则
  resolve: { 
    modules: [ // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
    alias: { // 模块别名配置，用于映射模块
       // 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'
      'module': 'new-module',
      // 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，
      // 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'
      'only-module$': 'new-module', 
    },
    alias: [ // alias 还支持使用数组来更详细的配置
      {
        name: 'module', // 老的模块
        alias: 'new-module', // 新的模块
        // 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射
        onlyModule: true, 
      }
    ],
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ['package.json'], // 模块的描述文件
    mainFields: ['main'], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
  },

  // 输出文件性能检查配置
  performance: { 
    hints: 'warning', // 有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function(assetFilename) { // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: 'source-map', // 配置 source-map 类型

  context: __dirname, // Webpack 使用的根目录，string 类型必须是绝对路径

  // 配置输出代码的运行环境
  target: 'web', // 浏览器，默认
  target: 'webworker', // WebWorker
  target: 'node', // Node.js，使用 `require` 语句加载 Chunk 代码
  target: 'async-node', // Node.js，异步加载 Chunk 代码
  target: 'node-webkit', // nw.js
  target: 'electron-main', // electron, 主线程
  target: 'electron-renderer', // electron, 渲染线程

  externals: { // 使用来自 JavaScript 运行环境提供的全局变量
    jquery: 'jQuery'
  },

  stats: { // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  devServer: { // DevServer 相关的配置
    proxy: { // 代理到后端服务接口
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // 配置 DevServer HTTP 服务器的文件根目录
    compress: true, // 是否开启 gzip 压缩
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    https: false, // 是否开启 HTTPS 模式
    },

    profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

    cache: false, // 是否启用缓存提升构建速度

    watch: true, // 是否开始
    watchOptions: { // 监听模式选项
    // 不监听的文件或文件夹，支持正则匹配。默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms 
    aggregateTimeout: 300,
    // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
    poll: 1000
  },
}
```

## 总结

需要大概明白 Webpack 原理和核心概念去判断选项大致属于哪个大模块下，再去查详细的使用文档。

通常你可用如下经验去判断如何配置 Webpack：

- 想让源文件加入到构建流程中去被 Webpack 控制，配置 `entry`。
- 想自定义输出文件的位置和名称，配置 `output`。
- 想自定义寻找依赖模块时的策略，配置 `resolve`。
- 想自定义解析和转换文件的策略，配置 `module`，通常是配置 `module.rules` 里的 Loader。
- 其它的大部分需求可能要通过 Plugin 去实现，配置 `plugin`。

# Webpack5 的基本使用

## Webpack 打包的基本步骤

1. 建目录 dist,  src/main.js

2. 初始化:

   ```bash
   yarn  init   -y
   npm init
   ```

3. 安装包 (将webpack记录成了开发依赖, 只在开发中使用): 

   ```bash
   yarn add webpack webpack-cli -D
   npm i webpack webpack-cli
   ```

4. 在package.json中, 配置scripts

   ```json
   "scripts": {
   	"build": "webpack ./src/main.js"
   },
   ```

   打包 ./src/main.js 到 dist 目录中去

5. npm run build 打包  =>  yarn build

## npm中 --save 和 --save-dev 的区别

1. --save  简写-S: 将安装包作为项目的依赖  (**目前为默认值**)  

   早期的 npm 安装包的时候, 必须加上 --save 才会添加到 package.json 项目依赖中去

2. --save-dev  简写 -D: 将安装包作为开发阶段的依赖

**tips:**

- dependences:  项目依赖, 项目上线也要用的
- devDependencies: 开发依赖, 只在开发中使用, 上线时不要用的

**注意点: yarn add jquery -D;   yarn只认识 -D**

## npm 中 scripts 的使用

在package.json文件中, 可以配置 scripts ...  配置自己的命令

```json
"scripts": {
	"pp": "yarn add jquery"
}
```

**运行方式:  npm  run  xx**

特殊的命令:  start / stop  可以省略 run

```bash
npm run start  => npm start
npm run stop  => npm stop
```

使用 yarn 直接不需要加 run  

```bash
npm run pp  =>  yarn pp
npm run build => yarn build
```

## webpack 配置到配置文件中

生产环境: 上线的环境, 代码需要压缩合并处理的  production

开发环境:  还在开发中, 代码一般不压缩的 (可以查看源码) development

1. 建目录  dist    src/main.js

2. 初始化

   ```bash
   yarn init -y
   ```

3. 安装依赖包

   ```
   yarn add webpack  webpack-cli  -D
   ```

4. 配置scripts 

   ```js
   scripts: {
   	"build": "webpack --config webpack.config.js"
   }
   ```

   `--config  webpack.config.js` 这个配置文件名为默认值, 不加也会默认找这个文件

5. 提供 webpack.config.js 

```js
const path = require('path')

module.exports = {
  // entry: 配置入口文件 (从哪个文件开始打包)
  entry: './src/main.js',

  // output: 配置输出 (打包到哪去)
  output: {
    // 打包输出的目录 (必须是绝对路径)
    path: path.join(__dirname, 'dist'),
    // 打包生成的文件名
    filename: 'bundle.js'
  },

  // 打包模式 production 压缩/development 不压缩
  mode: 'development'
}
```

小测试:

​	假定在main.js中导入一个  aa.js,  多个文件需要打包, webpack 会打包成一个文件, 可以节约请求的次数

```js
import './js/aa.js'
console.log('这是main模块')
```

## 基于 webpack 实现隔行变色

- 新建  public/index.html 编写代码
- 在 index.html 中新建一些 li 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<div id="app">
  <!-- ul>li{我是第$个li}*10 -->
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <li>我是第6个li</li>
    <li>我是第7个li</li>
    <li>我是第8个li</li>
    <li>我是第9个li</li>
  </ul>
</div>

<script src="../dist/bundle.js"></script>
</body>
</html>
```

需求:

1. **使用 jquery 隔行变色**

   安装jquery

   ```bash
   yarn add jquery
   npm i jquery
   ```

   `main.js`

   ```js
   // 需求: 通过jquery实现隔行变色
   import $ from 'jquery'
   $(function() {
     $('#app li:nth-child(odd)').css('color', 'red')
     $('#app li:nth-child(even)').css('color', 'green')
   })
   ```

   

2. **让最后一行的文字变成当前日期**

   安装 moment

   ```bash
   yarn add moment
   npm i moment
```
   
`main.js`
   
   ```js
   // 需求: 通过jquery实现隔行变色
   import $ from 'jquery'
   import moment from 'moment'
   
   $(function() {
     $('#app li:nth-child(odd)').css('color', 'red')
     $('#app li:nth-child(even)').css('color', 'green')
   
     $('#app li:last-child').text(moment().format('YYYY年MM月DD日'))
   })
   ```




## 自动生成html  

> html-webpack-plugin 插件

目前我们都是在 index.html 中手动引入打包后的资源，这种引入方式是有缺点的,  

将来上线需要把 index.html 和 dist 目录合到一起, 且目录引入也有问题, 需要改导入的路径

所以一般会用一个插件, 会自动将 public 中的 index 拷贝到 dist下, 并自动引入打包后的文件

  1. 下载

     ```bash
     yarn add html-webpack-plugin  -D
     npm i html-webpack-plugin  -D
     ```

  2. **在`webpack.config.js`文件中，引入这个模块** :

     ```js
     // 引入自动生成 html 的插件
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     ```

  3. 配置

     ```js
     plugins: [
       new HtmlWebpackPlugin({ template: './public/index.html' })
     ]
     ```

> **配置好了之后, public 目录的 index.html 就不需要引入打包后的文件了, 会自动被插件生成 html 引入**

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<div id="app">
  <!-- ul>li{我是第$个li}*10 -->
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <li>我是第6个li</li>
    <li>我是第7个li</li>
    <li>我是第8个li</li>
    <li>我是第9个li</li>
  </ul>
</div>

<!-- 打包后的文件会被自动引入, 不需要手动引入了 -->
</body>
</html>
```

## Webpack  loaders 的配置

webpack 默认只认识 js 文件和 json文件, 但是 webpack 可以使用 [loader](https://www.webpackjs.com/concepts/loaders) 来加载预处理文件, 允许 webpack 也可以打包  js 之外的静态资源。

所以 webpack 如果要处理其他文件类型, **记得要先配置对应的 loader**

### Webpack中处理 CSS 文件

**需求: 去掉小圆点, 新建 css 目录**

1. 安装依赖

   ```bash
   yarn add style-loader css-loader -D
   npm i style-loader css-loader -D
   ```

2. 配置

   ```js
   module: {
     // loader的规则
     rules: [
       {
         // 正则表达式，用于匹配所有的css文件
         test: /\.css$/,
         // 先用 css-loader 让webpack能够识别 css 文件的内容
         // 再用 style-loader 将样式, 以动态创建style标签的方式添加到页面中去
         use: [ "style-loader", "css-loader"]
       }
     ]
   },
   ```


## 分离 css 文件 mini-css-extract-plugin

我们上面的操作，使得`css`和`js`文件混杂在一起了，将css放到了style标签中, 和html一起加载了一个文件请求次数是少了

但是如果css文件太大的话，也不是太好，那有没有什么办法把`css`分离出来呢？ 

插件: `mini-css-extract-plugin`

1. 安装依赖包

   ```bash
   yarn add mini-css-extract-plugin -D
   npm i mini-css-extract-plugin -D
   ```

2. **在`webpack.config.js`文件中，引入这个模块** 

   ```js
   // 引入分离 css 文件的 模块
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   ```

3. 配置loaders

   ```js
   // 模块加载
   module: {
     // loader的规则
     rules: [
       // 配置 css 文件的解析
       {
         test: /\.css$/,
         use: [ // 根据官方文档写的，注意'css-loader'的书写位置
           {
             loader: MiniCssExtractPlugin.loader,
             options: {
               publicPath:'../',
             },
           },
           'css-loader'
         ]
       },
     ],
   }
   ```

4. 插件的配置

   ```js
   plugins: [
     new HtmlWebpackPlugin({ template: './public/index.html' }),
     
     // 定义打包好的文件的存放路径和文件名
     new MiniCssExtractPlugin({ 
    		filename:'css/index.css'
     })
     
   ],
   ```


## Webpack 中处理 less 文件

1. 下载依赖包

   注意: 解析less文件需要识别 less 语法, 所以除了 `less-loader`  需要额外下载 `less` 包  

   less-loader: 将less转换成 css

   ```bash
   yarn add less less-loader -D
   npm i less less-loader -D
   ```

2. 配置

   ```js
   // 配置 less 文件的解析
   {
     test: /\.less$/,
     use: [
       // 分离出 css 内容
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
             publicPath:'../',
         },
       }, 
       'css-loader',
       'less-loader' 
     ]
   }
   ```

## Webpack 中处理图片 url-loader

我们试了一下，在`css`中用到一下背景图片，结果就报错了，难道`webpack`连图片也认不出来吗？

没有错，的确认不出来, 此时需要转换图片的 loader, 来处理图片的问题,  主要用到 `url-loader`  和   `file-loader`

注意: `url-loader` 中的部分功能要用到 `file-loader`,  要下载两个模块

1. 下载依赖包

   ```bash
   yarn add url-loader file-loader -D
   npm i url-loader file-loader -D
   ```

2. 配置loader

   ```js
   {
     test: /\.(png|jpg|gif)$/i,
     use: [
       { loader: 'url-loader' }
     ]
   }
   ```

   图片默认转成 base64 字符串了,  

   - 好处就是浏览器不用发请求了，直接可以读取
   - 坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右, 得不偿失

   所以需要通过 options 配置选项进行配置 limit, 可以设置一个临界值, 大于这个值会整个文件直接打包到目录中, 得到是路径,

   如果小于这个值, 就会转成 base64, 节约请求的次数

   ```js
   {
     test: /\.(png|jpg|gif)$/i,
     use: [
       {
         loader: 'url-loader',
         options: {
           // 超过 8k 就不转 base64, 小于 8k 才转
           limit: 8 * 1024
         }
       }
     ]
   }
   ```


### 配置图片的打包输出目录

默认是直接输出到了 dist 根目录, 可以通过 options 进行配置

```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        // 超过 8k 就不转 base64, 小于 8k 才转字符串
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../images/",
        // 配置输出的文件目录
        outputPath: "images/"
      }
    }
  ]
}
```

## Webpack 配置字体图标 - url-loader

字体图标 和 图片的配置一致

``` js
// 处理字体图标的解析
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../fonts/",
        // 配置输出的文件目录
        outputPath: "fonts/"
      }
    }
  ]
}
```



## 插件:清除dist目录(了解)

使用 [clean-webpack-plugin插件](https://www.webpackjs.com/guides/output-management/#%E6%B8%85%E7%90%86-dist-%E6%96%87%E4%BB%B6%E5%A4%B9) 在每次打包前清除下dist文件夹。

安装依赖包

```bash
yarn add clean-webpack-plugin -D
```

`webpack.config.js`

```js
// 其他代码

// 导入清除插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 其他配置

    plugins: [
      // ....
      // 调用清除打包目录插件
      new CleanWebpackPlugin()
    ]
};

```

## webpack 使用 babel 处理高版本的 js 语法

babel 的介绍 => 用于处理高版本 js语法 的兼容性

  1. 安装包

     ```bash
     yarn add -D babel-loader @babel/core @babel/preset-env
     npm i -D babel-loader @babel/core @babel/preset-env
     ```

  2. 配置规则

     ```js
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     }
     ```

# Webpack 开发服务器

## webpack-dev-server自动刷新(在内存中实时打包) 

1. 下载

```bash
yarn add webpack-dev-server -D
npm i webpack-dev-server -D
```

2. 配置scripts

```js
scripts: {
	"build": "webpack --config webpack.config.js"
	"dev": "webpack-dev-server --config webpack.config.js"
}
```

## webpack-dev-server 的配置

```js
devServer: {
  port: 3000, // 端口号
  open: true // 自动打开浏览器
}
```

# Webpack处理vue

## vue-loader的配置

安装vue

```bash
yarn add vue
npm i vue
```

+ 提供`App.vue`组件

```js
<template>
  <div id="app">我是app</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

+ 编写入口文件`main.js`

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  // render函数用于渲染一个组件作为根组件（固定写法）
  render (createElement) {
    // 把App组件作为根组件
    return createElement(App)
  }
})
```



Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader，它允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件： 

+ 安装依赖包

```bash
yarn add -D vue-loader vue-template-compiler
npm i -D vue-loader vue-template-compiler
```

+ webpack配置

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

# 常用 Loaders

### 加载文件

- **[raw-loader](https://github.com/webpack-contrib/raw-loader)**：把文本文件的内容加载到代码中去。
- **[file-loader](https://github.com/webpack-contrib/file-loader)**：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件。
- **[url-loader](https://github.com/webpack-contrib/url-loader)**：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去。
- **[source-map-loader](https://github.com/webpack-contrib/source-map-loader)**：加载额外的 Source Map 文件，以方便断点调试。
- **[svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader)**：把压缩后的 SVG 内容注入到代码中。
- **[node-loader](https://github.com/webpack-contrib/node-loader)**：加载 Node.js 原生模块 `.node` 文件。
- **[image-loader](https://github.com/tcoopman/image-webpack-loader)**：加载并且压缩图片文件。
- **[json-loader](https://github.com/webpack-contrib/json-loader)**：加载 JSON 文件。
- **[yaml-loader](https://github.com/okonet/yaml-loader)**：加载 YAML 文件。

### 编译模版

- **[pug-loader](https://github.com/pugjs/pug-loader)**：把 Pug 模版转换成 JavaScript 函数返回。
- **[handlebars-loader](https://github.com/pcardune/handlebars-loader)**：把 Handlebars 模版编译成函数返回。
- **[ejs-loader](https://github.com/okonet/ejs-loader)**：把 EJS 模版编译成函数返回。
- **[haml-loader](https://github.com/AlexanderPavlenko/haml-loader)**：把 HAML 代码转换成 HTML。
- **[markdown-loader](https://github.com/peerigon/markdown-loader)**：把 Markdown 文件转换成 HTML。

### 转换脚本语言

- **[babel-loader](https://github.com/babel/babel-loader)**：把 ES6 转换成 ES5。
- **[ts-loader](https://github.com/TypeStrong/ts-loader)**：把 TypeScript 转换成 JavaScript。
- **[awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)**：把 TypeScript 转换成 JavaScript，性能要比 ts-loader 好。
- **[coffee-loader](https://github.com/webpack-contrib/coffee-loader)**：把 CoffeeScript 转换成 JavaScript。

### 转换样式文件

- **[css-loader](https://github.com/webpack-contrib/css-loader)**：加载 CSS，支持模块化、压缩、文件导入等特性。
- **[style-loader](https://github.com/webpack-contrib/style-loader)**：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- **[sass-loader](https://github.com/webpack-contrib/sass-loader)**：把 SCSS/SASS 代码转换成 CSS。
- **[postcss-loader](https://github.com/postcss/postcss-loader)**：扩展 CSS 语法，使用下一代 CSS。
- **[less-loader](https://github.com/webpack-contrib/less-loader)**：把 Less 代码转换成 CSS 代码。
- **[stylus-loader](https://github.com/shama/stylus-loader)**：把 Stylus 代码转换成 CSS 代码。

### 检查代码

- **[eslint-loader](https://github.com/MoOx/eslint-loader)**：通过 ESLint 检查 JavaScript 代码。
- **[tslint-loader](https://github.com/wbuchwalter/tslint-loader)**：通过 TSLint 检查 TypeScript 代码。
- **[mocha-loader](https://github.com/webpack-contrib/mocha-loader)**：加载 Mocha 测试用例代码。
- **[coverjs-loader](https://github.com/webpack-contrib/coverjs-loader)**：计算测试覆盖率。

### 其它

- **[vue-loader](https://github.com/vuejs/vue-loader)**：加载 Vue.js 单文件组件。
- **[i18n-loader](https://github.com/webpack-contrib/i18n-loader)**：加载多语言版本，支持国际化。
- **[ignore-loader](https://github.com/cherrry/ignore-loader)**：忽略掉部分文件。
- **[ui-component-loader](https://github.com/gwuhaolin/ui-component-loader)**：按需加载 UI 组件库，例如在使用 antd UI 组件库时，不会因为只用到了 Button 组件而打包进所有的组件。

# 常用 Plugins

### 用于修改行为

- **[define-plugin](https://webpack.js.org/plugins/define-plugin/)**：定义环境变量。
- **[context-replacement-plugin](https://webpack.js.org/plugins/context-replacement-plugin/)**：修改 `require` 语句在寻找文件时的默认行为。
- **[ignore-plugin](https://webpack.js.org/plugins/ignore-plugin/)**：用于忽略部分文件。

### 用于优化

- **[commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin/)**：提取公共代码。
- **[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)**：提取 JavaScript 中的 CSS 代码到单独的文件中。
- **[prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)**：通过 Facebook 的 Prepack 优化输出的 JavaScript 代码性能。
- **[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)**：通过 UglifyES 压缩 ES6 代码。
- **[webpack-parallel-uglify-plugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)**：多进程执行 UglifyJS 代码压缩，提升构建速度。
- **[imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin)**：压缩图片文件。
- **[webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)**：用插件制作雪碧图。
- **[ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)**：开启 Webpack Scope Hoisting 功能。
- **[dll-plugin](https://webpack.js.org/plugins/dll-plugin/)**：借鉴 DDL 的思想大幅度提升构建速度。
- **[hot-module-replacement-plugin](https://webpack.js.org/plugins/hot-module-replacement-plugin/)**：开启模块热替换功能。

### 其它

- **[serviceworker-webpack-plugin](https://github.com/oliviertassinari/serviceworker-webpack-plugin)**：给网页应用增加离线缓存功能。
- **[stylelint-webpack-plugin](https://github.com/JaKXz/stylelint-webpack-plugin)**：集成 stylelint 到项目中。
- **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**：给你的网页支持国际化。
- **[provide-plugin](https://webpack.js.org/plugins/provide-plugin/)**：从环境中提供的全局变量中加载模块，而不用导入对应的文件。
- **[web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin)**：方便的为单页应用输出 HTML，比 html-webpack-plugin 好用。