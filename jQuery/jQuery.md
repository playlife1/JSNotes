# jQuery 的介绍

### 引入 jQuery 的原因

在用 js 写代码时，会遇到一些问题：

- window.onload 事件有事件覆盖的问题，因此只能写一个事件。

- 代码容错性差。

- 浏览器兼容性问题。

- 书写很繁琐，代码量多。

- 代码很乱，各个页面到处都是。

- 动画效果很难实现。

### 什么是 jQuery

jQuery 是 js 的一个库，封装了我们开发过程中常用的一些功能，方便我们调用，提高开发效率。

js库是把我们常用的功能放到一个单独的文件中，我们用的时候，直接引用到页面里即可。

### 学习jQuery，主要是学什么

初期，主要学习如何使用jQuery操作DOM，其实就是学习jQuery封装好的那些API。

这些API的共同特点是：几乎全都是方法。所以，在使用jQuery的API时，都是方法调用，也就是说要加小括号()，小括号里面是相应的参数，参数不同，功能不同。

> 使用、学习版本：jquery-1.12.4.js

## jQuery初体验

```js
//js原生写法
window.onload = function () {
    var btn = document.getElementsByTagName('button')[0];
    var divArr = document.getElementsByTagName('div');

    btn.onclick = function () {
        for (var i = 0; i < divArr.length; i++) {
            divArr[i].style.display = 'block';
            divArr[i].innerHTML = 'playlife';
        }
    };
};
//jQuery
$(document).ready(function () {
    //获取元素
    var jQbtn = $('button'); //根据标签名获取元素
    var jQdiv = $('div'); //根据标签名获取元素
    //绑定事件
    jQbtn.click(function () {
        jQdiv.show(1000); //显示盒子。
        jQdiv.html('tomorrow！'); //设置内容
        // 上面的两行可以写成链式编程：
        jQdiv.show(3000).html(1111);
    }); //事件是通过方法绑定的。
});
```

## 扩展：$(document).ready()方法和window.onload有什么区别？

1. `window.onload`方法是在网页中所有的元素(包括元素的所有关联文件)完全加载到浏览器后才执行的。

2. `$(document).ready()` 方法可以在DOM载入就绪时就对其进行操纵，并调用执行绑定的函数。

# jQuery 的两大特点

（1）**链式编程**：比如`.show()`和`.html()`可以连写成`.show().html()`。


链式编程原理：return this。

通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 this。


（2）**隐式迭代**：隐式 对应的是 显式。隐式迭代的意思是：在方法的内部会为匹配到的所有元素进行循环遍历，执行相应的方法；而不用我们再进行循环，简化我们的操作，方便我们调用。

如果获取的是多元素的值，大部分情况下返回的是第一个元素的值。



# jQuery 的使用

### 使用 jQuery 的基本步骤

（1）引包：主要，导包的代码一定要放在js代码的最上面。

（2）入口函数

（3）功能实现代码（事件处理）

### jQuery 的版本

jQuery 有两个大版本：

- 1.x版本：最新版为 v1.11.3。

- 2.x版本：最新版为 v2.1.4（不再支持IE6、7、8）。

- 3.x版本。


PS：开发版本一般用1.10以上。

`.js`和`.min.js`它们的区别是：

- 第一个是未压缩版，第二个是压缩版。

- 平时开发过程中，可以使用任意一个版本；但是，项目上线的时候，推荐使用压缩版。

# jQuery 的入口函数和 `$` 符号

## 入口函数（重要）

原生 js 的入口函数指的是：`window.onload = function() {};` 如下：

```js
//原生 js 的入口函数。页面上所有内容加载完毕，才执行。
//不仅要等文本加载完毕，而且要等图片也要加载完毕，才执行函数。
window.onload = function () {
    alert('playlife');
};
```

## 而 jQuery的入口函数，有以下几种写法：

### 写法一：

```js
//1.文档加载完毕，图片不加载的时候，就可以执行这个函数。
$(document).ready(function () {
    alert('playlife');
});
```

### 写法二：（写法一的简洁版）

```javascript
//2.文档加载完毕，图片不加载的时候，就可以执行这个函数。
$(function () {
    alert('playlife');
});
```

### 写法三：

```javascript
//3.文档加载完毕，图片也加载完毕的时候，在执行这个函数。
$(window).ready(function () {
    alert('playlife');
});       
```

### jQuery入口函数与js入口函数的区别：

#### 区别一：书写个数不同：

- Js 的入口函数只能出现一次，出现多次会存在事件覆盖的问题。

- jQuery 的入口函数，可以出现任意多次，并不存在事件覆盖问题。

#### 区别二：执行时机不同：

- Js的入口函数是在**所有的文件资源加载**完成后，才执行。这些**文件资源**包括：页面文档、外部的js文件、外部的css文件、图片等。

- jQuery的入口函数，是在文档加载完成后，就执行。文档加载完成指的是：DOM树加载完成后，就可以操作DOM了，不用等到所有的**外部资源**都加载完成。

文档加载的顺序：从上往下，边解析边执行。

### jQuery的`$`符号

jQuery 使用 `$` 符号原因：书写简洁、相对于其他字符与众不同、容易被记住。

