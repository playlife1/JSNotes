# JavaScript 细枝末节的知识

> 总结细小的 JavaScript 知识、以回答面试题的形式巩固



# 伪数组和真数组的区别

伪数组：

1. 拥有 `length` 属性
2. 不具有数组的方法
3. 伪数组是一个 **Object**，真数组是 **Array**
4. 伪数组的长度不可变，真数组的长度是可变的

> 只有数组属性，但没有数组方法



# 哪些情况会得到伪数组

1. 函数参数对象 `arguments`
2. **DOM** 对象列表（比如通过`document.getElementsByTags` 得到的列表）、`childNodes` 也是伪数组
3. **jQuery** 对象（比如 `$('div')`）





# 伪数组怎么转换为真数组

1. 通过 `Array.prototype.slice.call()` 方法
2. 使用 ES6 的新方法：`Array.from()`
3. 通过 ES6 的新语法扩展运算符：`[...伪数组]`





# let、const、var的区别

1. `var` 声明变量存在提升（提升当前作用域最顶端），`let` 和 `const` 是不存在变量提升的情况
2. `var` 没有块级作用，`let` 和 `const` 存在块级作用域
3. `var` 允许重复声明，`let` 和 `const` 在同一作用域不允许重复声明
4. `var` 和 `let` 声明变量可以修改，`const` 是常量不能改变





# 异步函数有哪些?

JavaScript 中常见的异步函数有：定时器(`setTimeout` 、`setInterval`)，事件和 ajax 等





# 什么是 Promise，特点是什么?

**Promise** 是 JavaScript ES5 提出的解决异步任务的新方案。

它是一个对象，它其他 JavaScript 对象的用法，没有什么两样；其次，它起到代理作用（proxy），充当异步操作与回调函数之间的中介。它使得异步操作具备同步操作的效果，使得程序具备正常的同步运行的流程，回调函数不必再一层层嵌套。

简单说，它的思想是，每一个异步任务立刻返回一个 **Promise** 对象，由于是立刻返回，所以可以采用同步操作的流程。这个 **Promise** 对象有一个 **then** 方法，允许指定回调函数，在异步任务完成后调用。

特点：

1. Promise 对象只有三种状态。

   1. 异步操作“未完成”（**pending**）

   2. 异步操作“已完成”（**resolved**，又称 **fulfilled**）

   3. 异步操作“失败”（**rejected**）

  > 异步操作成功，Promise对象传回一个值，状态变为resolved。

   > 异步操作失败，Promise对象抛出一个错误，状态变为rejected。

2. Promise 的回调是同步的，then 是异步的

3. 可以链式调用





# Promise 的方法有哪些，能说明其作用

原型方法：

```js
Promise.prototype.then()
```

作用:

1. 为 **Promise** 实例添加状态改变时的回调函数。接受两个回调函数作为参数。第一个回调函数是 **Promise** 对象的状态变为 `resolved` 时调用，第二个回调函数是 **Promise** 对象的状态变为 `rejected` 时调用。其中，第二个函数是可选的，不一定要提供。

2. 返回的是另一个 **Promise** 对象，后面还可以接着调用 `then` 方法。

```js
Promise.prototype.catch()
```

作用:

1. 用于指定发生错误时的回调函数。
2. 返回的也是一个 **Promise** 对象，因此还可以接着调用 `then` 方法

```js
Promise.prototype.finally()
```

作用:

