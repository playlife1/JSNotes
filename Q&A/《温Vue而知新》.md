# 库和框架的区别

库是功能函数的集合，每一次调用库内的函数实现一个特定的功能，使用库就是为了使用其中的功能，需要自己编写代码控制逻辑。

框架是一整套的解决方法，框架为了我们项目实现了大部分的功能，我们在开发的时候只需要按照框架的规则书写代码即可，不需要自己编写控制代码的执行逻辑。

库对项目的注入低依赖轻，更换别的库相对简单，开销小。

框架对项目的注意高，项目高度依赖框架，如果要更换框架无异于重写项目，开销大。





# MVC 和 MVVM 的区别

MVVM：模型-视图-视图模型

- M：  Model 模型 指的是数据层
- V ：  View  视图 指的是用户页面
- VM：ViewModel  视图模型 

视图模型是 **MVVM** 模式的核心，它是连接 **view** 和 **model** 的桥梁，**MVVM** 实现了 **view** 和**model** 的自动同步，当 **model** 属性改变时，我们不用自己手动操作 DOM 元素，来改变 **view** 的显示，反之亦然。以上，我们称之为数据的双向绑定。

MVC：模型-视图-控制器

- M：Model 模型 指的是数据层
- V：View 视图 指的是用户页面
- C：Controller 控制器指的是页面业务逻辑

**view** 传送指令给 **controller**，**controller** 完成业务逻辑后，要求 **model** 改变状态，**model** 将新的数据发送给 **view**，用户就得到了的反馈,所有通信都是单向的。





# v-if 和 v-show 的区别，适合场景

`v-if`是通过创建和删除 **DOM** 元素来控制元素的显示和隐藏，适用于不需要频繁切换元素显示和隐藏的场景。

`v-show`是通过操作 **CSS** 的 `display:block`和 `display:none` 来控制元素的显示和隐藏，适用于需要频繁切换元素的显示和隐藏的场景。





# v-for 和 v-if 的优先级那个更高

`v-for` 的优先级要高于 `v-if`

如果同时出现 `v-for` 和 `v-if`，无论判断条件是否成立，都会执行一遍 `v-for` 循环。这样使用浪费性能，所以要尽可能避免两者一起使用。



# vue 中的事件修饰符有哪些，分别作用是什么

`.prevent`： 阻止事件默认行为

`.stop`： 阻止事件冒泡

`.capture`： 设置事件捕获机制

`.self`： 只有点击元素自身才能触发事件

`.once`： 事件只触发一次





# v-model 的修饰符有哪些，分别作用是什么

`.trim` ：去除首尾空格

`.lazy` ：只有输入框失去焦点或按回车键时更新内容,不是实时更新

`.number` ：将数据转换成number类型 (原本是字符串类型)





# vue 中的按键修饰符有哪些