jQuery占用了我们两个变量：`$` 和 jQuery。当我们在代码中打印它们俩的时候：

```html
<script src="jquery-1.11.1.js"></script>
<script>

    console.log($);
    console.log(jQuery);
    console.log($===jQuery);
</script>
<!--从打印结果可以看出，$ 代表的就是 jQuery。
那怎么理解jQuery里面的 $ 符号呢？-->
```

**`$` 实际上表示的是一个函数名** 如下：

```js
$(); // 调用上面我们自定义的函数$

$(document).ready(function(){}); // 调用入口函数

$(function(){}); // 调用入口函数

$('#btnShow') // 获取id属性为btnShow的元素

$('div') // 获取所有的div标签元素
```

# DOM对象 和 jQuery对象比较 

## 二者的区别

### 通过 jQuery 获取的元素是一个**数组**，数组中包含着原生JS中的DOM对象。举例：

针对下面这样一个div结构：

```html
<div></div>
<div class="box"></div>
<div id="box"></div>
<div class="box"></div>
<div></div>
```

通过原生 js 获取这些元素节点的方式是：

```javascript
var myBox = document.getElementById("box");           //通过 id 获取单个元素
var boxArr = document.getElementsByClassName("box");  //通过 class 获取的是数组
var divArr = document.getElementsByTagName("div");    //通过标签获取的是数组
```

通过 jQuery 获取这些元素节点的方式是：（获取的都是数组）

```javascript
//获取的是数组，里面包含着原生 JS 中的DOM对象。
var jqBox1 = $("#box");
var jqBox2 = $(".box");
var jqBox3 = $("div");
```

我们打印出来看看：

```
jQuery.fn.init [div#box]
jQuery.fn.init(2) [div.box, div.box, prevObject: jQuery.fn.init(1)]
jQuery.fn.init(5) [div, div.box, div#box, div.box, div, prevObject: jQuery.fn.init(1)]
```

由于JQuery 自带了 css()方法，我们还可以直接在代码中给 div 设置 css 属性。

**总结**：jQuery 就是把 DOM 对象重新包装了一下，让其具有了 jQuery 方法。

## 二者的相互转换

### 1、 DOM 对象 转为 jQuery对象：

```js
$(js对象);
```

```js
//转换。
jqBox1 = $(myBox);
jqBox2 = $(boxArr);
jqBox3 = $(divArr)
```

```js
jQuery.fn.init [div#box]
jQuery.fn.init(2) [div.box, div.box]
jQuery.fn.init(5) [div, div.box, div#box, div.box, div]
```

DOM 对象转换成了 jquery 对象之后，上面的功能可以直接调用。

### 2、jQuery对象 转为 DOM 对象：

	jquery对象[index];      //方式1（推荐）
	jquery对象.get(index);  //方式2
jQuery对象转换成了 DOM 对象之后，可以直接调用 DOM 提供的一些功能。如：

```javascript
//jquery对象转换成 DOM 对象之后
jqBox3[0].style.backgroundColor = "black";
jqBox3.get(4).style.backgroundColor = "pink";
```

**总结**：如果想要用哪种方式设置属性或方法，必须转换成该类型。



# jQuery 选择器

**CSS选择器**

| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
| `#id`     |ID选择器|   `#id{}`   |
| `.class`  |类选择器|   `.class{}`   |
| `Element` |  标签选择器    |  `p{}`    |
| `*`       |  通配符选择器    | `*{}`     |
| `,`       | 并集选择器     |  `div,p{}`    |
| ` 空格`       | 后代选择器     |  `div p{}`    |
| `>`       | 子代选择器     |   `div>p{}`   |
| `+`       |  相邻兄弟选择器    |  `div+p{}`    |

## jQuery 的基本选择器

| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
| `$('#id')`     |选择id为id的第一个元素|   `$('#id').css('background','red')`   |
| `$('.class')`     |选择所有类名为class的元素|  `$('.class').css('background','red')` |
| `$('div')`     |选择所有标签名为div的元素|  `$('div').css('background','red')` |
| `$('*')`     |选择所有元素(少用或配合其他选择器来使用)|  `$('*').css('background','red')` |
| `$('.class,div')`     |选择多个指定的元素|  `$('.class,div').css('background','red')` |

## jQuery 的层级选择器
| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
| ` 空格`       | 后代选择器选择所有的后代元素| `$('div span').css('background','red')`|
| `>`| 子代选择器选择所有的子代元素|  `$('div>span').css('background','red')`|
| `+`  | 紧邻选择器选择紧挨着的下一个元素|  `$('div+span').css('background','red')`    |
| `~`   | 兄弟选择器选择后面的所有兄弟元素|  `$('div~span').css('background','red')`    |

## jQuery 的基本过滤器
| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
|`:eq(index)`|index是从0开始的一个数字，选择序号为index的元素。选择第一个匹配的元素| `$('li:eq(1)').css('background','red')` |
|`:gt(index)`|index是从0开始的一个数字，选择序号大于index的元素。| `$('li:gt(2)').css('background','red')`|
|`:lt(index)`|index是从0开始的一个数字，选择序号小于index的元素。| `$('li:lt(2)').css('background','red')`|
|`:odd`|选择序号为奇数行的元素。| `$('li:odd').css('background','red')`|
|`:even`|选择序号为偶数行的元素。| `$('li:even').css('background','red')`|
|`:first`|选择匹配的第一个元素。| `$('li:first').css('background','red')`|
|`:last`|选择匹配的最后一个元素。| `$('li:last').css('background','red')`|

