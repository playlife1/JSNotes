#  Vue

**Vue的核心特征：**

- M-V-VM 模式，数据绑定特性

- 解耦视图和逻辑代码

- 封装可复用 组件 

- 采用 虚拟DOM

  - 好处：自动最优化 DOM 操作，降低 DOM 操作成本
  - 首创：React
- 数据驱动：不用再关注如何操作 DOM，只需要关注如何变化数据

# 体验 Vue

Hello World！

```txt
步骤：
1. 在页面的 body 中放置一个需要通过 Vue 渲染的视图元素：<div id="app"></app>
2. 在页面中引入 vue.js
3. 创建 Vue 实例：new Vue()
4. 设置 Vue 实例的参数选项：new Vue({ el: ..., data: ... })
5. 在 <div id="app"></app> 内使用 {{}} 语法插入 data 中的数据
```

代码：

```html
<!-- 要操作的视图元素 div#app -->
<div id="app">
    <!-- 使用Vue实例中的数据 -->
    {{ msg }}
</div>

<!-- 引入的 vue.js -->
<script src="./js/vue.js"></script>
<script>
  const vm =   new Vue({
        el: '#app',
        data: {
            msg: 'Hello,world'1
        }
    })
</script>
```



# Vue 介绍

## 插值表达式

> 作用：将绑定的数据实时渲染到当前位置
>
> 一旦通过任何方式修改了绑定的数据本身，都会让视图发生重新渲染，替换成改变后的新数据

双括号中支持使用：

- data中的数据属性
- 完整的表达式支持：各种JS表达式运算，如数学、逻辑、三元、连字符运算，方法调用等

不支持使用：

- 完整的JS语句，比如 `var a = 1; `, `if (...) ... else ...` 等

```js
<div id="app">
    <!-- 在插值表达式中可以访问vm实例中data里面的属性 -->
    {{ message }}
    <p>{{ message }}</p>
    <p>{{ message + '啦啦啦' }}</p>
    <p>{{ age > 18 ? '成年' : '未成年' }}</p>
    <p>{{ message.split("") }}</p>

  	<!-- 在插值表达式中不能写js语句 -->
    <p>{{ var a = 10 }}</p>
</div>

<!-- 引入vue.js -->
<script src="./js/vue.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            message: '我是data中的message属性的值',
            age: 20
        }
    });
```

## 声明式渲染

> Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

除了文本插值，我们还可以像这样来绑定元素 attribute：

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

 `v-bind` attribute 被称为**指令**。指令带有前缀 `v-`，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 `title` attribute 和 Vue 实例的 `message` property 保持一致”。

如果你再次打开浏览器的 JavaScript 控制台，输入 `app2.message = '新消息'`，就会再一次看到这个绑定了 `title` attribute 的 HTML 已经进行了更新。

## 条件与循环

控制切换一个元素是否显示也相当简单：

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

继续在控制台输入 `app3.seen = false`，你会发现之前显示的消息消失了。

这个例子演示了我们不仅可以把数据绑定到 DOM 文本或 attribute，还可以绑定到 DOM **结构**。此外，Vue 也提供一个强大的过渡效果系统，可以在 Vue 插入/更新/移除元素时自动应用过渡效果。

`v-for` 指令可以绑定数组的数据来渲染一个项目列表：

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```

在控制台里，输入 `app4.todos.push({ text: '新项目' })`，你会发现列表最后添加了一个新项目。

## 处理用户输入

可以用 `v-on` 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法：

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

注意在 `reverseMessage` 方法中，我们更新了应用的状态，但没有触碰 DOM——所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可。

Vue 还提供了 `v-model` 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

## 组件化应用构建

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。在 Vue 中注册组件很简单：

```js
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>' //渲染同样的文本
})

var app = new Vue(...)
```

现在你可以用它构建另一个组件模板：

```html
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```

但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷。我们应该能从父作用域将数据传到子组件才对。让我们来修改一下组件的定义，使之能够接受一个 [prop](https://cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)：

```js
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

现在，我们可以使用 `v-bind` 指令将待办项传到循环输出的每个组件中：

```html
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
			todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```

子单元通过 prop 接口与父单元进行了良好的解耦。我们现在可以进一步改进 `<todo-item>` 组件，提供更为复杂的模板和逻辑，而不会影响到父单元。

在一个大型应用中，有必要将整个应用程序划分为组件，以使开发更易管理。

### 与自定义元素的关系

你可能已经注意到 Vue 组件非常类似于**自定义元素**——它是 [Web 组件规范](https://www.w3.org/wiki/WebComponents/)的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 [Slot API](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) 与 `is` attribute。但是，还是有几个关键差别：

1. Web Components 规范已经完成并通过，但未被所有浏览器原生实现。目前 Safari 10.1+、Chrome 54+ 和 Firefox 63+ 原生支持 Web Components。相比之下，Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE9 及更高版本) 之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内。
2. Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成。