- `.enter`
- `.tab`
- `.esc`
- `.delete` (捕获"删除"和"空格”键)
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`







# computed 和 watch 的区别 

概念上:

 `computed` 是计算属性，它会根据所依赖的数据动态显示新的计算结果，通过计算出来的属性不需要调用，可以直接在 DOM 中使用。

`watch` 是监视对象，对象的键是 **data** 对应的数据，值是对应的回调函数，或者对象。

当 **data** 的数据发生变化，会执行对应的回调函数。

函数有两个参数：`val` (更新后的data数据)，`oldval`(原来的data数据)，`deep` 属性可以实现深度监听。

缓存上：

`computed` 具有缓存属性，只有依赖的数据发生变化，才会重新计算，否则直接调用缓存。	

`watch` 每次监听的值发生变化，都会执行回调。

使用场景上：

`computed` 当一个属性受多个属性影响的时候，使用 `computed` 比如: 购物车商品结算。

`watch` 当一条数据影响多条数据的时候，使用 `watch` 比如: 贷款金额的判断。





# v-for 中为什么要加 key，原理是什么

原理:

1. Vue 实现了一套虚拟 DOM，使我们可以不直接操作 DOM 元素，只操作数据就可以重新渲染页面。而隐藏在背后的原理是高效的 Diff算法。
2. 当页面数据发生改变,Diff 算法只会比较同一层级的节点。
   1. 如果节点类型不相同,直接干掉前面的节点,再创建并添加新的节点,不会再比较这个节点后面的子节点。
   2. 如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。
3. 使用key给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，"就地更新"找到正确的位置区插入新的节点。

作用:
1. 高效的更新虚拟DOM，提高渲染的性能。
   
2. 避免数据混乱的情况出现。





# 怎么理解 Vue 的生命周期

Vue 生命周期指的是：Vue 实例从创建到销毁的全过程，这个过程可以分为3个阶段：

- 第一阶段: 初始化阶段，创建 Vue实例、准备数据、准备模板、渲染视图。
- 第二阶段: 数据更新阶段，当数据变化时，会进行新旧 DOM 的对比。对比出差异的部分，进行差异化更新。
- 第三阶段: 实例销毁阶段，当 `vm.$destroy()` 被调用时，Vue 实例就会被销毁，释放相关资源。此时在更新数据，视图不会再更新了。





# Vue 钩子函数有哪些，有哪些使用的场景

初始化阶段：

- `beforeCreate` 在 data 数据注入到 vm实例之前，此时 vm 身上没有数据。

- `created`  在 data 数据注入到 vm实例之前，此时 vm身上有数据。

  > 一般在此发生 ajax 获取服务器返回数据，用于渲染页面

- `beforeMount` 在生成的结构替换视图之前，此时 DOM 还未更新。

- `mount`在生成的结构替换视图之前，此时 DOM 已经更新完成。

  > 此时，DOM 已经生成，在此进行 DOM 相关操作，例如：echarts 生成图表

数据更新阶段：

- `beforeUpdate` 数据变化了，但是页面 DOM 还未更新，发生在 DOM 更新之前。
- `update` 数据变化了，页面 DOM 也更新了。

实例销毁阶段：

- `beforeDestroy` 实例销毁，释放资源之前。此时实例上的数据还可以拿到
- `destroy` 实例销毁，释放资源之后。

 常用的钩子函数使用场景：

- `beforeCreate` 做 loading 的一些渲染

- `created`  结束 loading，发送数据的请求,拿数据

- `mounted`  可以操作 DOM 数据

- `updated ` 监视数据的更新

- `beforeDestroy` 销毁非 Vue 资源，防止内存泄漏。例如：清除定时器，关闭 WebSocket 连接。





# Vue 组件中 data 为什么必须是一个函数

Vue 组件是可复用的 Vue 实例。

组件中的 data 写成一个函数，并且以函数返回值的形式定义。函数形成局部作用域，这样每次复用组件，就会返回一个新的 data。确保 data 数据的独立性，各个组件之间修改数据不会相互影响。

如果 data 使用对象，对象是引用类型。会导致复用组件中的 data 都指向了同一块内存，那么各组件的数据就会相互影响，不能保持独立性了。





# 组件化和模块化的区别

组件化: 主要是界面上的划分，是一个对于结构样式行为的整体拆分，方便调用和复用。

模块化: 主要从代码逻辑的角度进行划分，对 JS 功能的拆分和封装，方便代码分层开发。保证每个功能模块职责单一

组件化模块化优点：开发调试效率高、可维护性强、避免阻断、版本管理更容易。



# \$nextTick 的原理和使用的场景

原理：

Vue 是异步执行 DOM 更新的，一旦观察到数据变化，Vue 就会开启一个队列。然后把在同一事件循环当中观察到数据变化的 watcher 推送进这个队列。

如果这个 watcher 被触发多次，只会被推送到队列一次，这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOM 操作，这样可以提高渲染效率。

如果要获取更新后的 DOM 元素，可以使用 Vue 内置的 `$nextTick` 方法，参数是一个函数。

它的作用类似 `setTimeout`，进行执行异步的操作。

应用：

Vue 中的 `$nextTick`主要用于处理数据动态变化后，DOM 还未及时更新的问题，用 `$nextTick`可以获取数据更新后最新 DOM 的变化。

方法使用场景：

1. 第三方插件，在 Vue 生成的某些 DOM 动态发生变化时重新应用该插件。
2. 视图更新之后，基于新的视图进行操作。





# Vue 中组件通信的方式有哪些

## 一、`props` / `$emit`

> 父组件通过props的方式向子组件传递数据，而通过$emit 子组件可以向父组件通信。

### 父组件到子组件的通信 props

> 目的：将父组件中的 data 属性值传递给子组件使用
>
> 关键：通过 props 机制给子组件传值

总结: props 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 props 只读，不可被修改，所有修改都会失效并警告。

**子组件中，==data== 中的数据和 ==props== 中的数据的==区别==：**

- 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上。props 中的数据，都是通过 父组件传递给子组件的。


- data中的数据是可读可写的；props中的属性只是可读的，无法重新赋值，重新赋值会报错（也就是说，子组件不要直接去修改父组件中的数据）。

### 子组件到父组件的通信 $emit

> $emit 绑定一个自定义事件, 当这个语句被执行时, 就会将参数 arg 传递给父组件,父组件通过 v-on 监听并接收参数。 

## 二、 `$children` / `$parent`

类型：`Vue instance`

详细：

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

> 节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信

通过 `$parent` 和 `$children` 就可以访问组件的实例，拿到实例就可以访问此组件的所有方法和 data。

> 要注意边界情况，如在 `#app` 上拿 `$parent` 得到的是 `new Vue()` 的实例，在这实例上再拿 `$parent` 得到的是 `undefined`，而在最底层的子组件拿 `$children` 是个空数组。也要注意得到 `$parent` 和 `$children` 的值不一样，`$children` 的值是数组，而 `$parent` 是个对象

## 三、`provide` / `inject`

`provide` / `inject` 是 Vue2.2.0 新增的 API, 简单来说就是父组件中通过 `provide` 来提供变量, 然后再子组件中通过 `inject` 来注入变量。

> 注意: 这里不论子组件嵌套有多深, 只要调用了 `inject` 那么就可以注入 `provide` 中的数据，而不局限于只能从当前父组件的 `props` 属性中回去数据

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

## 六、Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.

Vuex 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上

Vuex 各个模块

- state：用于数据的存储，是store中的唯一数据源
- getters：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
- mutations：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
- actions：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
- modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

## 七、`localStorage` / `sessionStorage`

通过 `window.localStorage.getItem(key)` 获取数据 通过 `window.localStorage.setItem(key,value)` 存储数据

> 注意用 `JSON.parse()` / `JSON.stringify()` 做数据格式转换`localStorage` / `sessionStorage`可以结合vuex, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.

## 八、 `$attrs` / `$listeners`

> 假如：A 组件与 D 组件是隔代关系，那它们之前进行通信有哪些方式呢？

1. 使用`props`绑定来进行一级一级的信息传递, 如果 D 组件中状态改变需要传递数据给 A, 使用事件系统一级级往上传递
2. 使用 eventBus ,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
3. 使用 Vuex 来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用 Vuex 处理感觉有点大材小用了

在 vue2 .4中，为了解决该需求，引入了 `$attrs` 和 `$listeners` ， 新增了`inheritAttrs` 选项。 在版本 2.4 以前，默认情况下,父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)，将会“回退”且作为普通的HTML特性应用在子组件的根元素上。