**补充 （更多查阅文档）：**

| 符号      | 说明 |
| --------- | ---- |
|`:animated` | 选中正在进行动画效果的元素 |
|`:button` | 选中所有按钮元素`<button>` `<input type='button'>` |
|`:checkbox` | 选中所有复选框元素|
|`:selected` | 选中`<select>`下拉菜单中被选中`<option>`的元素 |
|`:checked` |选中 `<input type="checkbox">` `<input type="radio">` 中被选购选的元素|


## jQuery 的属性选择器

| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
|`$('a[href]')`|选择包含`herf`属性的元素|`$('a[href]').css('background','red')`|
|`$("a[href='itcast']")`|选择`herf`属性值为itcast的所有a标签|`$("a[href='itcast']").css('background','red')`|
|`$("a[href!='baidu']")`|选择`herf`属性值不等于baidu的所有元素，包括没有herf的元素|`$("a[href!='baidu']").css('background','red')`|
|`$("a[href^='web']")`|选择所有以web开头的元素|`$("a[href^='web']").css('background','red')`|
|`$("a[href$='cn']")`|选择所有以cn结尾的元素|`$("a[href$='cn']").css('background','red')`|
|`$("a[href*='i']")`|选择所有包含i这个字符的元素，可以是中英文|`$("a[href*='i']").css('background','red')`|
|`$("a[href][title='我']")`|选择所有符合指定属性规则的元素，都符合才会被选中|`$("a[href][title='我']").css('background','red')`|

## jQuery 的筛选选择器
| 符号      | 说明 | 用法 |
| --------- | ---- | ---- |
|`find(selector)`|查找指定元素的所有后代元素（包含子子孙孙）|`$('#j_wrap').find('li').css('background','red')` 选择id为`j_wrap`的所有后代元素|
|`children(selector)`|查找指定元素的直接子元素（亲儿子）|`$('#j_wrap').children('ul').css('background','red')` 选择id为`j_wrap` 的所有子代元素ul|
|`siblings(selector)`|查找所有兄弟元素（不包括自己）|`$('#j_liItem').siblings().css('background','red')` 选择id为`j_liItem` 的所有兄弟元素|
|`parent([selector])`|查找直接(亲)父元素|`$('#j_liItem').parent('ul').css('background','red')` 选择id为`j_liItem` 的父元素|
|`eq(index)`|查找指定元素的第index个元素，index是索引号，从0开始|`$('li').eq(2).css('color','red')` 选择所有li元素中的第二个|



# jQuery 动画

## 显示动画

```js
//方式一
$('div').show();
//解释：无参数，表示让指定的元素直接显示出来。其实这个方法的底层就是通过display: block;实现的。

//方式二
$('div').show(2000);
//解释：通过控制元素的宽高、透明度、display属性，逐渐显示，2秒后显示完毕。

//方式三
/**参数：
*slow 慢：600ms
*normal 正常：400ms
*fast 快：200ms
*/
$('div').show('slow');
//解释：和方式二类似，也是通过控制元素的宽高、透明度、display属性，逐渐显示。

//方式四
$('div').show(5000,callback);
//解释：动画执行完后，立即执行回调函数。
```

**总结：**

上面的四种方式几乎一致：参数可以有两个，第一个是动画的执行时长，第二个是动画结束后执行的回调函数。

## 隐藏动画

方式参照上面的show()方法的方式。如下：

```js
$(selector).hide();

$(selector).hide(1000);

$(selector).hide("slow");

$(selector).hide(1000, function(){});
```

**显示和隐藏的来回切换：**

显示和隐藏的来回切换采用的是toggle()方法：就是先执行show()，再执行hide()。

```js
$(selector).toggle();
$(selector).toggle(1000);
$(selector).toggle('slow');
$(selector).toggle(1000,callback);
```

## 滑入和滑出

#### 1、滑入动画效果：（类似于生活中的卷帘门）

```js
$(selector).slideDown(speed, callback);
```

解释：下拉动画，显示元素。

注意：省略参数或者传入不合法的字符串，那么则使用默认值：400毫秒（同样适用于fadeIn/slideDown/slideUp）

#### 2、滑出动画效果： 

```js
$(selector).slideUp(speed,callback);
```

#### 3、滑入滑出切换动画效果：

```js
$(selector).slideToggle(speed,callback);
```

**参数解释同show()**

## 淡入淡出动画

#### 1、淡入动画效果

```js
$(selector).fadeIn(speed, callback);
//作用：让元素以淡淡的进入视线的方式展示出来。
```

作用：让元素以淡淡的进入视线的方式展示出来。

#### 2、淡出动画效果

```js
$(selector).fadeOut(1000);
//作用：让元素以渐渐消失的方式隐藏起来
```

作用：让元素以渐渐消失的方式隐藏起来

#### 3、淡入淡出切换动画效果

```js
$(selector).fadeToggle('fast', callback);
//作用：通过改变透明度，切换匹配元素的显示或隐藏状态。
```