虽然 Vue 内部没有使用自定义元素，不过在应用使用自定义元素、或以自定义元素形式发布时，[依然有很好的互操作性](https://custom-elements-everywhere.com/#vue)。Vue CLI 也支持将 Vue 组件构建成为原生的自定义元素。

# Vue 实例

创建一个 Vue 实例：

> 每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的

```js
var vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 [MVVM 模型](https://zh.wikipedia.org/wiki/MVVM)，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个**选项对象**。

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成

# 选项 / DOM

## el:

> 作用：指定当前 Vue 实例要接管的视图元素，也叫做**挂载点**

赋值说明：

- 通常是 id 选择器
- 或是一个 DOM 元素
- 可以用其他选择器，选择器匹配到多个元素时只取第一个
- 不能是 html、body 元素

也可以使用Vue实例的方法`$mount('…')`进行挂载

```js
vm.$mount('#app')
```

- **类型**：`string | Element`

- **限制**：只在用 `new` 创建实例时生效。

- **详细**：

  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

  在实例挂载之后，元素可以用 `vm.$el` 访问。

  如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 `vm.$mount()` 手动开启编译。

## template:

###

## render:

###

## renderError:

###



# 选项 / 数据 

## data

> 作用：存放 Vue 实例的 **响应式数据**
>
> （使用了响应式数据的视图，会在响应式数据发生变化时，立即自动更新）

访问 data 中的响应式数据：

- `vm.$data.xxx` - 完整形式
- `vm.xxx` - 简化形式，因为Vue实例代理了data上所有的属性

**注意点：**响应式数据必须显式的在 data 中初始化，否则没有响应式效果

- **类型**：`Object | Function`
- **限制**：组件的定义只接受 `function`。

Vue 实例的数据对象。Vue 将会递归将 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。**对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**：浏览器 API 创建的原生对象，原型上的 property 会被忽略。

实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

当一个**组件**被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

**示例**：

```js
var data = { a: 1 }

// 直接创建一个实例
var vm = new Vue({
  data: data
})
vm.a // => 1
vm.$data === data // => true

// Vue.extend() 中 data 必须是函数
var Component = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
```

注意，如果你为 `data` property 使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```js
data: vm => ({ a: vm.myProp })
```

## methods

> 作用：存放 Vue 实例的方法函数

方法的定义：

- `xxx: function() {}` 和 `xxx() {}` 这两种形式是等价的；并且，方法中的 `this` 指向当前Vue实例
- 不推荐使用箭头函数来定义方法，因为这样的话方法中的`this`不会指向当前Vue实例（因为箭头函数绑定的是父级作用域）

方法的调用：

- 可以通过 **Vue实例** 调用： vm.fn(x)
- 可以在 **指令** 中调用：v-on:click="fn(x)"
- 可以在 **{{ }}** 中调用：{{ fn(x) }}
- 可以在 **其他方法** 中调用：this.fn(x)

```js
var vm = new Vue({
  data: { a: 1 },     
// methods作用:指定当前 Vue 实例中的方法
// 1. 可以直接通过 vm 实例访问这些方法，
// 2. 方法中的 this 自动绑定为 Vue 实例。
// 3. 不推荐使用箭头函数
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

- **类型**：`{ [key: string]: Function }`

- **详细**：

  methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。

注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

## props





## propsData

###

## computed

类型：`{ [key: string]: Function | { get: Function, set: Function } }`

详细:

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

注意如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```js
computed: {
  aDouble: vm => vm.a * 2
}
```

计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算。注意，如果某个依赖 (比如非响应式 property) 在该实例范畴之外，则计算属性是**不会**被更新的。

示例：

```js
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```



## watch:

###

# 选项 / 组合

## parent

类型：`Vue instance`

详细：

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

> 节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信

## mixins

###

## extends

###

## provide / inject

###

# 选项 / 其它

## name

###

## inheritAttrs

> 2.4.0 新增

类型：`boolean`

默认值：`true`

详细：

​	默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例 property `$attrs` 可以让这些 attribute 生效，且可以通过 `v-bind` 显性的绑定到非根元素上。

注意：这个选项**不影响** `class` 和 `style` 绑定。

# 实例 property 

## vm.$refs

作用：让我们可以直接操作 DOM

要使用其他插件，必须需要要直接操作真实 DOM，需要调用一些真实DOM的专属方法，因为虚拟DOM上没有这些方法

使用步骤：

1. 给DOM元素设置 `ref` 属性值，比如`ref="myele"`
2. 在 Vue 的 mounted 选项下，通过` this.$refs.属性`，如`this.refs.myele` 获取到要操作的 DOM 元素

```html
<div id="app">
    <!-- 1. 给要操作的DOM元素设置ref属性 -->
    <input type="text" ref="txt" />
</div>

<script src="./vue.js"></script>

<script>
    new Vue({
        el: '#app',

        // mounted 代表当页面已加载完毕，此时可以访问实际的DOM树上的元素
        mounted() {
            // 2. 用this.$refs.属性 去操作DOM
            var el = this.$refs.txt;
            console.log(el);
            el.style.border = '2px solid red';
        },
    });
</script>
```

## vm.$attrs

> 2.4.0 新增

类型：`{ [key: string]: string }`

**只读**

详细：

​	包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

## vm.$listeners

> 2.4.0 新增

类型：`{ [key: string]: Function | Array<Function> }`

**只读**

详细：

​	包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

# 实例方法 / 事件

## vm.$emit

语法：

```js
//args 会传到父组件
vm.$emit( eventName, […args] )
```

参数：

- `{string} eventName`
- `[...args]`

触发当前实例上的事件。附加参数都会传给监听器回调。

示例：子组件向父组件传值

```html
<div id="emit-example-simple">
  <welcome-button v-on:welcome="sayHi"></welcome-button>
</div>

<script>
Vue.component('welcome-button', {
  template: `
    <button v-on:click="$emit('welcome')">
      Click me to be welcomed
    </button>
  `
})
new Vue({
  el: '#emit-example-simple',
  methods: {
    sayHi: function () {
      alert('Hi!')
    }
  }
})
</script>
```



# Vue 指令

> 作用：指令是一种带有 `v-` 前缀的特殊属性。通过添加指令，可以扩展 DOM 元素的功能

给DOM元素 **设置 “原生” 属性**，可以提供了一些特别的功能：

```html
<div title="Hello world"></div>
<input type="checkbox" value="0" />
```

给DOM元素 **设置 "指令" 属性**，也可以提供额外的功能：

```html
<div v-text="Hello world"></div>
```

指令可以看作是 **包装过的 DOM 操作**。

指令分为两类：

- [内置指令](https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4) - 框架提供的指令
- 自定义指令 - 我们自己开发的指令

> 有的指令需要设置属性值，有的不需要，这完全取决于指令的具体功能。
>
> 【道理如同函数：有的函数需要参数，有的不需要参数】

## 常用内置指令

### 指令：v-text 与 v-html

> 作用：类比 innerText 和 innerHTML

**v-text 指令：**

- 可以渲染纯文本内容到标签中

- v-text 和 插值表达式的区别

  - v-text 更新的是标签内的整个内容
  - 插值表达式可以更新局部内容


**v-html 指令:**

- 可以渲染带 HTML 的内容到标签中
- 不能滥用，尽量不用（容易造成跨站脚本攻击，即XSS）

```html
<div id="app">
    <!-- v-text指令的值会替换标签内容 -->
    <p>{{ str }}</p>
    <p v-text="str"></p>
    <p v-text="str">我是p标签的初始内容</p>
    <p v-text="strHtml">我是p标签的初始内容</p>
  
    <!-- v-html指令的值(包括标签字符串)会替换掉标签的内容 -->
    <p v-html="str"></p>
    <p v-html="strHtml">我是p标签中的初始内容</p>
</div>

<script src="./js/vue.js"></script>

<script>
    new Vue({
        el: '#app',
        data: {
            str: 'abc',
            strHtml: '<span>content</span>'
        }
    });
</script>
```

### 指令：v-bind

> 作用：可以为标签的任何属性做数据绑定

常规语法：`v-bind:属性名="响应式数据或表达式"`

简化语法：`:属性名="响应式数据或表达式"`

#### 绑定 id 和 src 属性

```html
<div id="app">
    <!-- data中的数据替换为标签的属性值 -->
    <p v-bind:id="idValue">内容</p>
    <img v-bind:src="src" />
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            src: './logo.png',
            idValue: 'b'
        }
    });
</script>
```

#### 绑定 class 属性

>  分为：`对象语法` 和 `数组语法`两种用法。

##### 对象语法

示例：如果 isActive 为 true， 则返回的结果为 `<div class="active"></div>`

```css
.active {
	color: red;
}
```

```html
<div id="app">
    <div v-bind:class="{ 'active': isActive }">hei</div>
    <button @click="changeClassNameHandler">点击切换类名</button>
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            isActive: true
        },
        methods: {
            changeClassNameHandler() {
                this.isActive = !this.isActive;
            }
        }
    });
</script>
```

##### 数组语法

示例：以下渲染结果为 `<div class="actived text-danger"></div>`

```html
<div v-bind:class="[ activeClass, dangerClass ]">hei</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            activeClass: 'actived',
          	dangerClass: 'text-danger'
        }
    });
</script>
```

#### 绑定 style 属性

> 和绑定class一样，也分为：`对象语法` 和 `数组语法`两种用法。和绑定class一样，也分为：`对象语法` 和 `数组语法`两种用法。

##### 对象语法

示例：渲染的结果`<div style="color: red; font-size: 18px;"></div>`

````html
<div id="app">
    <div v-bind:style="{ 'color': redColor, 'font-size': font18 }">文本内容</div>
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            redColor: 'red',
            font18: '18px'
        }
    });
