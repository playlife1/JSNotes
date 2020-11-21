# Vuex 概述

**vuex 是一个 vue 的状态管理工具,  状态即数据**

data 组件中的数据, 独立的数据

vuex 全局的数据, 所有组件共享的数据

```js
var num = 11 // 全局变量, 全局都能共享使用

function fn () {
	var str = 'abc'  // 局部变量, 只能在函数内使用
	console.log(num)
	console.log(str)
}
```

注意：

- 不是所有的场景都适用于vuex，只有在必要的时候才使用vuex
- 使用了vuex之后，会附加更多的框架中的概念进来，增加了项目的复杂度

## Vuex 的优点: 方便的解决多组件的共享状态

 Vuex 的作用是解决多组件状态共享的问题。

- 它是独立于组件而单独存在的，所有的组件都可以把它当作一座桥梁来进行通讯。

- 与事件总线（EventBus）相比，它具备额外的特点：

  - **响应式**
  - 操作更简洁

  代码量非常少, 但是需要熟悉

## 什么数据适合存到 Vuex 中

一般情况下，只有  **多个组件均需要共享的数据** ，才有必要存储在vuex中，

对于某个组件中的私有数据，依旧存储在组件自身的data中。

例如：

- 对于所有组件而言，当前登陆的用户信息是需要在全体组件之间共享的，则它可以放在vuex中
- 对于文章详情页组件来说，当前的用户浏览的文章列表数据则应该属于这个组件的私有数据，应该要放在这个组件data中。

# Vuex 的使用

1 安装 vuex, 与vue-router类似，vuex是一个独立存在的插件，如果脚手架初始化没有选 vuex，就需要额外安装。

```bash
npm i vuex
```

2 新建 `store/index.js` 专门存放 vuex

​	为了维护项目目录的整洁，在src目录下新建一个store目录其下放置一个index.js文件。 (和 `router/index.js` 类似)

3 创建仓库 `store/index.js` 

```jsx
// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store()

// 导出仓库
export default store
```

4 在 main.js 中导入挂载到 Vue 实例上

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

此刻起, 就成功创建了一个 **空仓库!!**

# 核心概念 - state 状态

`state`提供唯一的公共数据源，所有共享的数据都要统一放到 Store 中的 `state`中存储。

打开项目中的store.js文件，在state对象中可以添加我们要共享的数据。

打开项目中的store.js文件，在state对象中可以添加我们要共享的数据。

```jsx
// 创建仓库 store
const store = new Vuex.Store({
  // state 状态, 即数据, 类似于vue组件中的data,
  // 区别在于 data 是组件自己的数据, 而 state 中的数据整个vue项目的组件都能访问到
  state: {
    count: 101
  }
})
```

问题: 如何在组件中获取 count ?

1. 插值表达式 →  `{{  $store.state.count  }}`
2. mapState 映射计算属性 → `{{ count  }}`

**1 原始形式- 插值表达式**

**App.vue**

组件中可以使用  `this.$store` 获取到 Vuex 中的 store 对象实例，可通过`state` 属性属性获取 count， 如下

```vue
<h1>state的数据 - {{ $store.state.count }}</h1>
```

**计算属性** - 将 state 属性定义在计算属性中

```js
// 把state中数据，定义在组件内的计算属性中
  computed: {
    count () {
      return this.$store.state.count
    }
  }
```

```vue
<h1>state的数据 - {{ count }}</h1>
```

但是每次, 都这样一个个的提供计算属性, 太麻烦了, 所以我们需要辅助函数 mapState 帮我们简化语法

**2 辅助函数  - mapState**

>mapState是辅助函数，帮助我们把store中的数据映射到 组件的计算属性中, 它属于一种方便的用法

用法 ： 

第一步：导入mapState (mapState是vuex中的一个函数)

```js
import { mapState } from 'vuex'
```

第二步：采用数组形式引入state属性

```js
mapState(['count']) 
```

> 上面代码的最终得到的是 **类似于**

```js
count () {
    return this.$store.state.count
}
```

第三步：利用**展开运算符**将导出的状态映射给计算属性

```js
  computed: {
    ...mapState(['count'])
  }
```

```vue
 <div> state的数据：{{ count }}</div>
```

# 核心概念 - mutations

### 基本使用

通过 `strict: true` 可以开启严格模式

> **state 数据的修改只能通过 mutations，并且 mutations 必须是同步的**

**定义 mutations**

```js
const store  = new Vuex.Store({
  state: {
    count: 0
  },
  // 定义mutations
  mutations: {
     
  }
})
```

**格式说明**

`mutations` 是一个对象，对象中存放修改 `state` 的方法

```js
mutations: {
    // 方法里参数 第一个参数是当前store的state属性
    // payload 载荷 运输参数 调用mutaiions的时候 可以传递参数 传递载荷
    addCount (state) {
      state.count += 1
    }
  },
```

组件中提交 `mutations`