作用：通过改变透明度，切换匹配元素的显示或隐藏状态。

**参数的含义同show()方法。**

## 自定义动画

```js
$(selector).animate({params}, speed, callback);
```

作用：执行一组CSS属性的自定义动画。

- 第一个参数表示：要执行动画的CSS属性（必选）

- 第二个参数表示：执行动画时长（可选）

- 第三个参数表示：动画执行完后，立即执行的回调函数（可选）

## 停止动画

```
$(selector).stop(true,false)
```

**里面的两个参数，有不同的含义。**

第一个参数clearQueue：

- true：后续动画不执行。

- false：后续动画会执行。

第二个参数jumpToEnd：

- true：立即执行完成当前动画。

- false：立即停止当前动画。

PS：参数如果都不写，默认两个都是false。实际工作中，直接写stop()用的多。

### stop方法的总结

当调用stop()方法后，队列里面的下一个动画将会立即开始。
但是，如果参数clearQueue被设置为true，那么队列面剩余的动画就被删除了，并且永远也不会执行。

如果参数jumpToEnd被设置为true，那么当前动画会停止，但是参与动画的每一个CSS属性将被立即设置为它们的目标值。比如：slideUp()方法，那么元素会立即隐藏掉。如果存在回调函数，那么回调函数也会立即执行。

注意：如果元素动画还没有执行完，此时调用stop()方法，那么动画将会停止。并且动画没有执行完成，那么回调函数也不会被执行。



# jQuery 操作 Dom

- 样式和类操作
- 节点操作

# jQuery 样式操作和类操作

## 样式操作

### 1、设置样式	

```js
//设置单个样式：  css(属性，值);
$('div').css('background-color', 'red');
//设置多个样式：  css(json);
$('div').css({ width: 100, height: 100, 'background-color': 'pink' });
```

### 2、获取样式：

```js
//获取样式：css(属性);
//获取的时候如果有很多个，那么获取jquery对象中的第一个
alert($('div').css('width'));
```

### 类操作（className）

#### 1、添加类样式 addClass

```jsj s
$(selector).addClass('liItem'); //为指定元素添加类className
```

==注意：此处类名不带点，所有类操作的方法类名都不带点。==

#### 2、移除类样式 removeClass

```js
$(selector).removeClass('liItem'); //为指定元素移除类 className
$(selector).removeClass(); //不指定参数，表示移除被选中元素的所有类
```

#### 3、判断有没有类样式 hasClass

```js
$(selector).hasClass('liItem'); //判断指定元素是否包含类 className
```

此时，会返回true或false。jquery对象中，==只要有一个==带有指定类名的就是==true==，所有都不带才是false。

#### 4、切换类样式 toggleClass

```js
$(selector).toggleClass(“liItem”);    
//为指定元素切换类 className，该元素有类则移除，没有指定类则添加。
```

**解释：为指定元素切换类 className，该元素有类则移除，没有指定类则添加。**

### 样式操作和类操作的比较

- 操作的样式非常少，那么可以通过`.css()`实现。

- 操作的样式很多，建议通过使用类 class 的方式来操作。

- 如果考虑以后维护方便（把CSS从js中分离出来）的话，推荐使用类的方式来操作。

# jQuery 节点操作

## 动态创建元素 推荐html()

原生 js 有三种动态创建元素的方式。

```js
//不常用，因为容易覆盖原来的页面。
document.write(); 
//用的比较多。绑定属性和内容比较方便。(节点套节点)
innerHTML = (); 
//用得也比较多，指定数量的时候一般用它。
document.createElement(); 
```

这里我们学一下 jQuery 动态创建元素。**注意，创建的是  jQuery 对象**。

#### 方式一

```js
// 返回的是 jQuery对象
var $spanNode1 = $('<span>我是一个span元素</span>'); 
```

#### 方式二（推荐）

```js
var node = $('#box').html('<li>我是li</li>');
```

此方法类似于 原生 js 中的`innerHTML`。

## 添加元素 append

jQuery 添加元素的方法非常多，最重要的方法是`append()`。格式如下：

```js
// 方式一：在$(selector)中追加$node
$(selector).append($node); //参数是 jQuery对象

// 方式二：在$(selector)中追加div元素，
$(selector).append('<div></div>'); //参数是 htmlString
```

作用：在被选元素内部的最后一个子元素（或内容）后面插入内容（存在或者创建出来的元素都可以）。


通俗的解释：**在盒子里的最末尾添加元素**。

- 如果是页面中存在的元素，那调用append()后，会把这个元素放到相应的目标元素里面去；但是，原来的这个元素，就不存在了。

- 如果是给多个目标追加元素，那么方法的内部会复制多份这个元素，然后追加到多个目标里面去。

## 其他的添加元素的方法

### 方法2 appendTo

```js
$(selector).appendTo(node);
```

作用：同append()，只不过是反着写的。

### 方法3 prepend

```js
$(selector).prepend(node);
```

作用：在元素的第一个子元素前面追加内容或节点。

### 方法4 after

```
$(selector).after(node);
```

作用：在被选元素之后，作为**兄弟元素**插入内容或节点。

### 方法5 before

```
$(selector).before(node);
```