</script>
````

##### 数组语法

示例：渲染的结果`<div style="color: red; background-color: blue; border: 1px solid red; border-radius: 15px;">abc</div>`

```html
<div v-bind:style="[ colorStyles, borderStyles ]">abc</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            colorStyles: {
                color: 'red',
                backgroundColor: 'blue'
            },
            borderStyles: {
                border: '1px solid red',
                borderRadius: '15px'
            }
        }
    });
</script>
```

### 指令：v-if与 v-show

两个指令的区别：

- v-if 只有条件是 true 的时候，才创建并渲染元素；从 true 变为 false 时，会销毁元素
- v-show 总是会创建元素，然后条件为 true 时，显示元素；false 则隐藏元素

> 如果标签显示与隐藏切换频繁, 就使用 v-show 
>
> （v-show 本质是通过修改标签的样式 display 值）

```html
<div id="app">
    <!-- 如果isShow的值是true ,就显示p标签 -->
    <p v-if="isShow">我是p标签中的内容</p>
    <p v-show="isShow">我是p标签中的内容</p>
</div>

<script src="./vue.js"></script>

<script>
    new Vue({
        el: '#app',
        data: {
            isShow: false
        }
    });
</script>
```

### 指令：v-on

> 作用：为元素绑定DOM事件监听函数

常规语法：`v-on:事件名.修饰符="methods中的方法名"`

简写语法：`@事件名.修饰符="methods中的方法名"`

修饰符：

> 修饰符可以串联

- `.once` - 让事件只触发一次
- `.prevent` - 忽略元素的默认行为。功能同`event.preventDefault()`
- `.stop` - 阻止事件传播
- `.self` - 只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的
-  `.capture` - 添加事件监听器时使用事件捕获模式，即内部元素触发的事件先在此处理，然后才交由内部元素进行处理

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

- `.passive` -  滚动事件的默认行为将会立即触发，这个 `.passive` 修饰符尤其能够提升移动端的性能。

> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

事件对象 $event：

- 携带事件信息

- 在监听方法不加任何实参时，默认传递 $event 为方法的第一个参数
- 在监听方法加实参时，可自行决定是否传递 $event 以及传递时的参数位置

```html
<div id="app">
    <!-- v-on:xx事件名='当触发xx事件时执行的语句' -->
    <!-- 执行一段js语句:可以使用 data 中的属性 -->
    <button v-on:click="count += 1">增加 1</button>
    <!-- v-on的简写方法 -->
    <button @click="count += 1">增加 1</button>
  	<!-- 执行一个方法 -->
    <button @click="add">增加 1</button>
    
  	<!-- 执行一个方法、这种写法可以传形参 -->
    <button @click="fn1(count)">执行fn1方法</button>
  	<!-- 执行一个方法、这种写法可以传形参,特殊的形参$event -->
    <button @click="fn2($event)">执行fn2方法</button>
    <hr>
  	<!-- 和v-for结合使用 -->
    <button @click="fn3(index)" v-for="(item, index) in items">执行fn3方法</button>
    
  	<!-- v-on修饰符 如 once: 只执行一次 -->
    <button @click.once="fn4">只执行一次</button>

    <p>上面的按钮被点击了 {{ count }} 次。</p>
</div>
<script src="./vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            count: 0,
            items: ['a', 'b', 'c']
        },
        methods: {
            add: function () {
                this.count += 1;
            },
            fn1: function (count) {
                console.log(count);
                console.log('fn1方法被执行');
            },
            fn2: function (e) {
                console.log(e);
                console.log('fn2方法被执行');
            },
            fn3: function (index) {
                console.log(index);
                console.log('fn3方法被执行');
            },
            fn4: function () {
                console.log('fn4方法被执行了');
            }
        }
    });
</script>
```

### 指令：v-for

> 作用：根据一组数据，渲染出一个标签结构相似的列表界面

语法1：`v-for="item in items"` - 只取数组元素内容的

语法2：`v-for="(item, index) in items"` - 兼取数组元素索引

语法3：`v-for="(item, key, index) in obj"` - 如果作用于一个对象

```html
<div id="app">
    <!-- v-for作用:列表渲染,当遇到相似的标签结构时,就用v-for去渲染
         v-for="元素 in 容器(数组和对象)"
         v-for="数组中的元素 in data中的数组名"
         v-for="对象中的属性值 in data中的对象名"
     -->

    <!-- 数组 -->
    <p v-for="item in list">{{item}}</p>
    <hr />
    <p v-for="(item,index) in list">{{item}}----{{index}}</p>

    <!-- 
        (v,i) in 数组
        v:数组中的每个元素
        i:数组中元素的下标
     -->
    <hr />

    <!-- 对象 -->
    <!-- 
        (v,k,i)in 对象
        v:值 k:键 i:对象中每对 key-value 的索引 从 0 开始
        注意: v,k,i是参数名,见名知意即可!
    -->
    <p v-for="value in per">{{value}}</p>
    <hr />
    <p v-for="(value,key) in per">{{value}}----{{key}}</p>
    <hr />
    <p v-for="(value,key,i) in per">{{value}}----{{key}}--{{i}}</p>
</div>

<script src="./vue.js"></script>

<script>
    new Vue({
        el: '#app',
        data: {
            list: ['a', 'b', 'c'],
            per: {
                name: '老王',
                age: 38,
                gender: '男',
            },
        },
    });
</script>

```

**注意：使用`v-for`指令时，通常要加一个指令 `v-bind:key`（该指令的值通常是数组的下标或数组中对象的id，能代表数据唯一性的）**

> 作用：缓存上一次的渲染结果，在下一次因数据变化而重新渲染时，先去查找有无相同的已缓存过的标签，如有则只是对标签按需调整顺序，而不需要重新创建。
>
> 目的：提高渲染效率