```jsx
this.$store.commit('addCount')
```

## 带参数的 mutation

提交 mutation 是可以传递参数的  `this.$store.commit('xxx',  参数)`

1 提供mutation函数

```js
mutations: {
  ...
  inputCount (state, count) {
    state.count = count
  }
},
```

2 注册事件

```jsx
<input type="text" :value="count" @input="handleInput">
```

3 提交mutation

```jsx
handleInput (e) {
  this.$store.commit('inputCount', +e.target.value)
}
```

**小tips: 提交的参数只能是一个, 如果有多个参数要传, 可以传递一个对象**

```jsx
this.$store.commit('inputCount', {
  count: e.target.value
})
```

## 辅助函数-mapMutations

> mapMutations 和 mapState 很像，它把位于 mutations 中的方法提取了出来，我们可以将它导入

```js
import  { mapMutations } from 'vuex'
methods: {
    ...mapMutations(['addCount'])
}
```

> 上面代码的含义是将mutations的方法导入了methods中，等价于

```js
methods: {
      // commit(方法名, 载荷参数)
      addCount () {
          this.$store.commit('addCount')
      }
 }
```

此时，就可以直接通过this.addCount调用了

```jsx
<button @click="addCount">值+1</button>
```

但是请注意： Vuex中mutations中要求不能写异步代码，如果有异步的ajax请求，应该放置在actions中

# 核心概念-actions

> state是存放数据的，mutations是同步更新数据 (便于监测数据的变化, 更新视图等, 方便于调试工具查看变化)，
>
> actions则负责进行异步操作

**定义 actions**

```js
actions: {
  setAsyncCount (context, num) {
    // 一秒后, 给一个数, 去修改 num
    setTimeout(() => {
      context.commit('inputCount', num)
    }, 1000)
  }
},
```

**原始调用** - `$store` (支持传参)

```js
setAsyncCount () {
  this.$store.dispatch('setAsyncCount', 200)
}
```

**辅助函数** - `mapActions`

> actions也有辅助函数，可以将action导入到组件中

```js
import { mapActions } from 'vuex'
methods: {
    ...mapActions(['setAsyncCount'])
}
```

直接通过 this.方法 就可以调用

```vue
<button @click="setAsyncCount(200)">+异步</button>
```

# 核心概念-getters

> 除了 state 之外，有时我们还需要从 state 中派生出一些状态，这些状态是依赖 state 的，此时会用到 getters

例如，state中定义了list，为1-10的数组，

```js
state: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

组件中，需要显示所有大于5的数据，正常的方式，是需要list在组件中进行再一步的处理，但是getters可以帮助我们实现它

**定义 getters**

```js
  getters: {
    // getters函数的第一个参数是 state
    // 必须要有返回值
     filterList:  state =>  state.list.filter(item => item > 5)
  }
```

**使用 getters**

**原始方式** -`$store`

```vue
<div>{{ $store.getters.filterList }}</div>
```

**辅助函数** - `mapGetters`

```js
computed: {
    ...mapGetters(['filterList'])
}
```

```vue
 <div>{{ filterList }}</div>
```

# 核心概念 - 模块 module

> **由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。**

这句话的意思是，如果把所有的状态都放在state中，当项目变得越来越大的时候，Vuex会变得越来越难以维护

由此，又有了Vuex的模块化

## **模块定义** - 准备 state

定义两个模块   **user** 和  **setting**

user 中管理用户的信息状态  userInfo  `modules/user.js`

```js
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}

```

setting中管理项目应用的名称 title, desc  `modules/setting.js`

```js
const state = {
  title: '这是大标题',
  desc: '描述真呀真不错'
}

const mutations = {}

const actions = {}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
```

使用模块中的数据,  可以直接通过模块名访问 `$store.state.模块名.xxx`  =>  `$store.state.setting.title`

也可以通过 `mapState` 映射

## 命名空间 namespaced

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的

这句话的意思是 刚才的user模块还是setting模块，它的 action、mutation 和 getter 其实并没有区分，都可以直接通过全局的方式调用,

但是，如果我们想保证内部模块的高封闭性，我们可以采用namespaced来进行设置

`modules/user.js`

```js
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  },
  myMsg: '我的数据'
}

const mutations = {
  updateMsg (state, msg) {
    state.myMsg = msg
  }
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

提交模块中的mutation

```jsx
全局的:   this.$store.commit('mutation函数名', 参数)

模块中的: this.$store.commit('模块名/mutation函数名', 参数)
```

namespaced: true 后, 要添加映射, 可以加上模块名, 找对应模块的 state/mutations/actions/getters

```jsx
computed: {
  // 全局的
  ...mapState(['count']),
  // 模块中的
  ...mapState('user', ['myMsg']),
},
methods: {
  // 全局的
  ...mapMutations(['addCount'])
  // 模块中的
  ...mapMutations('user', ['updateMsg'])
}
```