作用：在被选元素之前，作为**兄弟元素**插入内容或节点。

## 清空元素 推荐html("")

### 方式一：没有参数

```
$(selector).empty();
```

```js
$(selector).html("");//推荐
```

解释：清空指定元素的所有子元素（光杆司令）。

### 方式二：

```js
$(selector).remove();
```

解释：“自杀” 。把自己以及所有的内部元素从文档中删除掉。

## 复制元素

```js
复制的新元素 = $(selector).clone();
//解释：复制$(selector)这个元素。是深层复制。
```

**解释：复制$(selector)这个元素。是深层复制。**

### 总结

推荐使用 `html("<span></span>")` 方法来创建元素或者 `html("")` 清空元素。



# jQuery 设置和获取属性

> jQuery 无法直接操作节点的属性和src等，我们需要借助attr()方法。

## 属性操作

### 1、设置属性

```js
$(selector).attr("title", "playlife");
//参数解释：第一个参数表示：要设置的属性名称。第二个参数表示：该属性名称对应的值。
```

参数解释：第一个参数表示：要设置的属性名称。第二个参数表示：该属性名称对应的值。

### 2、获取属性

```js
$(selector).attr("title");
```

参数为：要获取的属性的名称，返回指定属性对应的值。

**总结**：两个参数是给属性赋值，单个参数是获取属性值。

### 3、移除属性

```js
$(selector).removeAttr("title");
```

参数为：要移除的属性的名称。

### 4、form表单中的 prop()方法

针对`checked、selected、disabled`属性，要使用 `prop()`方法，而不是其他的方法。

prop方法通常用来影响DOM元素的动态状态，而不是改变的HTML属性。例如：input和button的disabled特性，以及checkbox的checked特性。

```js
jqinp2.prop("checked", true);
```

### val()方法和 text()方法

```js
$(selector).val();
//作用：设置或返回 form 表单元素的value值，例如：input、select、textarea 的值。
```

```js
$(selector).text();
//作用：设置或获取匹配元素的文本内容。不带参数表示，会把所有匹配到的元素内容拼接为一个字符串，不同于其他获取操作
$(selector).text("我是内容");
//作用：设置的内容包含html标签，那么text()方法会把他们当作**纯文本**内容输出。
```

**总结：**

- text() 不识别标签。

- html() 识别标签。

# jQuery 设置宽度和高度

## 高度操作

```js
$(selector).height();     //不带参数表示获取高度
$(selector).height(200);  //带参数表示设置高度
```

## 宽度操作

```js
$(selector).width();     //不带参数表示获取宽度
$(selector).width(200);  //带参数表示设置高宽度
```

## **问题**：jQuery的css()获取高度，和jQuery的height获取高度，二者的区别？

```js
$("div").css();     //返回的是string类型，例如：30px
$("div").height();  //返回得失number类型，例如：30。常用于数学计算。
```
如上方代码所示，`$("div").height();`返回的是number类型，常用于数学计算



# jQuery 的坐标操作

## offset()方法

```js
//无参数：表示获取。返回值为：{left:num, top:num}。
//返回值是相对于document的位置。
$(selector).offset();

//有参数：表示设置。参数建议使用 number 数值类型。
$(selector).offset({left:100, top: 150});

//注意：设置offset后，如果元素没有定位(默认值：static)，则被修改为relative
```

作用：获取或设置元素相对于 document 文档的位置。参数解释：

- 无参数：表示获取。返回值为：{left:num, top:num}。返回值是相对于document的位置。

- 有参数：表示设置。参数建议使用 number 数值类型。

**注意：设置offset后，如果元素没有定位(默认值：static)，则被修改为relative。**

## position()方法 只能获取，不能设置

```js
$(selector).position();
```

作用：获取相对于其最近的**带有定位**的父元素的位置。返回值为对象：`{left:num, top:num}`。

注意：只能获取，不能设置。

## scrollTop()方法

```js
scrollTop();
$(selector).scrollTop(100);
```

作用：获取或者设置元素被卷去的头部的距离。参数解释：

- 无参数：表示获取偏移。
- 有参数：表示设置偏移，参数为数值类型。

```js
//缓慢回到页面顶部
$('html,body').animate({
  scrollTop:0;
},speed)；
//瞬间回到页面顶部
$(window).scrollTop(0);
```



## scrollLeft()方法

```js
scrollLeft();
$(selector).scrollLeft(100);
```

作用：获取或者设置元素水平方向滚动的位置。参数解释：

- 无参数：表示获取偏移。

- 有参数：表示设置偏移，参数为数值类型。

# jQuery 的事件机制

## 常见的事件绑定

| 写法                | 说明                                         |
| ------------------- | -------------------------------------------- |
| click(handler)      | 单击事件                                     |
| blur(handler)       | 失去焦点事件                                 |
| mouseenter(handler) | 鼠标进入事件                                 |
| mouseleave(handler) | 鼠标离开事件                                 |
| dbclick(handler)    | 双击事件                                     |
| change(handler)     | 改变事件，如：文本框值改变，下拉列表值改变等 |
| focus(handler)      | 获得焦点事件                                 |
| keydown(handler)      | 键盘按下事件                                 |
|submit(handler)|表单提交事件, 使用前需要 `event.preventDefault();` 阻止默认事件|