```html
<div id="app">
   <!-- v-for 
    key属性: 值通常是一个唯一的标识
    key是一个可选属性
    养成好习惯:建议在写v-for时 设置:key="唯一值"
   -->
   <ul>
     <li v-for="(item,index) in list" :key="index">
       {{item}}---{{index}}
     </li>
   </ul>
</div>

<script src="./vue.js"></script>

<script>
  new Vue({
    el: '#app',
    data: {
      list: ['a', 'b', 'c']
    }
  });
</script>
```

### 指令：v-model

> 作用：对表单元素进行 **双向绑定**
>
> 你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

双向绑定的特点：

- 当 data 内响应式数据发生变化时，可立即更新视图
- 当视图元素发生内容变化（通常是表单控件，如输入框，下拉框，单/多选框等等），可立即更新 data 中对应的响应式数据
- 注意：一旦使用了`v-model`，将会忽略所有表单元素的`value`、`checked`、`selected`初始值，而总使用绑定的响应式数据作为数据源

#### 绑定单行文本框

示例效果：当在文本框中输入不同的值后，div 中的内容也会相应变化

```html
<div id="app">
    <!-- 当在文本框中输入不同的值后，div中的内容也会相应变化 -->
    <p>{{ message }}</p>
    <input type="text" v-model="message" />
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'message的默认值'
        }
    });
</script>
```

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

#### v-model 双向数据绑定原理

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 property 并将 `change` 作为事件。

```html
<div id="app">
    <p>{{ message }}</p>
  
    <!-- v-model 其实是一个语法糖，它是下面这种写法的简写 -->
    <input type="text" 
           v-bind:value="message" 
           v-on:input="message = $event.target.value" />
</div>

<script src="./js/vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'message的默认值'
        }
    });
</script>
```

#### 绑定多行文本框

> 与单行文本框基本一致

```html
<div id="app">
  	<div>{{ message }}</div>
    <textarea v-model="message"></textarea>
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: 'message默认值'
        }
    });
</script>
```

#### 绑定复选框

示例一：绑定一个复选框

> 绑定一个复选框 使用布尔类型的数据

```html
<div id="app">
    <input type="checkbox" v-model="checked">
    <div>{{ checked }}</div>
</div>

<script src="./vue.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            checked: true
        }
    });
</script>
```

示例二：绑定一组复选框

注意点：

- 需要为每个复选框提供 value 属性值
- v-model 绑定的 data 数据是一个数组

```html
<div id="app">
    <input type="checkbox" v-model="checked" value="1">鸡蛋
    <input type="checkbox" v-model="checked" value="2">丫蛋
    <input type="checkbox" v-model="checked" value="3">手榴弹
    <div>{{ checked }}</div>
</div>

<script src="./vue.js"></script>

<script>
    const vm = new Vue({
        el: '#app',
        data: {
            checked: []
        }
    });
</script>
```

#### 绑定单选框

注意点：需要为每个单选框提供 value 属性值

```html
<div id="app">
    <input type="radio" value="1" v-model="gender">男
    <input type="radio" value="2" v-model="gender">女
    <input type="radio" value="3" v-model="gender">懂得多
    <div>{{ gender }}</div>
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            gender: 2
        }
    });
</script>
```

#### 绑定下拉框

> `<select>` 绑定的动态数据为 `<option>` 的 `value`

```html
<div id="app">
    <select v-model="selectedCity">
        <option value="" disabled>--- 请选择 ---</option>
        <option v-for="city in cities" :value="city">
          {{ city.name }}
      	</option>
    </select>
    <div>您选择的是: {{ selectedCity.name }}</div>
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            cities: [
                { name: '北京', value: '1' },
                { name: '上海', value: '2' },
                { name: '深圳', value: '3' },
            ],
            selectedCity: ''
        }
    });
</script>
```

### 指令：v-cloak

**问题现象：**使用`{{}}`绑定的页面内容位置，可能会因为数据还没初始化完成，在很短一段时间内直接显示 `{{xxx}}` 这样的代码内容。（在页面加载或刷新页面的时候，尤其明显）

**解决方案：**使用`v-cloak`指令，可以让`{{xxx}}`在未填充数据的时候不显示，等有数据了再显示

**注意：**要在 css 中先加入这样的样式，才能让 v-cloak 生效

```css
[v-cloak] {
    display: none;
}
```

```html
<div id="app" v-cloak>
    <p>{{ message }}</p>
</div>
```

不会显示，直到编译结束。

### 指令：v-once

作用：让元素和组件只渲染一次。在随后的页面更新中，使用了 v-once 的元素、组件、及其所有子节点，都会当作静态内容跳过重渲染过程

目的：用于优化更新性能

```html
<div id="app">
    <p v-once>{{ message }}</p>
    <input type="text" v-model="message" />
</div>

<script src="./vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: '我是data中message的属性的值'
        }
    });
</script>
```

修饰符

`.lazy`

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 除了输入法组合文字时。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

`.number`

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

```html
<input v-model.number="age" type="number">
```

这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

`.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```html
<input v-model.trim="msg">
```

## 自定义指令

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。

> 注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

## DOM操作：自定义指令

分类：局部注册 和 全局注册

### 局部注册

- 注册方式：在当前 Vue 实例对象的选项中设置自定义指令 `directives: {}`

- 定义格式：

  ```js
  directives: { 
    '指令的核心名称': { 
      inserted: (使用指令时的DOM对象) => { 具体的DOM操作 } 
    }
  }
  ```

- 使用方式：在标签元素上使用

```html
<div id="app">
    <!-- 3. 在视图中通过标签去使用指令 -->
    <input type="text" v-border />
</div>

<script src="./js/vue.js"></script>

<script>
    var vm = new Vue({
        el: '#app',
        // 1. 在vm对象的选项中设置自定义指令 directives:{}
        directives: {
            // 2. directives:{ '指令的核心名称': { inserted: (使用指令时的DOM对象) => { 具体的DOM操作 } }}
            border: {
                // 指令的定义:
                inserted: function (el, binding) {
                    el.style.border = "2px solid red";
                }
            }
        }
    });
</script>
```

### 全局注册

- 注册方式：在创建Vue实例之前，使用 `Vue.directive()` 函数定义全局自定义指令

- 定义格式：

  ```js
  Vue.directive('指令的核心名称',{ 
    inserted: (使用指令的DOM对象) => { 具体的DOM操作 } 
  });
  ```

- 使用方式：在视图标签上通过 `v-自定义指令名 `的格式使用

```html
<div id="app">
    <!-- 3. 在视图中通过标签去使用指令 -->
    <input type="text" v-border />
</div>

<script src="./js/vue.js"></script>

<script>
    // 全局自定义指令
    // 1.在创建 Vue 实例之前定义全局自定义指令Vue.directive()
    // 2. Vue.directive('指令的核心名称',{ inserted: (使用指令时的DOM对象) => { 具体的DOM操作 } } );
    Vue.directive('border', {
            // 指令的定义:
            inserted: function (el, binding) {
                el.style.border = "2px solid red";
            }
    });

    var vm = new Vue({
        el: '#app'
    });