1. `finally` 方法用于指定不管 **Promise** 对象最后状态如何，都会执行的回调函数。
2. `finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 **Promise** 状态到底是 `fulfilled` 还是 `rejected`。


实例方法：

```js
promise.resolve()
```

作用：

1. 不带参数传递，返回一个新的状态为 `resolve` 的 **Promise** 对象
2. 参数是一个 **Promise** 实例，返回当前的 **promise** 实例

```js
promise.reject()
```

作用：

1. 返回的是一个值
2. 返回的值会传递到下一个 `then` 的 `resolve` 方法参数中

```js
promise.all()
```

1. 并行执行异步操作的能力
2. 所有异步操作执行完后才执行回调

```js
promise.race()
```

作用：

1. 哪个结果最先返回来的，最后就是那个结果，不管结果是成功还是失败





# async 和 await 是干什么的

async、await 是异步的终极解决方案

async/await 就是一个**自执行**的 *generator*  函数。利用 *generator*  函数的特性把异步的代码写成“同步”的形式。

**生成器函数**在执行时能暂停，后面又能从暂停处继续执行。

调用一个**生成器函数**并不会马上执行它里面的语句，而是返回一个这个生成器的 **迭代器** **（ iterator）对象**。当这个迭代器的 `next() `方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现`yield`的位置为止，`yield`后紧跟迭代器要返回的值。或者如果用的是 `yield*`)（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

**优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题。async 相比于 Generator内置了执行器，拥有更好的语义化** 

**缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。**





#  typeof 返回的数据类型

```js
//1.number
typeof(10);
typeof(NaN);//NaN在JavaScript中代表的是特殊非数字值,它本身是一个数字类型。
typeof(Infinity);
//2.boolean
typeof(true);
typeof(false);
//3.string
typeof("abc");
//4.undefined
typeof(undefined);
typeof(a);//不存在的变量
//5.object
//对象，数组，null返回object
typeof(null);
typeof(window);
//6.function
typeof(Array);
typeof(Date);
//7.symbol
typeof Symbol() // ES6提供的新的类型
```





# 返回 false 的情况有哪些

```js
''//空字符
0
NaN
underfind
null
false
```

还有表达式不成立的情况





# 对 this 的理解

**「`this` 是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。」**

`this` 指的是，**调用函数的那个对象(执行上下文)**。`this` 永远指向函数运行时所在的对象。

解析器在调用函数每次都会向函数内部传递进一个隐含的参数，这个隐含的参数就是 `this`。

根据函数的调用方式的不同，`this` 会指向不同的对象：

- 以函数的形式调用时，`this` 永远都是 **window**。比如：`fun()` 相当于  `window.fun()`

- 以方法的形式调用时，`this` 是调用方法的那个对象。

- 以构造函数的形式调用时，`this` 是新创建的那个对象。

- 使用 `call` 和 `apply` 调用时，`this` 是指定的那个对象。

需要特别提醒的是：`this` 的指向在函数定义时无法确认，只有函数执行时才能确定。

`this` 的几种场景：

- 作为「构造函数」执行
- 作为「对象的属性」执行
- 作为「普通函数」执行
- `call`、`apply`、`bind`





# new 操作符做了什么

1. 在创建一个新对象出来 (开辟一块新内存)
 2. `this` 指向这个新对象
 3. 执行构造函数的代码（给 `this` 添加属性）
 4. 会返回这个新对象





# 什么是深拷贝什么是浅拷贝

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

深拷贝是将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。



# 对闭包的理解？并能举出闭包的例子

闭包（closure）：指有权**访问**另一个函数作用域中**变量**的**函数**。

简单理解就是：如果**这个作用域可以访问另外一个函数内部的局部变量**，那就产生了闭包;而另外那个作用域所在的函数称之为**闭包函数**。

注意，这里强调的是访问**局部变量**。

闭包的形成条件: 至少两个函数，并且是嵌套关系。而且内部函数需要访问外部函数的局部变量。

闭包的作用：

1. 保护数据（私有变量）的安全
2. 持久化维持数据
3. 实现模块化

```js
function fn1() {
    let a = 20;
    function fn2() {
        console.log(a);
    }
    return fn2;
}
const foo = fn1(); // 执行 fn1() 之后，会得到一个返回值。foo 代表的就是 fn2 函数
foo();
```

一般来说，在 fn1 函数执行完毕后，它里面的变量 a 会立即销毁。

但此时由于产生了闭包，所以 **fn1 函数中的变量 a 不会立即销毁，因为 fn2 函数还要继续调用变量 a**。只有等所有函数把变量 a 调用完了，变量 a 才会销毁。





# 什么是原型和原型链?

JavaScript 只有一种结构：对象。

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（`prototype`）。

该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。

根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 `Object` 的实例。





# 什么是事件流

**事件流**
当一个 HTML 元素产生一个事件时，该事件会在元素节点与根结点之间的路径传播，路径所经过的结点都会收到该事件，这个传播过程可称为DOM事件流。

简单地说：事件流就是描述页面中接收事件的顺序。其包含三个阶段：

- 事件捕获：事件从 Document 节点自上而下向目标节点传播的阶段；
- 目标阶段：真正的目标节点正在处理事件的阶段；
- 事件冒泡：事件从目标节点自下而上向 Document 节点传播的阶段。

在整个事件流的任何位置通过调用事件对象的 `stopPropagation()` 方法可以停止事件的传播过程。

DOM 同时支持两种事件模型：

捕获型事件(事件句柄在捕获阶段执行) 和 冒泡型事件(事件句柄在冒泡阶段执行) 。现在主流的是冒泡事件。



# 防抖和节流

**防抖** （debounce）：防抖，顾名思义，防止抖动，以免把一次事件误认为多次，敲键盘就是一个每天都会接触到的防抖操作。

防抖适用场景：

1. 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
2. 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存

可以看出来**防抖重在清零 `clearTimeout(timer)`**

代码：

```js
/**
 * @param {Function} fn
 * @param {Number} wait
 * @return {Function}
 */