### 无法动态绑定

`.click()`方式不能给动态生成的元素绑定，无法事件委托

> 动态生成的元素无法直接绑定事件，需要给其父元素添加事件委托

## on()方式绑定事件

最早采用的是 bind、delegate等方式绑定的。jQuery 1.7版本后，jQuery用on统一了所有的事件处理的方法，此方法兼容zepto(移动端类似于jQuery的一个库)。

> 使用on()实现事件委托，给动态生成的元素的父元素绑定事件。

格式举例

```js
$(document).on('click mouseenter', '.box', { name: 111 }, function (event) {
    console.log(event.data); //event.data获取的就是第三个参数这个json。
    console.log(event.data.name); //event.data.name获取的是name的值。
});
```

```js
.on( events [, selector ] [, data ], handler )
.on( events [, selector ] [, data ] )
```

参数解释：

- 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）。上方代码绑定的是单击事件和鼠标进入事件。

- 第二个参数：selector, 执行事件的后代元素。
- 第三个参数：data，传递给事件处理函数的数据，事件触发的时候通过event.data来使用（也就是说，可以通过event拿到data）
- 第四个参数：handler，事件处理函数。

简单写法：

```js
$(document).on('click', '.box', function () {
    alert('talk is cheap show your code');
});
```

## off()方式解绑事件

```js
$(selector).off(); // 解绑匹配元素的所有事件
$(selector).off('click'); // 解绑匹配元素的所有click事件
$(selector).off('click', '**'); // 解绑所有代理的click事件，元素本身的事件不会被解绑
```

```js
.off( events [, selector ] [, handler ] )
.off( events [, selector ] )
.off( event )
.off()
```



## 事件触发

```js
$(selector).click(); //触发 click事件
$(selector).trigger("click");
```

```
.trigger( eventType [, extraParameters ] )
.trigger( event [, extraParameters ] )
```



# jQuery 的事件对象

|事件对象属性方法|说明|
| ---- | ---- |
|event.data|传递给事件处理程序的额外数据|
|event.currentTarget|等同于this，当前DOM对象|
|event.pageX|鼠标相对于文档左部边缘的位置|
|event.target|触发事件源，不一定===this|
|event.stopPropagation();|阻止事件冒泡|
|event.preventDefault();|阻止默认行为|
|event.type|事件类型：click，dbclick…|
|event.which|鼠标的按键类型：左1 中2 右3|
|event.keyCode|键盘按键代码|

# jQuery 的两大特点

## 1、链式编程

比如`.show()`和`.html()`可以连写成`.show().html()`。

**链式编程原理**：return this。

通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 this。

```js
end(); // 结束当前链最近的一次过滤操作，并且返回匹配元素之前的状态。
```

> 等价于 prevObject属性，返回上一次调用方法的对象，和end()方法等价

## 2、隐式迭代

**隐式** 对应的是 **显式**。

**隐式迭代的意思是：**

在方法的内部会为匹配到的所有元素进行循环遍历，执行相应的方法；而不用我们再进行循环，简化我们的操作，方便我们调用。

如果获取的是多元素的值，大部分情况下返回的是**第一个元素的值**。



# 显示迭代each()的用法

大部分情况下是不需要使用each方法的，因为jQuery的隐式迭代特性。但是，如果要**对每个元素做不同的处理**，这时候就用到了each方法。

格式：

```js
//index 参数一：表示当前元素在所有匹配元素中的索引号
//element 参数二：参数二表示当前元素（是js 中的DOM对象，而不是jQuery对象）
$(selector).each(function(index,element){});
```

参数解释：

- 参数一：表示当前元素在所有匹配元素中的索引号
- 参数二：参数二表示当前元素（是js 中的DOM对象，而不是jQuery对象）

demo:

```html
<body>
        <ul>
            <li class="aaa1">1</li>
            <li class="aaa2">2</li>
            <li class="aaa3">3</li>
            <li class="aaa4">4</li>
            <li class="aaa5">5</li>
            <li class="aaa6">6</li>
            <li class="aaa7">7</li>
            <li class="aaa8">8</li>
            <li class="aaa9">9</li>
            <li class="aaa10">10</li>
        </ul>
        <script src="../lib/jquery-1.12.4.min.js"></script>
        <script>
            jQuery(function () {
                //设置每个不一样的盒子透明度逐渐递增
                $('ul li').each(function (index, element) {
                    $(element).css('opacity', (index + 1) / 10);
                    console.log(index + '---' + element.tagName);
                });
            });
        </script>
    </body>
```



# 多库共存

**多库共存**指的是：jQuery占用了 `$` 和 `jQuery` 这两个变量。当在同一个页面中引用了 jQuery 库以及其他的库（或者其他版本的jQuery库），恰好其他的库中也用到了 `$` 或者`jQuery`变量.那么，要保证每个库都能正常使用，就产生了多库共存的问题。

温馨提示：我们可以通过以下方式获取 jQuery 库的版本号。

```js
console.log($.fn.jquery);  //打印 jQuery 库的版本号
```

**办法一**：让 jQuery 放弃对 `$` 的使用权：

```js
$.noConflict();
```