</script>
```

> [inserted]():    当被绑定的元素插入到 DOM 中时,会被调用

### 案例完善：自定义指令实现自动聚焦

> 说明：一进入页面，将添加品牌的内容输入框自动聚焦，等待用户输入

当页面加载时，该元素将获得焦点 (注意：`autofocus` 在移动版 Safari 上不工作)。事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。现在让我们用指令来实现这个功能：

```js
//1. 定义一个全局自定义指令
//2. 在指令中，获取要操作的DOM（输入框元素），调用聚焦方法
//3. 在页面中为输入框添加该自定义指令

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时，inserted 会被调用
  inserted: function (el) {
    // 聚焦元素 el 就是指令所在的DOM对象
    el.focus()
  }
})
//<input v-focus>
```

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

### 钩子函数参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。





# 过滤器

> 作用：对视图中要显示的数据做文本格式化

- 使用： 在 `插值表达式` 或者 `v-bind指令` 中，通过竖线操作符`|`调用过滤器
- 可以为过滤器传参数
- 可以串联使用多个过滤器

## 局部注册

局部过滤器只在当前 Vue 实例中生效

- 注册方式：在 Vue 实例对象的选项中配置 `filters: { }`
- 定义格式：过滤器名字：`(要过滤的数据) => { return 过滤后的结果数据 }`
- 使用方式：`{{ 被过滤的数据 | 过滤器1 | 过滤器2(参数1, 参数2) }}`

```html
<div id="app">
    <p>{{ msg | upper | substr(1,2) }}</p>
</div>

<script src="./vue.js"></script>

<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'kfc'
        },
        // 1. 设置vm的过滤器filters选项
        filters: {
            upper: function (v) {
                // 2. 在过滤器的方法中操作数据并返回结果
                return v.toUpperCase();
            },
            // 3. 带参数的过滤器
            substr: function (v, start, n) {
                return v.substring(start, n);
            }
        }
    });
</script>
```

## 全局注册

全局过滤器可在所有 Vue 实例中生效

- 注册方式：在创建 Vue 实例对象之前，使用`Vue.filter()`函数来定义全局过滤器
- 定义格式：`Vue.filter('过滤器名字', (要过滤的数据) => { return 对数据的处理结果 })`

- 使用方式：和局部过滤器一致

```html
<!-- Vue托管视图区域1 -->
<div id="app1">
    <p>{{ msg | upper }}</p>
</div>

<!-- Vue托管视图区域2 -->
<div id="app2">
    <p>{{ msg | upper }}</p>
</div>

<script src="./vue.js"></script>

<script>
    // 定义全局过滤器
    Vue.filter('upper', function (v) {
        return v.toUpperCase();
    });

    // Vue实例1
    var vm1 = new Vue({
        el: '#app1',
        data: {
            msg: 'kfc'
        }
    });

    // Vue实例2
    var vm2 = new Vue({
        el: '#app2',
        data: {
            msg: 'jingongmen'
        }
    });
</script>
```



# 计算属性

> 作用：可以根据一个或多个data中的数据的变化，实时计算出一个新数据

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

在这个地方，模板不再是简单的声明式逻辑。必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。

当想要在模板中多包含此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

- 使用场景：任何有响应式数据参与的复杂计算过程，都应使用**计算属性**
- 定义方式：在Vue实例选项中通过`computed: {}`定义
- 计算属性也是响应式的，用法和 data 中的响应式数据属性一致

其实是增强版的插值表达式：插值表达式内适合写一些简单的逻辑，计算属性可以写较复杂逻辑

```html
<div id="app">
    <p>{{ a }}</p>
    <p>{{ b }}</p>
    <p>{{ a + b }}</p>
    <!-- 
    现象: data中的属性c的值依赖于data中的另外两个属性a和b
    问题:如果逻辑代码很简单,可以把表达式直接写在{{}}中
    如果逻辑代码很复杂, 直接把表达式写在{{}}中不合适，此时, 就用到了计算属性
		-->
    <!-- 计算属性的用法和data中的属性用法一样 -->
    <p>{{ a }}</p>
    <p>{{ b }}</p>
    <p>{{ comC }}</p>
</div>
<script src="./vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            a: 1,
            b: 2
        },
        /* 计算属性:
         * 计算属性是Vue实例的一个选项
         * 计算属性的值是一个对象
         * 计算属性也是属性,只不过值是带有返回值的函数
         * 当data中的属性一发生变化, 会自动调用计算属性的方法
         */
        computed: {
            comC: function () {
                return this.a + this.b
            }
        }
    });
</script>
```

## 计算属性缓存 vs 方法

可以通过在表达式中调用方法来达到同样的效果：

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。

然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A**。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。

**计算属性** computed:

- 当 data 中的数据发生**变化**，会触发计算属性的方法
- 会缓存依赖的 data 响应式数据，如果响应式数据并没发生变化，则不会触发重新计算

**实例方法** methods：

- 一旦调用就会执行, 和数据的变化与否无关

## 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`，然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。

侦听属性：

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

> 上面代码是命令式且重复的。

计算属性：

```js

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

## 计算属性的 setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

# Vue 组件基础

> 什么是组件?

**需求**：如果页面中存在多个同样结构的控件，如下面的代码所示

```html
<div id="app">
    <!-- 
        本页面中有5个同样结构和功能的标签组: 
        span + button
    -->
    <span>{{ count1 }}</span>
    <button @click="changeCount1">按钮</button>
    <br>

    <span>{{ count2 }}</span>
    <button @click="changeCount2">按钮</button>
    <br>

    <span>{{ count3 }}</span>
    <button @click="changeCount3">按钮</button>
    <br>

    <span>{{ count4 }}</span>
    <button @click="changeCount4">按钮</button>
    <br>

    <span>{{ count5 }}</span>
    <button @click="changeCount5">按钮</button>
    <br>
</div>

<script src="./vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
            count5: 0
        },
        methods: {
            changeCount1() {
                this.count1++;
            },
            changeCount2() {
                this.count2++;
            },
            changeCount3() {
                this.count3++;
            },
            changeCount4() {
                this.count4++;
            },
            changeCount5() {
                this.count5++;
            }
        }
    });
</script>
```

**这段代码的问题：**

- 代码高度重复
- 不利用维护，修改功能的话要修改多处

**解决的方案：**

Vue 提供了组件化编程能力，可将重复代码封装成单个组件，再进行调用。

来体验一下组件的使用：

```html
<div id="app">
    <!-- 2. 使用组件 -->
    <counter></counter>
    <counter></counter>
    <counter></counter>
    <counter></counter>