function debounce(fn, wait) {
    let timer;
    // 箭头函数始终指向上一层 this
    return (...args) => {
        // 使用闭包 timer持久化
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    };
}
```

**节流**（throttle）：节流，顾名思义，控制水的流量。控制事件发生的频率，如控制为1s发生一次，甚至1分钟发生一次。与服务端(server)及网关(gateway)控制的限流 (Rate Limit) 类似。

节流适用场景：

1. `scroll` 事件，每隔一秒计算一次位置信息等
2. 浏览器播放事件，每个一秒计算一次进度信息等
3. input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

可以看出来**节流重在加锁 `timer=timeout`**

代码：

```js
/**
 * @param {Function} fn
 * @param {Number} wait
 * @return {Function} 
 */
function throttle(fn, wait) {
    let timer;
    return (...args) => {
        if (timer) return;
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        },wait);
    };
}
```



# 深拷贝和浅拷贝

**浅拷贝:**

拷贝对象的一层属性，如果对象里面还有对象，拷贝的是地址，两者之间修改会有影响，适用于对象里面属性的值是简单数据类型的。

**深拷贝:**

拷贝对象的多层属性，如果对象里面还有对象，会继续拷贝并创建一个一摸一样的对象，不共享内存，修改新对象，旧对象保持不变。

## 深拷贝和浅拷贝的区别：

浅拷贝（shallow copy）：只复制指向某个对象的指针，而不复制对象本身，新旧对象共享一块内存；   

深拷贝（deep copy）：复制并创建一个一摸一样的对象，不共享内存，修改新对象，旧对象保持不变.

## 浅拷贝实现：

### 1、使用 `=` 赋值

```js
//浅拷贝: 
var obj = {
    class: 'UI',
    age: 20,
    love: 'eat',
};
function getObj(obj) {
    var newObj = {};
    for (var k in obj) {
        newObj[k] = obj[k];
    }
    return newObj;
}
var obj2 = getObj(obj);
console.log(obj2);
```

### 2、`Object.assign(target,...sources)`

> Object.assign是ES6的新函数。

Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

参数：

- target：目标对象。
- sources：任意多个源对象。
- 返回值：目标对象会被返回。

需要注意的是：
`Object.assign()`可以处理一层的深度拷贝，如下：

> 其实是简单类型存储的是具体的数值，本方法还是只拷贝了一层数据

```js
var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = Object.assign({}, obj1);
obj2.b = 100;
console.log(obj1);
// { a: 10, b: 20, c: 30 } <-- 沒被改到
console.log(obj2);
// { a: 10, b: 100, c: 30 }
```

## 深拷贝实现：

### 1、手动复制

> 笨、效率低下，某些情况下可以，如：临时需要、只需要一个副本，拷贝的对象属性不多

```js
var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
obj2.b = 100;
console.log(obj1);
// { a: 10, b: 20, c: 30 } <-- 沒被改到
console.log(obj2);
// { a: 10, b: 100, c: 30 }
```

## 2、JSON 做字符串转换

> 用`JSON.stringify()`把对象转成字符串，再用`JSON.parse()`把字符串转成新的对象。

```js
var obj1 = { body: { a: 10 } };
var obj2 = JSON.parse(JSON.stringify(obj1));
obj2.body.a = 20;
console.log(obj1);
// { body: { a: 10 } } <-- 沒被改到
console.log(obj2);
// { body: { a: 20 } }
console.log(obj1 === obj2);
// false
console.log(obj1.body === obj2.body);
// false
```

这样做是真正的Deep Copy，这种方法简单易用。

但是这种方法也有很多的缺点：

1. 它会抛弃对象的 `constructor`，深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成`Object`。
2. 只能正确处理 `Number`, `String` , `Boolean` , `Array` , 扁平对象，即那些能够被 JSON直接表示的数据结构。`RegExp` 对象是无法通过这种方式深拷贝，只有可以转成 JSON 格式的对象才可以这样用，像 `function`没办法转成 JSON

## 3、递归拷贝



```js
function deepClone(initalObj, finalObj={}) {    
  var obj = finalObj;    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
var str = {};
var obj = { a: {a: "hello", b: 21} };
deepClone(obj, str);
console.log(str.a);
```

## 4、使用`Object.create()`方法

直接使用`var newObj = Object.create(oldObj)`，可以达到深拷贝的效果。

## 5、jquery

> jquery 有提供一个$.extend可以用来做 Deep Copy。

## 6、第三方函数

> 还有一些其它的第三方函数库有深拷贝function，如lodash。



# get 和 post 的区别

- 后退按钮/刷新
  - GET 不会重新提交是无害
  - POST 数据会被重新提交
- 书签
  - GET请求 可以被收藏为书简
  - POST请求 不可以被收藏为书签
- 缓存
  - GET 请求能被缓存
  - POST 请求不能缓存
- 编码类型
  - GET 只支持application/x-www-form-urlencoded
  - POST 不光支持查询字符串的编码还支持 二进制数据 FormDate的编码
- 历史
  - GET 参数会被保存在浏览器历史中
  - POST 参数不会被保存在浏览器历史中
- 对数据长度限制
  -  GET方法向URL添加数据，URL长度是受限制的，为2048个字符
  -  POST没有限制
- 对数据类型限制
  - GET 只允许 ASCII 字符。
  - POST 没有限制，也允许二进制数据
- 安全性
  - GET安全性差 数据在URL可见
  - POST安全性比GET好

从标准上来看，GET 和 POST 的区别如下：

- GET 用于获取信息，是无副作用的，是幂等的，且可缓存
- POST 用于修改服务器上的数据，有副作用，非幂等，不可缓存

# HTTP 的状态码有哪些

常见的HTTP状态码:

- 200 - 请求成功
- 301 - 永久重定向
- 404 - 客户端请求的语法错误，服务器无法理解
- 500 - 服务器端在执行时发生错误，无法完成请求





# JSONP 的原理？以及优缺点

JSONP 的原理

由于同源策略不会阻止动态脚本的插入到文档中去

JSONP（即 json + padding）动态创建 script 标签利用 script 标签的 src 属性可以获取任何域下的 JS 脚本，通过这个特性服务器端不在返回 json 格式，而是返回一段调用某个函数的 JS 代码，在 src 中进行了调用，这样实现了跨域。

JSONP 优点:

由于JSONP对于老浏览器兼容性方面比较良好，因此，对于那些对IE8以下仍然需要支持的网站来说，仍然被广泛应用。不过，针对高级浏览器，建议还是用CORS 方法。


JSONP缺点:

1. 首先，它没有关于 JSONP 调用的错误处理，一旦回调函数调用失败，浏览器会以静默失败的方式处理。

2. 其次，它只支持 GET 请求，这是由于该技术本身的特性所决定的。因此，对于一些需要对安全性有要求的跨域请求，JSONP 的使用需要谨慎一点了。

3. JSONP 不支持用 `async:false` 的方法设置同步。