**办法二**：同时放弃放弃两个符号的使用权，并定义一个新的使用权（如果有三个库时，可以这样用）

```js
$.noConflict(true);   //返回值是新的关键字
```

# jQuery 的插件机制

jQuery 库，虽然功能强大，但也不是面面俱到。jQuery 是通过插件的方式，来扩展它的功能：

- 当你需要某个插件的时候，你可以“安装”到jQuery上面，然后使用。
- 当你不再需要这个插件，那你就可以从jQuery上“卸载”它。

==插件放在jQuery之后引入==

## 插件之改变颜色

jQuery的自定义动画方法animate()，在执行动画时，是==不支持设置背景色==这个属性的。这个时候可以借助`jQuery.color.js`这个插件。

## 插件之懒加载 lazyload

懒加载：当打开一个网页时，只有当我看到某个部分，再加载那个部分；而不是一下子全部加载完毕。这样可以优化打开的速度。

比如说，我可以设置一张图片为懒加载，于是，这张图片会等我宠幸到它的时候，它再打开。



# Zepto (移动端库)

### 什么是 Zepto

zepto是轻量级的JavaScript库，专门为移动端定制的框架。

与jquery有着类似的API，俗称：会jquery就会用zepto

### zepto的特点

- 针对移动端

- 轻量级，压缩版本只有8kb左右

- 响应，执行快

- 语法、API大部分同jquery一样，学习难度低，上手快。

- 目前API完善的框架中体积最小的一个

## Zepto 与 jQuery 的前世今生

### 相同点

- 都是优秀的js函数库

- 语法、API大部分都一样（zepto是按照jquery的思路来设计的）

- Zepto 相当于 jQuery 的子集

- 同jQuery一样，都是以`$`符号为核心函数。

### 不同点

## Zepto 和 jQuery 相同的  api


###  jQuery 的主要特性

下面来讲一下 jQuery 的主要特性（jQuery 的核心函数`$`、jQuery 对象），它们对 Zepto 来说，同样适用。

**1、jQuery 的核心函数`$`**:

作为函数使用（参数）：

-  function

-  html字符串

-  DOM code

-  选择器字符串

作为对象调用(方法)：

- `$.ajax()` `$.get()` `$.post()`

- `$.isArray()` `$.each()` `$.isFunction()` `$.trim()`

**2、jQuery 对象**：

概念：jquery核心函数$()调用返回的对象就是jquery对象的数组（可能有只有一个）。

使用列举：

- addClass()
- removeClass()
- show()
- find()

# jQuery form方法

## serialize()

只能收集到文本信息,并不能收集到文件信息

`$('form')$.serialize()` 可以将表单中带有name属性元素的值收集到, 以查询==字符串==的格式

```js
$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  console.log( $( this ).serialize() );
});
```

可以配合`.ajax()` 方法使用,配置请求体数据

## serializeArray()

`.serializeArray()` 方法通过序列化表单值来创建对象（name 和 value）的==数组==。

> 此方法返回的是 JSON 对象而非 JSON 字符串。需要使用插件或者第三方库进行字符串化操作。

您可以选择一个或多个表单元素（比如 input 及/或 textarea），或者 form 元素本身。

```js
$( "form" ).submit(function( event ) {
  console.log( $( this ).serializeArray() );
  event.preventDefault();
});
```

```js
//打印结果
[
  {
    name: "a",
    value: "1"
  },
  {
    name: "b",
    value: "2"
  },
  {
    name: "c",
    value: "3"
  },
  {
    name: "d",
    value: "4"
  },
  {
    name: "e",
    value: "5"
  }
]
```

# jQuery 使用 Ajax

> jQuery 库支持完整的 Ajax 操作。这里所包含的所有函数和方法用于从服务端加载数据，并且不会导致页面刷新。

jQuery 发送的所有 Ajax 请求，内部都会通过调用 `$.ajax()` 函数来实现。通常没有必要直接调用这个函数，可以使用几个已经封装的简便方法，如`$.get()`和`.load()`。如果你需要用到那些不常见的选项，那么， `$.ajax()`使用起来更灵活。

```js
$.ajax({
        url:'',//请求地址
  			dataType:'JOSN',//预期服务器返回值,遇到后端不给返回JOSN数据时可以设置,jQuery可以自动转换
        // Intelligent Guess (xml, json, script, or html))
  			data:'name=playlife&age=23',//发送的数据
  			//data:内可以放字符串也可以放对象
        type:'GET',//请求的方式
        success:function (res) {},// 请求成功执行的方法 res为返回信息
        beforeSend:function (argument) {},// 在发送请求之前调用,可以做一些验证之类的处理
        error:function (info) {console.log(argument);},//请求失败调用 info返回错误信息
 			 	complete:function (argument) {},//再完成Ajax操作后执行,无论成功还是失败
})
```

参数表:

| 名称                         | 值/描述                                                      |
| :--------------------------- | :----------------------------------------------------------- |
| async                        | 布尔值，表示请求是否异步处理。默认是 true。                  |
| beforeSend(*xhr*)            | 发送请求前运行的函数。                                       |
| cache                        | 布尔值，表示浏览器是否缓存被请求页面。默认是 true。          |
| complete(*xhr,status*)       | 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。 |
| contentType                  | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。 |
| context                      | 为所有 AJAX 相关的回调函数规定 "this" 值。                   |
| data                         | 规定要发送到服务器的数据。                                   |
| dataFilter(*data*,*type*)    | 用于处理 XMLHttpRequest 原始响应数据的函数。                 |
| dataType                     | 预期的服务器响应的数据类型。                                 |
| error(*xhr,status,error*)    | 如果请求失败要运行的函数。                                   |
| global                       | 布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。 |
| ifModified                   | 布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。 |
| jsonp                        | 在一个 jsonp 中重写回调函数的字符串。                        |
| jsonpCallback                | 在一个 jsonp 中规定回调函数的名称。                          |
| password                     | 规定在 HTTP 访问认证请求中使用的密码。                       |
| processData                  | 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。 |
| scriptCharset                | 规定请求的字符集。                                           |
| success(*result,status,xhr*) | 当请求成功时运行的函数。                                     |
| timeout                      | 设置本地的请求超时时间（以毫秒计）。                         |
| traditional                  | 布尔值，规定是否使用参数序列化的传统样式。                   |
| type                         | 规定请求的类型（GET 或 POST）。                              |
| url                          | 规定发送请求的 URL。默认是当前页面。                         |
| username                     | 规定在 HTTP 访问认证请求中使用的用户名。                     |
| xhr                          | 用于创建 XMLHttpRequest 对象的函数。                         |



## jQuery load() 方法

`.load( url [, data ] [, complete ] )`

jQuery load() 方法是简单但强大的 AJAX 方法。

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

```js
//必需的 URL 参数规定您希望加载的 URL。
//可选的 [,data] 参数规定与请求一同发送的查询字符串键/值对集合。
//可选的 [,complete] 参数是 load() 方法完成后所执行的函数名称。
$(selector).load(URL,data,complete);
```

可选的 complete 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：

- *responseTxt* - 包含调用成功时的结果内容
- *statusTXT* - 包含调用的状态
- *xhr* - 包含 XMLHttpRequest 对象

## jQuery - AJAX get()  方法

> `jQuery.get()`用于通过 HTTP GET 请求从服务器请求数据。

`jQuery.get( url [, data ] [, success ] [, dataType ] )`

```js
//必需的 URL 参数规定您希望请求的 URL。
//可选的 [,success] 参数是请求成功后所执行的函数名。
$.get(URL,success);
```

`[,data]` 为请求体要发送的数据, get请求 请求体一般为空, 要发送的数据一般为*查询字符串* 拼接在URL后面

`[,dataType]` Default: Intelligent Guess (xml, json, script, text, html). 预期返回的数据类型

遇到后端不给返回JOSN数据时可以设置,jQuery可以自动转换

## jQuery - AJAX post() 方法

> `$.post()` 方法通过 HTTP POST 请求从服务器上请求数据。

`jQuery.post( url [, data ] [, success ] [, dataType ] )`

```js
//必需的 URL 参数规定您希望请求的 URL。
//可选的 [,data] 参数规定连同请求发送的数据。
//可选的 [,success] 参数是请求成功后所执行的函数名。
$.post(URL,data,success);
```

可选的 success 参数规定当 post()方法请求成功后所调用的回掉函数 回掉函数有三个参数

- 第一个回调参数存有被请求页面的内容
- 第二个参数存有请求的状态
- 第三个参数包含XMLHttpRequest 对象

## jQuery - AJAX ajaxPrefilter() 方法

> 在每个请求之前被发送和`$.ajax()`处理它们前处理，设置自定义Ajax选项或修改现有选项。

```js
jQuery.ajaxPrefilter( [dataTypes ], handler(options, originalOptions, jqXHR) )
```

- `options` 是请求的选项
- `originalOptions` 值作为提供给Ajax方法未经修改的选项，因此，没有`ajaxSettings`设置中的默认值
- `jqXHR` 是请求的jqXHR对象



# jQuery deferred 延迟对象

## deferred.done() 方法

当延迟成功时调用一个函数或者数组函数.

> 该参数可以是一个函数或一个函数的数组。当延迟成功时，doneCallbacks被调用。回调执行是依照他们添加的顺序。一旦deferred.done()返回延迟对象，延迟对象的其它方法也可以链接到了这里，包括增加.done()方法。当延迟解决，doneCallbacks执行使用参数提供给resolve或resolveWith方法依照添加的顺序调用。有关详细信息，请参阅[Deferred object](http://api.jquery.com/category/deferred-object/) 。

`deferred.done( doneCallbacks [, doneCallbacks ] )`

Example: *一旦`jQuery.get` 方法返回一个来自延迟的对象的jqXHR对象，我们可以附加一个成功回调使用`.done()` 方法。*

```js
$.get("test.php").done(function() {  alert("$.get succeeded");});
```

# jQuery 对于 JSONP 的封装

```javascript
// 使用起来相当的简单，跟普通的get请求没有任何的区别，只需要把dataType指定成jsonp即可。
$.ajax({
  type: "get",
  url: "http://www.api.com/testjs.php",
  dataType: "jsonp",
  data: {
    uname: "hucc",
    upass: "123456",
  },
  success: function(info) {
    console.log(info);
  },
});
```