</div>
<script src="./vue.js"></script>
<script>
    // 1. 注册全局组件
    Vue.component('counter', {
        template: `
            <div>
                <span>{{ count }}</span> 
                <button @click="changeCount">按钮</button>
            </div>
        `,
        data() {
            return {
                count: 0
            }
        },
        methods: {
            changeCount() {
                this.count++;
            }
        }
    });

    new Vue({
        el: '#app'
    });
</script>
```

所以，类似搭积木一样，组件允许我们使用小型、独立和通常具有**可复用性**的组件，构建出大型应用。

## 组件的组织

几乎任意类型的应用界面都可以抽象为一个组件树：

![components](./media/components.png)

-  `new Vue()` 其实是在创建组件树的根实例
-  组件也是一种 Vue 实例，它带有名字，且是可复用的
-  组件的参数选项：
   - 注册组件时，传递的选项与用`new Vue()`创建根实例时相同
   - `el ` 选项只有根实例能用

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

## 组件的特点

1. 组件是一种封装
   - 可封装视图和逻辑代码（html、css、js）
   - 有自己的独立作用域
2. 组件能复用
   - 可被任意次数的调用
   - 每调用一次组件，就相当于创建一个新的组件实例对象
3. 组件是一个特殊的 Vue 实例
   - 组件中的 data 必须是一个函数，且返回值是一个数据对象
   - template 选项值内只能有一个根元素

> 建议：在实际项目开发中，我们要充分利用开源的大型第三方组件库，通常它们很成熟稳定，也能满足我们的大部分需求，可以节省大量的开发时间成本

## 组件的复用

你可以将组件进行任意次数的复用：

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

**`data` 必须是一个函数:**

当我们定义这个 `<button-counter>` 组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：

```js
data: {
  count: 0
}
```

取而代之的是，**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

如果 Vue 没有这条规则，点击一个按钮就可能会影响到其它所有实例

## 组件的使用与分类

使用步骤：

1. 先注册：全局注册、局部注册
2. 再通过`<组件名>`调用组件

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。

### 全局注册

```js
Vue.component('my-component-name', {
  // ... options ...
  // 组件选项: data methods template等(没有el)
  // data 的值是一个函数, 需要返回一个对象
  data:function(){}
})
```

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

```html
<div id="app">
    <!-- 2. 使用组件 -->
    <counter></counter>
    <counter></counter>
    <counter></counter>
    <counter></counter>
</div>
<hr>

<div id="app1">
    <counter></counter>
    <My-Component></My-Component>
</div>
<hr>

<script src="./vue.js"></script>

<script>
    // 1. 注册组件
    Vue.component('counter', {
        // template: 页面字符串,有且仅有一个根元素
        template: `
            <div>
                <span>{{count}}</span> 
                <button @click="changeCount">按钮</button>
            </div>
        `,
        data() {
            return {
                count: 0
            }
        },
        methods: {
            changeCount() {
                this.count++;
            }
        }
    });

    // 注册另一个组件
    Vue.component('myComponent', {
        template: `
            <div>
                <h1>{{num}}</h1> 
                <button @click="changeTitle">按钮</button>
            </div>
        `,
        data() {
            return {
                num: 0
            }
        },
        methods: {
            changeTitle() {
                this.num++;
            }
        }
    });

    new Vue({
        el: '#app'
    });

    new Vue({
        el: '#app1'
    }); 
</script>
```

### 局部注册

1. 通过 components 选项进行注册
2. components 对象中的每个属性：`“组件的名称”：{“组件的选项”}`

```html
<div id="app">
    <!-- 2 使用组件 -->
    <com-a></com-a>
    <com-B></com-b>
    <com-c></com-c>
</div>

<script src="./js/vue.js"></script>

<script>
    // 局部组件的选项
    const comA = {
        template: `<div>{{title}}</div>`,
        data() {
            return {
                title: 'comA中的data里的title'
            }
        }
    };

    const comB = {
        template: `<div>{{title}}</div>`,
        data() {
            return {
                title: 'comB中的data里的title'
            }
        }
    };

    const comC = {
        template: `<div>{{title}}</div>`,
        data() {
            return {
                title: 'comC中的data里的title'
            }
        }
    };

    new Vue({
        el: '#app',
        // 1. 在Vue实例中设置components选项{组件名:组件选项}
        components: {
            // 在页面中的组件名:组件选项
            'comA': comA,
            'comB': comB,
            'comC': comC
        }
    });
</script>
```

### 组件名大小写

定义组件名的方式有两种：

#### 使用 kebab-case

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

#### 使用 PascalCase

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

## 组件的父子关系

在组件中可以调用其他的组件，其中：

- 被调的一方叫做子组件
- 主调的一方叫做父组件

```html
<div id="app">
    <comp03></comp03>
</div>

<script src="./vue.js"></script>

<script>
    Vue.component('comp01', {
        template: `
            <div style="background: blue; padding: 20px">
                <p>我是组件comp01</p>
            </div>
        `
    })

    const comp02 = {
        template: `
            <div style="background: #ccc; padding: 20px">
                <h1>我是组件comp02，包含了comp01</h1>
                <comp01></comp01>
            </div>
        `
    }

    const comp03 = {
        template: `
            <div style="background: pink; padding: 20px">
                <h1>我组件comp03，包含了comp02</h1>
                <comp02></comp02>
            </div>
        `,
        components: {
            comp02
        }
    }

    const vm = new Vue({
        el: '#app',
        data: {},
        components: {
            comp03
        }
    })
</script>
```

## 组件与模块

**组件** 和 **模块** 都提供了封装复用的特性，但是他们的侧重点是不同的。

- 模块：侧重于对逻辑功能和数据的封装
- 组件：侧重于对视图功能的封装

组件：把重复的代码提取出来合并成为一个个组件，组件最重要的就是重用（复用），位于框架最底层，其他功能都依赖于组件，可供不同功能使用，独立性强。

模块：分属同一功能/业务的代码进行隔离（分装）成独立的模块，可以独立运行，以页面、功能或其他不同粒度划分程度不同的模块，位于业务框架层，模块间通过接口调用，目的是降低模块间的耦合，由之前的主应用与模块耦合，变为主应用与接口耦合，接口与模块耦合。

**组件和模块的区别：**

- 组件：就像一个个小的单位，多个组件可以组合成组件库，方便调用和复用，组件间也可以嵌套，小组件组合成大组件。
- 模块：就像是独立的功能和项目（如淘宝：注册、登录、购物、直播...），可以调用组件来组成模块，多个模块可以组合成业务框架。

**为什么要使用组件化和模块化？**

开发和调试效率高：随着功能越来越多，代码结构会越发复杂，要修改某一个小功能，可能要重新翻阅整个项目的代码，把所有相同的地方都修改一遍，重复劳动浪费时间和人力，效率低；使用组件化，每个相同的功能结构都调用同一个组件，只需要修改这个组件，即可全局修改。

可维护性强：便于后期代码查找和维护。

避免阻断：模块化是可以独立运行的，如果一个模块产生了bug，不会影响其他模块的调用。

版本管理更容易：如果由多人协作开发，可以避免代码覆盖和冲突。

# 组件间通信

组件提供了对代码的封装复用能力，但对于构建一个完整的应用程序，肯定会遇上多个组件间需要互相协作的情况。所以，组件需要有互相通信的机制。

常规的三种通信场景：

- 父 => 子：在子组件中使用父组件的数据，可通过 props 来实现
- 子 => 父：在父组件中使用子组件的数据，可通过自定义事件实现
- 兄弟组件之间

<code><img src="./media/vue-correspond.png" alt="vue-correspond" style="zoom:50%;"/></code>

## 一、`props` / `$emit`

> 父组件通过props的方式向子组件传递数据，而通过$emit 子组件可以向父组件通信。

### 父组件到子组件的通信 props

> 目的：将父组件中的 data 属性值传递给子组件使用
>
> 关键：通过 props 机制给子组件传值

步骤：

1. 编写子组件选项：在子组件选项中声明 props 选项，定义一个自定义属性 title
2. 将子组件注册成局部组件
3. 调用子组件时设置标签的自定义属性 title，即可将数据传递到子组件

```html
<div id="app">
    <!-- 3. 使用子组件时,通过动态绑定自定义属性获取父组件的值 -->
    <component-a :title="msg" :lists="items"></component-a>