## 总结

常见使用场景可以分为三类:

- 父子组件通信: `props` ; `$parent` / `$children`; `provide` / `inject` ; `ref `; `$attrs` / `$listeners`
- 兄弟组件通信: eventBus ; Vuex
- 跨级通信: eventBus; Vuex; `provide` / `inject` 、`$attrs` / `$listeners`





# 怎么理解 Vue 中的虚拟 DOM

虚拟 DOM 其实就是一颗以 JavaScript 对象(VNode)作为基础的树，用对象属性来描述阶段。

实际上它只是一层对真实 DOM 的抽象，最终可以通过一系列操作使这棵树映射到真实环境上。

简单理解可以把虚拟 DOM 理解为一个简单的 JS对象，并且最少包含标签名(tag)、属性(attrs)和子元素对象(children)三个属性。

不同的框架对这三个属性的命名会有点差别。Vue的虚拟 DOM 是将多次 DOM 操作保存在一个 JS对象(虚拟DOM对象)中，然后用这个 JS对象一次性的去更新 DOM 操作，这样就避免了很多无效的计算。



# vue-loader 是做什么的

概念：vue-loader是基于webpack 的一个loader，解析和转换.vue文件。

提取出其中的逻辑代码script，样式代码style，以及HTML模板template，再分别把他们交给对应的loader去处理。