</div>

<script src="./js/vue.js"></script>

<script>
    // 自定义组件的选项
    var ComponentA = {
        // 1. 在子组件中通过props声明自定义属性title
        template: `
            <div>
                <h1>{{ title }}</h1>
                <ul>
                    <li v-for="item in lists">{{item.name}}</li>
                </ul> 
            </div>
        `,
        // 用来接收外部传过来的数据
        // 值的传递是单向的，内部不要修改props里变量的值
        props: ['title', 'lists']
    };

    new Vue({
        el: '#app',
        // 目的: 要在子组件中使用父组件的 msg 的值
        data: {
            msg: 'hello heima',
            items: [{
                'id': 1,
                'name': '小狗'
            }, {
                'id': 2,
                'name': '小猫'
            }, {
                'id': 3,
                'name': '小羊'
            }]
        },
        // 2. 注册局部组件
        components: {
            'ComponentA': ComponentA
        }
    });
</script>
```

总结: props 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 props 只读，不可被修改，所有修改都会失效并警告。

**子组件中，==data== 中的数据和 ==props== 中的数据的==区别==：**

- 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上。props 中的数据，都是通过 父组件传递给子组件的。


- data中的数据是可读可写的；props中的属性只是可读的，无法重新赋值，重新赋值会报错（也就是说，子组件不要直接去修改父组件中的数据）。

### 子组件到父组件的通信 $emit

> $emit 绑定一个自定义事件, 当这个语句被执行时, 就会将参数 arg 传递给父组件,父组件通过 v-on 监听并接收参数。 

子组件 (article.vue)：

```html
<!--子组件模版：--->
<template>
  <div>
    <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: ['articles'],
  methods: {
    emitIndex(index) {
      this.$emit('onEmitIndex', index)
    }
  }
}
</script>
```

父组件：

```html
// 父组件中
<template>
  <div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>

<script>
//导入子组件模块
import comArticle from './article.vue'
export default {
  name: 'HelloWorld',
  //局部组成子组件
  components: { comArticle },
  data() {
    return {
      currentIndex: -1,
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  },
  methods: {
    onEmitIndex(idx) {
      this.currentIndex = idx
    }
  }
}
</script>
```

## 二、 `$children` / `$parent`

类型：`Vue instance`

详细：

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

> 节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信

通过 `$parent` 和 `$children` 就可以访问组件的实例，拿到实例就可以访问此组件的所有方法和 data。

父组件：

```html
// 父组件中
<template>
  <div class="hello_world">
    <div>{{msg}}</div>
    <com-a></com-a>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>

<script>
import ComA from './test/comA.vue'
export default {
  name: 'HelloWorld',
  components: { ComA },
  data() {
    return {
      msg: 'Welcome'
    }
  },

  methods: {
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = 'this is new value'
    }
  }
}
</script>
```

子组件：

```html
// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为:  {{parentVal}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    parentVal(){
      return this.$parent.msg;
    }
  }
}
</script>
```

> 要注意边界情况，如在 `#app` 上拿 `$parent` 得到的是 `new Vue()` 的实例，在这实例上再拿 `$parent` 得到的是 `undefined`，而在最底层的子组件拿 `$children` 是个空数组。也要注意得到 `$parent` 和 `$children` 的值不一样，`$children` 的值是数组，而 `$parent` 是个对象

## 三、`provide` / `inject`

`provide` / `inject` 是 Vue2.2.0 新增的 API, 简单来说就是父组件中通过 `provide` 来提供变量, 然后再子组件中通过 `inject` 来注入变量。

> 注意: 这里不论子组件嵌套有多深, 只要调用了 `inject` 那么就可以注入 `provide` 中的数据，而不局限于只能从当前父组件的 `props` 属性中回去数据

举例验证

> 假设有三个组件:  A.vue、B.vue、C.vue 其中 C 是 B 的子组件，B 是 A 的子组件

A.vue

```html
<template>
  <div>
	<comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>
```

B.vue

```html
<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>
```

C.vue

```html
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
```

## 四、`ref` / `refs`

> `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
>
> `ref`：如果用在子组件上，引用就指向组件实例。
>
> 可以通过实例直接调用组件的方法或访问数据。

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用。例如：

```html
<base-input ref="usernameInput"></base-input>
```

现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```js
this.$refs.usernameInput
```

来访问这个 `<base-input>` 实例，以便不时之需。

比如程序化地从一个父级组件聚焦这个输入框。在刚才那个例子中，该 `<base-input>` 组件也可以使用一个类似的 `ref` 提供对内部这个指定元素的访问，例如：

```html
<input ref="input">
```

甚至可以通过其父级组件定义方法：

```js
methods: {
  // 用来从父级组件聚焦输入框
  focus: function () {
    this.$refs.input.focus()
  }
}
```

这样就允许父级组件通过下面的代码聚焦 `<base-input>` 里的输入框：

```js
this.$refs.usernameInput.focus()
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

## 五、eventBus：`$emit`/`$on`

这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。

当我们的项目比较大时，可以选择更好的状态管理解决方案 vuex。

实现方式：

```js
var Event=new Vue();
Event.$emit('事件名',data);
Event.$on('事件名',data => {});
```

> 假设兄弟组件有三个，分别是 A、B、C 组件，C 组件如何获取 A 或者 B 组件的数据

```html

<div id="playlife">
	<my-a></my-a>
	<my-b></my-b>
	<my-c></my-c>
</div>

<template id="a">
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>

<template id="b">
  <div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
</template>

<template id="c">
   <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
</template>

<script>
var Event = new Vue();//定义一个空的Vue实例
var A = {
	template: '#a',
	data() {
	  return {
	    name: 'tom'
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-a', this.name);
	  }
	}
}
var B = {
	template: '#b',
	data() {
	  return {
	    age: 20
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-b', this.age);
	  }
	}
}
var C = {
	template: '#c',
	data() {
	  return {
	    name: '',
	    age: ""
	  }
	},
	mounted() {//在模板编译完成后执行
	 Event.$on('data-a',name => {
	     this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
	 })
	 Event.$on('data-b',age => {
	     this.age = age;
	 })
	}
}
var vm = new Vue({
	el: '#playlife',
	components: {
	  'my-a': A,
	  'my-b': B,
	  'my-c': C
	}
});
  //移除事件监听者
  //Event.$off('data-b', {});
</script>
```

## 六、Vuex

###



## 七、`localStorage` / `sessionStorage`

通过 `window.localStorage.getItem(key)` 获取数据 通过 `window.localStorage.setItem(key,value)` 存储数据

> 注意用 `JSON.parse()` / `JSON.stringify()` 做数据格式转换`localStorage` / `sessionStorage`可以结合vuex, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.

## 八、 `$attrs` / `$listeners`

> 假如：A 组件与 D 组件是隔代关系，那它们之前进行通信有哪些方式呢？

1. 使用`props`绑定来进行一级一级的信息传递, 如果 D 组件中状态改变需要传递数据给 A, 使用事件系统一级级往上传递
2. 使用 eventBus ,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
3. 使用 Vuex 来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用 Vuex 处理感觉有点大材小用了

在 vue2 .4中，为了解决该需求，引入了 `$attrs` 和 `$listeners` ， 新增了`inheritAttrs` 选项。 在版本 2.4 以前，默认情况下,父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)，将会“回退”且作为普通的HTML特性应用在子组件的根元素上。

 app.vue /  index.vue

```html
<template>
  <div>
    <child-com1
      :name="name"
      :age="age"
      :gender="gender"
      :height="height"
      title="playlife 学习Vue"
    ></child-com1>
  </div>
</template>

<script>
  //import()动态加载模块
  //子组件1
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      name: "playlife",
      age: "23",
      gender: "男",
      height: "175"
    };
  }
};
</script>
```

childCom1.vue

```html
<template class="border">
  <div>
    <p>name: {{ name }}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在 props 声明的属性
  props: {
    name: String // name 作为 props属性绑定
  },
  created() {
    
    console.log(this.$attrs);
     // { "age": "18", "gender": "女", "height": "158", "title": "playlife 学习Vue" }
     // 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。
  }
};
</script>
```

childCom2.vue

```html
<template>
  <div class="border">
    <p>age: {{ age }}</p>
    <p>childCom2: {{ $attrs }}</p>
  </div>
</template>
<script>

export default {
  inheritAttrs: false, //可以关闭自动挂载到组件根元素上的没有在 props 声明的属性
  props: {
    age: String
  },
  created() {
    console.log(this.$attrs); 
    // { "gender": "男", "height": "175", "title": "playlife 学习Vue" }
    // 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。
  }
  }
};
</script>
```

## 总结

常见使用场景可以分为三类:

- 父子组件通信: `props` ; `$parent` / `$children`; `provide` / `inject` ; `ref `; `$attrs` / `$listeners`
- 兄弟组件通信: eventBus ; Vuex
- 跨级通信: eventBus; Vuex; `provide` / `inject` 、`$attrs` / `$listeners`

# Vuex

####



# Vue 生命周期

> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

![life-cycle-comment](./media/life-cycle-comment.png)



生命周期函数（钩子函数）：

beforeCreate & created

beforeMount & mounted

beforeUpdate & updated

beforeDestroy & destroyed

## 生命周期

### new Vue()

> new 了一个Vue的实例对象，此时就会进入组件的创建过程。

### Init Events & Lifecycle

> 初始化组件的事件和生命周期函数，当执行这一步之后，组件的生命周期函数就已经全部初始化好了，等待着依次被调用；

### beforeCreate 钩子函数

> 组件创建之后遇到的第一个生命周期函数，这个阶段data 和methods以及dom结构都未被初始化，也就是获取不到data的值，不能调用methods中的函数

### Init injections & reactivity

> 这个阶段中，正在初始化data和methods中的方法

### created 钩子函数

> 这个阶段组件的 data 和 methods 中的方法已初始化结束，可以访问，但是 Dom结构未初始化，页面未渲染在这个阶段，经常会发起ajax请求

### 编译模板结构

> 判断是否有 el 属性，若有 el 属性判断是否有 template 属性，若有template属性，则渲染template的模板，若没有template属性，则渲染el属性的模板；也就是el不指定，不渲染数据。
>
> 判断是否有el属性，若没有，则等待执行vm.$mount(‘el模板’) 这行代码
> 当以上步骤（编译模板）执行后，我们的模板页面，还没有挂载到页面上，只是存在与内存中

![complie-template](./media/complie-template.png)

```js
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

### beforeMount 钩子函数

> 当模板在内存中编译完成，此时内存中的模板结构还未渲染至页面上，看不到真实的数据。此时用看到的只是模板页面

### Create vm.$el and replace ‘el’ with it

> 这一步，正在把内存中渲染好的模板结构替换至真实的dom结构也就是页面上

### mounted 钩子函数

> 此时，页面渲染好，用户看到的是真实的页面数据， 生命周期创建阶段完毕，进入到了运行中的阶段，若此时用到了第三方的 ui 插件，需要初始化插件时放在此生命周期函数中。

### 生命周期运行中 {

> 当数据被修改后，beforeUpdate、updated就会执行，数据被修改几次，beforeUpdate、updated就就执行几次

![lifemoment](./media/lifemoment.png)

### beforeUpdate 钩子函数

> 当执行此函数，数据时新的，但是页面是旧的

### Virtual DOM re-render and patch

> 正在根据最近的data数据，重新渲染内存中的模板结构，并把渲染好的模板结构，替换至页面上

### updated 钩子函数 

页面已经完成了更新，此时，data数据和页面的数据都是新的

### }

### beforeDestroy 钩子函数

> 当执行此函数时，组件即将被销毁，但是还没有真正开始销毁，此时组件的data、methods数据或方法 还可被调用

### Teardown watchers,childcomponents and listeners

> 注销组件及侦听器，子组件以及时间监听器

### destroyed 钩子函数

> 组件已经完成了销毁



## 生命周期函数（钩子函数）

> 以下内容来自于 [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/) 视频课程的辅助教材，**请务必支持正版，请尊重作者的劳动成果**。

> [Vue.js源码全方位深入解析](https://coding.imooc.com/class/228.html) 作者：ustbhuangyi