用途：js可以写es6、style样式可以是less或scss等



# Vue 中怎么操作 dom

要在 `mounted` 中使用，在执行 `mounted` 的时候，Vue 已经渲染了 DOM 节点，可以获取 DOM 节点。

方法：

1. 在标签中添加`<tag ref="name"></tag>`
2. 在方法中用`this.$refs.name`拿到这个元素



# router 和 route 的区别

router 是VueRouter的实例，是一个全局的路由对象，它包含了所有的路由和许多关键的对象和属性。

route 是当前正在跳转的路由对象，是一个局部路由对象。里面包含当前路由的信息，比如：name、path、params、query 等



# 路由传参的方式和区别

方式：params 和 query

区别：

params 用的是 name，传递的参数在地址栏不会显示，类似于post

query 用的是 path，传递的参数会在地址栏显示出来，类似于get





# 导航钩子有几种（导航守卫）具体怎么用的

1、全局守卫： router.beforeEach

2、全局解析守卫： router.beforeResolve

3、全局后置钩子： router.afterEach

4、路由独享的守卫： beforeEnter

5、组件内的守卫： beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave

使用：

1、全局守卫： router.beforeEach

```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
// ...
})
```

2、全局解析守卫：

```js
router.beforeResolve((to, from, next) => {
// ...
})
```

 可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

3、全局后置钩子：router.afterEach

```js
router.afterEach((to, from) => {
// ...
})
```

4、路由独享的守卫：beforeEnter

```js
const router = new VueRouter({
	routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }]
})
```

5、组件内的守卫：

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 this
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 this
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 this
  }
}
```



# active-class 是哪个组件的属性？

active-class 属于vue-router的样式方法，当 router-link 标签被点击时将会应用这个样式

active-class 是 vue-router 模块的 router-link 组件中的属性，用来做选中样式的切换；

在 vue-router 中要使用 active-class 有两种方法：

1. 直接在路由 js 文件中配置 linkActiveClass

```js
export default new Router({
linkActiveClass: ‘active’,
})
```

2. 在 router-link 中写入active-class



# keep-alive 的理解

1、keep-alive 是 Vue 的一个内置组件。Vue2.0 提供了一个 keep-alive 组件用来缓存组件，避免多次加载相应的组件，减少性能消耗。

2、它有两个生命周期：

activated: keep-alive 组件激活时调用。

deactivated: keep-alive 组件停用时调用。

它提供了 include 与 exclude 两个属性，允许组件有条件地进行缓存。

原理：
Vue 内部将 DOM 节点抽象成了一个个的 VNode(虚拟DOM)节点。所以，keep-alive 的缓存也是基于 VNode 节点的而不是直接存储DOM结构。

其实就是将需要缓存的 VNode 节点保存在 this.cache 中，在 render 时,如果 VNode 的 name 符合在缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode 实例进行渲染。

