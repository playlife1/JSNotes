# BOM

**BOM**：浏览器对象模型（Browser Object Model），操作**浏览器部分功能**的API。比如让浏览器自动滚动。

**BOM的结构图**

![20180201_2052](file:///Users/johnny/Downloads/md/knowledge/media/20180201_2052.png?lastModify=1598487833)

从上图也可以看出：

- **window对象是BOM的顶层(核心)对象**，所有对象都是通过它延伸出来的，也可以称为window的子对象。
- DOM是BOM的一部分。

**window对象：**

- **window对象是JavaScript中的顶级对象**。
- 全局变量、自定义函数也是window对象的属性和方法。
- window对象下的属性和方法调用时，可以省略window。

# 常见的 BOM 内置方法

## 弹出系统对话框

比如说，`alert(1)`是`window.alert(1)`的简写，因为它是window的子方法。

系统对话框有三种：

```javascript
//不同浏览器中的外观是不一样的
//兼容不好
confirm();
//不推荐使用，用户可以输入数据
prompt();	
```

## 打开窗口、关闭窗口

### 1. 打开窗口：window.open()

```js
/**参数解释：
url：要打开的地址。
target：新窗口的位置。可以是：_blank 、_self、 _parent 父框架。
param：新窗口的一些设置。
返回值：新窗口的句柄。
*/
window.open(url,target,param);
```

**param example:**

```js
//举例1： window.open("http://www.jx.com","_blank");
var json = {
    name: 'helloworld',//新窗口的名称，可以为空
 		//features:'',//属性控制字符串，在此控制窗口的各种属性，属性之间以逗号隔开
    fullscreen: 'no',//是否全屏，默认no {yes/no/1/0}
    location: 'no',//是否显示地址栏，默认no （有的浏览器不一定支持）
  	toolbar:'yes',//是否显示工具条，默认no {yes/no/1/0}
    width: '100px',//窗口宽度（像素单位）
    height: '100px',//窗口高度（像素单位）
    top: '100px',//窗口离屏幕顶部距离（像素单位）
    left: '100px',//窗口高度（像素单位）
    directories: 'yes',//是否显示转向按钮，默认no {yes/no/1/0}
    status: 'yes',//是否显示窗口状态条，默认no {yes/no/1/0}
    channelmode: 'yes',//是否显示频道栏，默认no {yes/no/1/0}
    menubar: 'yes',//是否显示菜单，默认no {yes/no/1/0}
 		scrollbars:'no', //是否显示滚动条，默认yes {yes/no/1/0}
  	resizable:'yes', //是否窗口可调整大小，默认no {yes/no/1/0}
};
window.open('http://www.baidu.com', '_blank', json); 
```

### 2. 关闭窗口：window.close()

```js
 window.close();//关闭本页面
```

### 3、新窗口相关：

- 新窗口.moveTo(5,5)

- 新窗口.moveBy()

- 新窗口.resizeTo()

- window.resizeBy()

```js
var newWin = window.open('http://www.baidu.com', '_blank', json); 
newWin.moveTo(500, 500);//移动到x轴500，y轴500坐标处
newWin.moveBy(10,-10);//向右移动10，想上移动10
newWin.resizeTo(width, height);//改变大小
newWin.resizeTo(width, height)://宽度增加/见识，高度增加/减少
```

# 常见的 BOM 对象

> BOM可以让我们通过JS来操作浏览器。BOM中为我们提供了一些对象，来完成对浏览器相关的操作。

常见的 BOM对象有：

- Window：代表整个浏览器的窗口，同时 window 也是网页中的全局对象。

- Navigator：代表当前浏览器的信息，通过该对象可以识别不同的浏览器。

- Location：代表当前浏览器的地址栏信息，通过 Location 可以获取地址栏信息，或者操作浏览器跳转页面。

- History：代表浏览器的历史记录，通过该对象可以操作浏览器的历史记录。由于隐私原因，该对象不能获取到具体的历史记录，只能操作浏览器向前或向后翻页，而且该操作只在当次访问时有效。

- Screen：代表用户的屏幕信息，通过该对象可以获取用户的显示器的相关信息。

备注：这些 BOM 对象都是作为 window 对象的属性保存的，可以通过window对象来使用，也可以直接使用。比如说，我可以使用 `window.location.href`，也可以直接使用 `location.href`，二者是等价的。

备注2：不要忘了，之前学习过的`document`也是在`window`中保存的。

- `window.onresize`事件指的是：在窗口或框架被调整大小时发生。各个事件的解释如下：

- `window.onscroll`   屏幕滑动

- `window.onresize`  浏览器大小变化

- `window.onload`页面加载完毕

  

## Navigator 和 navigator.userAgent

> Navigator代表当前浏览器的信息，通过该对象可以识别不同的浏览器。

由于历史原因，Navigator对象中的大部分属性都已经不能帮助我们识别浏览器了。

window.navigator 的一些属性可以获取客户端的一些信息。

- userAgent：系统，浏览器

- platform：浏览器支持的系统，winows/mac/linux

  ```js
  console.log(navigator.userAgent);//打印浏览器，系统信息
  console.log(navigator.platform);//打印浏览器支持的系统
  ```

**一般我们只会使用`navigator.userAgent`来获取浏览器的信息**。


userAgent 的值是一个字符串，简称 **UA**，这个字符串中包含了用来描述浏览器信息的内容，不同的浏览器会有不同的userAgent。

**example（获取当前浏览器的UA）:**

```js
var ua = navigator.userAgent; // 获取当前浏览器的 userAgent
console.log('qianguyihao 当前浏览器的UA是：' + ua);
if (/firefox/i.test(ua)) {
    alert('是火狐浏览器');
} else if (/chrome/i.test(ua)) {
    alert('是Chrome浏览器');
} else if (/msie/i.test(ua)) {
    alert('是IE浏览器');
} else if ('ActiveXObject' in window) {
    alert('是 IE11 浏览器');
}
```

## History 对象

### History对象的属性

```javascript
history.length//获取浏览器历史列表中的 url 数量
```

注意，只是统计当次的数量，如果浏览器关了，数量会重置为1。

### History对象的方法

#### 方法1: back()

```js
history.back();//用来回退到上一个页面，作用和浏览器的「回退按钮」一样
```

#### 方法2: forward()

```js
history.forward();//用来跳转下一个页面，作用和浏览器的「前进按钮」一样
```

#### 方法3: go()

```js
history.go(n); // 需要整数作为参数
history.go(1); // 向前跳转一个页面，相当于 history.forward
history.go(2); // 表示向前跳转两个页面
history.go(0); // 刷新当前页面
history.go(-1); // 向后跳转一个页面，相当于 history.back()
history.go(-2); // 向后跳转两个页面
```

## Location 对象

> Location 对象：封装了浏览器地址栏的 URL 信息。

`window.location`可以简写成location。location相当于浏览器地址栏，可以将url解析成独立的片段。

### Location 对象的属性

- **href**：跳转

- hash：返回url中#后面的内容，包含#

- host：主机名，包括端口

- hostname：主机名

- pathname ：url中的路径部分

- protocol：协议 一般是http、https

- search：查询字符串

### href 属性：

```js
//获取当前页面的 url 路径（或者设置 url 路径）
location.href
location.href = 'https://xxx';
console.log(location.href); // 获取当前页面的url 路径
location.href = 'www.baidu.com'; // 跳转到指定的页面链接。通俗理解就是：
//如果直接将location.href属性修改为一个绝对路径（或相对路径），则页面会自动跳转到该路径，并生成相应的历史记录
```

#### **example: 5秒后自动跳转**

```js
//有时候，当我们访问一个不存在的网页时，会提示5秒后自动跳转到指定页面，此时就可以用到location
setTimeout(function () {
		location.href = "http://www.baidu.com";
}, 5000);
```

### Location 对象的方法

#### assign()方法

> 改变浏览器地址栏的地址，并记录到历史中
>
> 设置location.href  就会调用assign()。一般使用location.href 进行页面之间的跳转。

```js
//用来跳转到其他的页面，作用和直接修改location.href一样。
location.assign(str);
```

#### reload()方法:

> 重新加载

```js
//用于重新加载当前页面，作用和刷新按钮一样
location.reload();
```

```js
location.reload();//重新加载当前页面。
location.reload(true);//在方法的参数中传递一个true，则会强制清空缓存刷新页面。
```

#### replace()方法:

> 替换浏览器地址栏的地址，不会记录到历史中

```js
//使用一个新的页面替换当前页面，调用完毕也会跳转页面。但不会生成历史记录，不能使用「后退按钮」后退
location.replace();
```

# DOM 

## 节点

**节点**（Node）：构成 HTML 网页的最基本单元。网页中的每一个部分都可以称为是一个节点，比如：html标签、属性、文本、注释、整个文档等都是一个节点。

虽然都是节点，但是实际上他们的具体类型是不同的。常见节点分为四类：

- 文档节点（文档）：整个 HTML 文档。整个 HTML 文档就是一个文档节点。

- 元素节点（标签）：HTML标签。

- 属性节点（属性）：元素的属性。

- 文本节点（文本）：HTML标签中的文本内容（包括标签之间的空格、换行）。

节点的类型不同，属性和方法也都不尽相同。所有的节点都是Object。

## 什么是DOM

**DOM**：Document Object Model，文档对象模型。DOM 为文档提供了结构化表示，并定义了如何通过脚本来访问文档结构。目的其实就是为了能让js操作html元素而制定的一个规范。

DOM就是由节点组成的。

**解析过程**：
HTML加载完毕，渲染引擎会在内存中把HTML文档，生成一个DOM树，getElementById是获取内中DOM上的元素节点。然后操作的时候修改的是该元素的**属性**。

**DOM树**：（一切都是节点）

**在HTML当中，一切都是节点**

**整个html文档就是一个文档节点。所有的节点都是Object。**

![20180201_2052](media/20180201_2052.png)



# 获取 html 文档的方法

获取title、body、head、html标签的方法如下：

- `document.title` 文档标题；

- `document.head`  文档的头标签

- `document.body`  文档的body标签；

- `document.documentElement`  （这个很重要）。文档的html标签

`document.documentElement`表示文档的html标签。也就是说，基本结构当中的 `html 标签`而是通过`document.documentElement`访问的，并不是通过 document.html 去访问的。

# DOM访问关系的获取 （节点的**访问关系**都是**属性**）

> DOM的节点并不是孤立的，因此可以通过DOM节点之间的相对关系对它们进行访问。

> 节点的访问关系，是以**属性**的方式存在的。

## 获取父节点 （.parentNode）

调用者就是节点。一个节点只有一个父节点，调用方式就是

```javascript
	节点.parentNode
```

## 获取兄弟节点（.nextElementSibling .previousSibling）

### **1、下一个节点 nextSibling| 下一个元素节点 nextElementSibling**：

（1）nextSibling：

- 火狐、谷歌、IE9+版本：都指的是下一个节点（包括标签、空文档和换行节点）。

- IE678版本：指下一个元素节点（标签）。

（2）nextElementSibling：

- 火狐、谷歌、IE9+版本：都指的是下一个元素节点（标签）。

**总结**：为了获取下一个**元素节点**，我们可以这样做：在IE678中用nextSibling，在火狐谷歌IE9+以后用nextElementSibling，于是，综合这两个属性，可以这样写：

```javascript
	下一个兄弟节点 = 节点.nextElementSibling || 节点.nextSibling
```

### **2、前一个节点 previousSibling | 前一个元素节点 previousElementSibling**：

（1）previousSibling：

- 火狐、谷歌、IE9+版本：都指的是前一个节点（包括标签、空文档和换行节点）。

- IE678版本：指前一个元素节点（标签）。

（2）previousElementSibling：

- 火狐、谷歌、IE9+版本：都指的是前一个元素节点（标签）。

**总结**：为了获取前一个**元素节点**，我们可以这样做：在IE678中用previousSibling，在火狐谷歌IE9+以后用previousElementSibling，于是，综合这两个属性，可以这样写：

```javascript
	前一个兄弟节点 = 节点.previousElementSibling || 节点.previousSibling
```

### **3、补充**：获得任意一个兄弟节点：

```javascript
	节点自己.parentNode.children[index];  //随意得到兄弟节点
```

## 获取单个的子节点（.firstChild .lastElementChild）

### **1、第一个子节点 firstChild | 第一个子元素节点 firstElementChild**：

（1）firstChild：

- 火狐、谷歌、IE9+版本：都指的是第一个子节点（包括标签、空文档和换行节点）。

- IE678版本：指第一个子元素节点（标签）。

（2）firstElementChild：

- 火狐、谷歌、IE9+版本：都指的是第一个子元素节点（标签）。

**总结**：为了获取第一个**子元素节点**，我们可以这样做：在IE678中用firstChild，在火狐谷歌IE9+以后用firstElementChild，于是，综合这两个属性，可以这样写：

```javascript
第一个子元素节点 = 节点.firstElementChild || 节点.firstChild
```

### **2、最后一个子节点 lastChild | 最后一个子元素节点 lastElementChild**：

（1）lastChild：

- 火狐、谷歌、IE9+版本：都指的是最后一个子节点（包括标签、空文档和换行节点）。

- IE678版本：指最后一个子元素节点（标签）。

（2）lastElementChild：

- 火狐、谷歌、IE9+版本：都指的是最后一个子元素节点（标签）。

**总结**：为了获取最后一个**子元素节点**，我们可以这样做：在IE678中用lastChild，在火狐谷歌IE9+以后用lastElementChild，于是，综合这两个属性，可以这样写：

```javascript
最后一个子元素节点 = 节点.lastElementChild || 节点.lastChild
```

## 获取所有的子节点（.children子元素节点集合 常用）

1）**childNodes**：标准属性。返回的是指定元素的**子节点**的集合（包括元素节点、所有属性、文本节点）。是W3C的亲儿子。

- 火狐 谷歌等高本版会把换行也看做是子节点。

用法：

```javascript
	子节点数组 = 父节点.childNodes;   //获取所有节点。
```

（2）**children**：非标准属性。返回的是指定元素的**子元素节点**的集合。【重要】

> 动态数组，每当节点被删除或者增加，集合长度自动增减

- 它只返回HTML节点，甚至不返回文本节点。
- 在IE6/7/8中包含注释节点（在IE678中，注释节点不要写在里面）。

虽然不是标准的DOM属性，但它和innerHTML方法一样，得到了几乎所有浏览器的支持。

用法：（**用的最多**）

```javascript
	子节点数组 = 父节点.children;   //获取所有节点。用的最多。
```

# DOM节点的操作（节点的**操作**都是**函数**（方法）重要）

## 创建节点（document.createElement("")）

格式如下：

```javascript
	新的标签(元素节点) = document.createElement("标签名");
```

## 插入节点（.appendChild() .insertBefore()）

插入节点有两种方式，它们的含义是不同的。

### 方式1（父节点的最后插入一个新的子节点）：

```javascript
	父节点.appendChild(新的子节点);
```

解释：父节点的最后插入一个新的子节点。

### 方式2（在参考节点前插入一个新的节点）：

```javascript
	父节点.insertBefore(新的子节点,作为参考的子节点)
```

解释：

- 在参考节点前插入一个新的节点。
- 如果参考节点为null，那么他将在父节点里面的最后插入一个子节点。

## 删除节点（.removeChild()）

格式如下：

```javascript
	父节点.removeChild(子节点);
```

解释：**用父节点删除子节点**。必须要指定是删除哪个子节点。

自己删自己，可以这么做：

```javascript
	node1.parentNode.removeChild(node1);
```

## 复制节点（克隆节点.cloneNode()）

格式如下：

```javascript
	要复制的节点.cloneNode();       //括号里不带参数和带参数false，效果是一样的。

	要复制的节点.cloneNode(true);
```

括号里带不带参数，效果是不同的。解释如下：

- 不带参数/带参数false：只复制节点本身，不复制子节点。

- 带参数true：既复制节点本身，也复制其所有的子节点。

# 设置节点的属性

> 我们可以获取节点的属性值、设置节点的属性值、删除节点的属性。

## 1、获取节点的属性值 （.getAttribute("属性名称”)）

#### **方式1**：	元素节点.属性名;元素节点[属性名];

```javascript
	元素节点.属性名;
	元素节点[属性名];
```

#### **方式2**：.getAttribute("属性名称”) （推荐）

```javascript
	元素节点.getAttribute("属性名称");
```

**方式1和方式2的区别在于：前者是直接操作标签，后者是把标签作为DOM节点。推荐方式2。**

## 2、设置节点的属性值

方式1举例：（设置节点的属性值）

```javascript
    myNode.src = "images/2.jpg"   //修改src的属性值
    myNode.className = "image2-box";  //修改class的name
```

方式2：

```javascript
	元素节点.setAttribute("属性名", "新的属性值");
```


## 3、删除节点的属性

格式：

```javascript
	元素节点.removeAttribute("属性名");
```

## 总结(设置节点的属性两种方式的区别)

获取节点的属性值和设置节点的属性值，都有两种方式。

**如果是节点的“原始属性”**, 方式1和方式2是等价的**，可以混用。**

> 比如 普通标签的`class/className`属性、普通标签的`style`属性、普通标签的 title属性、img 标签的`src`属性、超链接的`href`属性等

**如果是节点的“非原始属性“**,

在使用这两种方式时，是有区别的。区别如下：

- 方式1 的`元素节点.属性`和`元素节点[属性]`：绑定的属性值不会出现在标签上。

- 方式2 的`get/set/removeAttribut`：绑定的属性值会出现在标签上。

- **这两种方式不能交换使用**，get值和set值必须使用同一种方法。

# DOM对象的属性

## innerHTML(包含标签）和innerText（不包含标签）的区别

- value：标签的value属性。

- **innerHTML**：双闭合标签里面的内容（包含标签）。

- **innerText**：双闭合标签里面的内容（不包含标签）。（老版本的火狐用textContent）

1. 如果我们想获取innerHTML和innerText里的内容：
   1. `innerHTML`会获取到标签本身
   2. `innerText`则不会获取到标签本身
2. 修改内容举例
   1. `innerHTML`会修改标签本身
   2. `innerText`则不会修改标签本身

## nodeType属性（在这里元素就是标签）

- **nodeType == 1  表示的是元素节点**（标签） 。**==记住：在这里，元素就是标签。==**

- nodeType == 2  表示是属性节点。

- nodeType == 3  是文本节点。

### nodeType、nodeName、nodeValue

- 元素节点（标签）

  - `getElementById("")`等

- 属性节点

  - `getAttributeNode("")`等

- 文本节点

  - `firstChild`等


我们那下面这个标签来举例：

  ```html
<div id="box" value="111">
playlife
</div>
  ```

  上面这个标签就包含了三种节点：

- 元素节点（标签）

- 属性节点

- 文本节点

# 通过style对象获取属性和修改

在DOM当中，如果想设置样式，有两种形式：

- **className（针对内嵌样式）**

- **style（针对行内样式）**

style是一个对象，只能获取**行内样式**，不能获取内嵌的样式和外链的样式。

## 通过 JS 读取元素的样式

### 方式一：（style.样式名）

```javascript
    元素.style.样式名
```

备注：我们通过style属性读取的样式都是**行内样式**。

### 方式二：（style["属性"]）

```javascript
    元素.style["属性"];  //格式

    box.style["width"];  //举例
```

方式二最大的优点是：可以给属性传递参数。

## 通过 JS 设置元素的样式

语法：

```javascript
    元素.style.样式名 = 样式值;
```

举例：

```
    box1.style.width = "300px";
    box1.style.backgroundColor = "red"; // 驼峰命名法

```

备注：我们通过style属性设置的样式都是**行内样式**，而行内样式有较高的优先级。但是如果在样式中的其他地方写了`!important`，则此时`!important`会有更高的优先级。

# style属性的注意事项

style属性需要注意以下几点：

（1）样式少的时候使用。

（2）style是对象。我们在上方已经打印出来，typeof的结果是Object。

（3）值是字符串，没有设置值是“”。

（4）命名规则，驼峰命名。`backgroundColor`

（5）只能获取行内样式，和内嵌和外链无关。

（6）box.style.cssText = “字符串形式的样式”。

`cssText`这个属性，其实就是把行内样式里面的值当做字符串来对待。在上方代码的基础之上，举例：

```
Element.style.cssText = "width: 300px;height: 300px;background-color: green;";
```

# style的常用属性

> style的常用属性包括：

### backgroundColor

### backgroundImage

### color

### width

### height

### border

### opacity 设置透明度 (IE8以前是filter: alpha(opacity=xx))

==注意==DOM对象style的属性和标签中style内的值不一样，因为在JS中，`-`不能作为标识符。比如：

- DOM中：backgroundColor

- CSS中：background-color

# 通过 JS 获取元素当前显示的样式

我们在上面的内容中，通过`元素.style.className`的方式只能获取**行内样式**。但是，有些元素，也写了**内嵌样式或外链样式**。

既然样式有这么种，那么，如何获取元素当前显示的样式（包括行内样式、内嵌样式、外链样式）呢？我们接下来看一看。

### 获取元素当前正在显示的样式

## （1）w3c的做法：（getComputedStyle("", “")）

```javascript
    window.getComputedStyle("要获取样式的元素", "伪元素");
```

两个参数都是必须要有的。参数二中，如果没有伪元素就用 null 代替（一般都传null）。

## （2）IE和opera的做法：（currentStyle）

```javascript
    obj.currentStyle;
```

注意：

- 如果当前元素没有设置该样式，则获取它的默认值。

- 该方法会返回一个**对象**，对象中封装了当前元素对应的样式，可以通过`对象.样式名`来读取具体的某一个样式。

- 通过currentStyle和getComputedStyle()读取到的样式都是只读的，不能修改，如果要修改必须通过style属性。

```js
/**
* 兼容方法，获取元素当前正在显示的样式。
* 参数：
* ele  要获取样式的元素
* attr 要获取的样式名 ("字符串")
*/
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}
```

# offset 相关属性 （获取元素尺寸）

## offset 家族的组成

JS动画的三大家族包括：offset/scroll/client。今天来讲一下offset，以及与其相关的匀速动画。

> offset的中文是：偏移，补偿，位移。

JS中有一套方便的**获取元素尺寸**的办法就是offset家族。offset家族包括：

- **offsetWidth** = width + padding + border

- **offsetHight** = height + padding + border

- **offsetLeft**： 相对于其**定位父元素**的水平偏移量

- **offsetTop**：相对于其**定位父元素**的垂直偏移量

- **offsetParent**：获取当前元素的**定位父元素**

## 1. offsetWidth 和 offsetHight

`offsetWidth` 和 `offsetHight`：获取元素的**宽高 + padding + border**，==不包括==margin。如下：

- **offsetWidth = width + padding + border**

- **offsetHeight = height + padding + border**

> 这两个属性，他们绑定在了所有的节点元素上。获取元素之后，只要调用这两个属性，我们就能够获取元素节点的宽和高。

代码格式：

```js
var div1 = document.getElementsByTagName("div")[0];
console.log(div1.offsetHeight);          //打印结果：140（100+20+20）
console.log(typeof div1.offsetHeight);   //打印结果：number
```

## 2. offsetParent (获取当前元素的定位父元素)

`offsetParent`：获取当前元素的**定位父元素**。

- 如果当前元素的父元素，**有CSS定位**（position为absolute、relative、fixed），那么 `offsetParent` 获取的是**最近的**那个父元素。

- 如果当前元素的父元素，**没有CSS定位**（position为absolute、relative、fixed），那么`offsetParent` 获取的是**body**。

举例:

```html
<body>
<div class="box1" style="position: absolute;">
    <div class="box2" style="position: fixed;">
        <div class="box3"></div>
    </div>
</div>
<script>

    var box3 = document.getElementsByClassName("box3")[0];
    console.log(box3.offsetParent);
  //打印结果为整个html结构
 /**
 * <div class="box2" style="position: fixed;">
                <div class="box3"></div>
            </div>
 */
</script>
</body>
```

## 3. offsetLeft 和 offsetTop（水平、垂直偏移量）

`offsetLeft`：当前元素相对于其**定位父元素**的水平偏移量。

`offsetTop`：当前元素相对于其**定位父元素**的垂直偏移量。

备注：从父亲的 padding 开始算起，父亲的 border 不算在内（父亲元素内边到自己的外边）

demo:

```html
<style>
  .box1 {
    width: 300px;
    height: 300px;
    padding: 100px;
    margin: 100px;
    position: relative;
    border: 100px solid #000;
    background-color: pink;
  }
  .box2 {
    width: 100px;
    height: 100px;
    background-color: red;
    /*position: absolute;*/
    /*left: 10px;*//*top: 10px;*/
  }
    </style>
</head>
<body>
<div class="box1">
    <div class="box2" style="left: 10px"></div>
</div>
<script>
    var box2 = document.getElementsByClassName("box2")[0];
    //offsetTop和offsetLeft
    console.log(box2.offsetLeft);  //100
    console.log(box2.style.left);  //10px
</script>
```

在父盒子有定位的情况下，offsetLeft == style.left(去掉px之后)。注意，后者只识别行内样式

## offsetLeft 和 style.left 区别

1. 最大区别在于：

   offsetLeft 可以返回无定位父元素的偏移量。如果父元素中都没有定位，则body为准。

   style.left 只能获取行内样式，如果父元素中都没有设置定位，则返回""（意思是，返回空字符串）;

2. offsetTop 返回的是数字，而 style.top 返回的是字符串，而且还带有单位：px。

   比如：

   ```javascript
   div.offsetLeft = 100;
   div.style.left = "100px";
   ```

3. offsetLeft 和 offsetTop **只读**，而 style.left 和 style.top 可读写（只读是获取值，可写是修改值）

总结：我们一般的做法是：**用offsetLeft 和 offsetTop 获取值，用style.left 和 style.top 赋值**（比较方便）。理由如下：

- style.left：只能获取行内式，获取的值可能为空，容易出现NaN。

- offsetLeft：获取值特别方便，而且是现成的number，方便计算。它是只读的，不能赋值。

# scroll (滚动)相关属性

## window.onscroll() 方法

当我们用鼠标滚轮，滚动网页的时候，会触发 window.onscroll() 方法，需要做滚动监听，可以使用这个方法。

## 1、ScrollWidth 和 scrollHeight（获取元素滚动区域）

`ScrollWidth` 和 `scrollHeight`：获取元素**整个滚动区域**的宽、高。包括 width 和 padding，不包括 border和margin。

**注意**：

`scrollHeight` 的特点是：如果内容超出了盒子，`scrollHeight`为内容的高（包括超出的内容）；如果不超出，`scrollHeight`为盒子本身的高度。`ScrollWidth`同理。

## 2、scrollTop 和 scrollLeft（获取滚动条滚动的距离）

- `scrollLeft`：获取水平滚动条滚动的距离。

- `scrollTop`：获取垂直滚动条滚动的距离。

### **实战经验**：

当某个元素满足`scrollHeight - scrollTop == clientHeight`时，说明垂直滚动条滚动到底了。

当某个元素满足`scrollWidth - scrollLeft == clientWidth`时，说明水平滚动条滚动到底了。

这个实战经验非常有用，可以用来判断用户是否已经将内容滑动到底了。比如说，有些场景下，希望用户能够看完“长长的活动规则”，才允许触发接下来的表单操作。

### scrollTop 的兼容性

如果要获取页面滚动的距离，scrollTop 这个属性的写法要注意兼容性，如下。

（1）如果文档没有 DTD 声明，写法为：

```javascript
document.body.scrollTop
```

在没有 DTD 声明的情况下，要求是这种写法，chrome浏览器才能认出来。

（2）如果文档有 DTD 声明，写法为：

```javascript
document.documentElement.scrollTop
```

在有 DTD 声明的情况下，要求是这种写法，IE6、7、8才能认出来。

综合上面这两个，就诞生了一种兼容性的写法：

```javascript
document.body.scrollTop || document.documentElement.scrollTop //方式一
document.body.scrollTop + document.documentElement.scrollTop  //方式二
```

另外还有一种兼容性的写法：`window.pageYOffset` 和 `window.pageXOffset`。这种写法无视DTD的声明。这种写法支持的浏览器版本是：火狐/谷歌/ie9+。

综合上面的几种写法，为了兼容，不管有没有DTD，**最终版的兼容性写法：**

```javascript
window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
```

### 判断是否已经 DTD 声明

方法如下：

```javascript
document.compatMode === "CSS1Compat"   // 已声明
document.compatMode === "BackCompat"   // 未声明
```

### 将 scrollTop 和 scrollLeft 进行封装

这里，我们将 scrollTop 和 scrollLeft 封装为一个方法，名叫scroll()，返回值为 一个对象。以后就直接调用`scroll().top` 和 `scroll().left`就好。

```js
///函数封装（简单封装，实际工作使用）
function scroll() {
    return {
        //此函数的返回值是对象
        top:
            window.pageYOffset ||
            document.body.scrollTop ||
            document.documentElement.scrollTop,
        left:
            window.pageXOffset ||
            document.body.scrollLeft ||
            document.documentElement.scrollLeft,
    };
}
```

```js
//结合了判断DTD是否声明
function scroll() {
    // 开始封装自己的scrollTop
    if (window.pageYOffset !== undefined) {
        // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset,
        };
    } else if (document.compatMode === 'CSS1Compat') {
        // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop,
        };
    }
    return {
        // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
    };
}
```

# client（可视区）相关属性

## clientWidth 和 clientHeight

元素调用时：

- clientWidth：获取元素的可见宽度（width + padding）。

- clientHeight：获取元素的可见高度（height + padding）。


body/html 调用时：

- clientWidth：获取网页可视区域宽度。

- clientHeight：获取网页可视区域高度。

**声明**：

- `clientWidth` 和 `clientHeight` 属性是只读的，不可修改。

- `clientWidth` 和 `clientHeight` 的值都是不带 px 的，返回的都是一个数字，可以直接进行计算。


## clientX 和 clientY

event调用：

- clientX：鼠标距离可视区域左侧距离。

- clientY：鼠标距离可视区域上侧距离。

## clientTop 和 clientLeft

- clientTop：盒子的上border。

- clientLeft：盒子的左border。

# 三大家族 offset/scroll/client 的区别

## 区别1：宽高

- offsetWidth  = width  + padding + border
- offsetHeight = height + padding + border

- scrollWidth   = width + padding 内容宽度（不包含border和magrin）
- scrollHeight  = height + padding 内容高度（不包含border和magrin）

- clientWidth  = width  + padding
- clientHeight = height + padding

## 区别2：上左


offsetTop/offsetLeft：

- 调用者：任意元素。(盒子为主)
- 作用：距离父系盒子中带有定位的距离。


scrollTop/scrollLeft：

- 调用者：document.body.scrollTop（window调用）(盒子也可以调用，但必须有滚动条)
- 作用：浏览器无法显示的部分（被卷去的部分）。


clientY/clientX：

- 调用者：event
- 作用：鼠标距离浏览器可视区域的距离（左、上）。

## 函数封装：获取浏览器的宽高（可视区域）

```js
//函数封装：获取屏幕可视区域的宽高
function client() {
    if (window.innerHeight !== undefined) {
        //ie9及其以上的版本的写法
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    } else if (document.compatMode === 'CSS1Compat') {
        //标准模式的写法（有DTD时）
        return {
          //document.documentElement表示文档的html标签
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
    } else {
        //没有DTD时的写法
        return {
          //document.body  文档的body标签
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        };
    }
}

//console.log(client().height,client().width);//打印浏览器宽高
```

# 动画(闪现/匀速/缓动)

- 闪现（基本不用）
- 匀速（本文重点）
- 缓动（后续重点）

# 闪动（基本不用）

```js
// 1、闪动
 btn.onclick = function () {
   div.style.left = "500px";
 }
```

# 匀速 （重点）（轮播图实现）

demo1:

用style.left赋值，用offsetLeft获取值

> offsetLeft只能获取值不能设置值，style.left都可以，但是在没有行内样式时会返回一个空字符串

```js
//2、匀速运动
btn.onclick = function () {
  //定时器，每隔一定的时间向右走一些
  setInterval(function () {
    console.log(parseInt(div.style.left));
    //动画原理： 盒子未来的位置 = 盒子现在的位置 + 步长；
    //用style.left赋值，用offsetLeft获取值。
     div.style.left = div.offsetLeft + 100 + "px";
    //div.style.left = parseInt(div.style.left)+10+"px";  //NaN不能用
  }, 500);
}
```

## 匀速动画的封装（每间隔30ms，移动盒子10px）【重要】

```js
//【重要】方法的封装：每间隔30ms，将盒子向右移动10px
function animate(ele, target) {
  //要用定时器，先清除定时器
  //一个盒子只能有一个定时器，这样的话，不会和其他盒子出现定时器冲突
  //我们可以把定时器本身，当成为盒子的一个属性
  clearInterval(ele.timer);
  //我们要求盒子既能向前又能向后，那么我们的步长就得有正有负
  //目标值如果大于当前值取正，目标值如果小于当前值取负
  var speed = target > ele.offsetLeft ? 10 : -10;  //speed指的是步长
	ele.timer = setInterval(function () {
			//在执行之前就获取当前值和目标值之差
			var val = target - ele.offsetLeft;
			//移动的过程中，如果目标值和当前值之差如果小于步长，那么就不能在前进了
			//因为步长有正有负，所有转换成绝对值来比较
			if (Math.abs(val) < Math.abs(speed)) {
					ele.style.left = target + "px";
					clearInterval(ele.timer);
			}else{
        ele.style.left = ele.offsetLeft + speed + "px";
      }
   }, 30)
}
```

## 轮播图的实现（setInterval和offsetLeft）

demo2:

```html
<!-- html结构与样式-->
<!--position: relative;-->
<div class="wrap" id="wrap">
<!-- 轮播图展示 -->
<!-- 作为父盒子用于隐藏  
position: relative;
overflow: hidden;--> 
  <div class="show" id="show">
     <!-- position: absolute; width:XXXXXXpx; -->
    <ul class="carousel" id="carousel">
      <!-- float:left; -->
      <li><img src="./images/imada_mio1.jpg"alt=""width="" height=""/
      </li> 
      <li><img src="./images/imada_mio2.jpg"alt=""width="" height=""/
      </li> 
      <li><img src="./images/imada_mio3.jpg"alt=""width="" height=""/
      </li> 
     </ul>
    <!-- 轮播小按钮 -->
     <ul class="pointer" id="pointer"></ul>
    <!-- 下一张，上一张 -->
     <div id="arr">
        <span id="left"><</span>
        <span id="right">></span>
     </div>
   </div>
</div>
```

```js
//js
//1. 获取事件源相关元素
//获取最外层元素
const wrap = document.getElementById('wrap');
// 获取第一个子节点
const show = wrap.firstElementChild || wrap.firstChild;
// 获取图片宽度即为容器盒子
const imgWidth = show.offsetWidth;
const carousel = document.getElementById('carousel');
const pointer = document.getElementById('pointer');
// 上一张下一张
const div = document.getElementById('arr');
const spanArr = div.children;

// 2.复制第一张图片所在的li,添加到ul的最后面。
const ulNewLi = carousel.children[0].cloneNode(true);
carousel.appendChild(ulNewLi);

//3.给pointer中添加li 为carousel中个数-1，并点亮第一个
for (let i = 0; i < carousel.children.length - 1; i++) {
    let newPointer = document.createElement('li');
    newPointer.innerHTML = i + 1;
    pointer.appendChild(newPointer);
}
const currentLi = pointer.children;
currentLi[0].className = 'current';

// 4.鼠标点击pointer更换图片
for (let i = 0; i < currentLi.length; i++) {
    //自定义属性，把索引值绑定到元素的index属性上
    currentLi[i].index = i;
    currentLi[i].onmouseover = () => {
        for (let j = 0; j < currentLi.length; j++) {
            currentLi[j].className = '';
        }
        currentLi[i].className = 'current';
        //鼠标放到小的方块上的时候索引值和picIndex以及pointerIndex同步
        picIndex = pointerIndex = currentLi[i].index;
        animate(carousel, -currentLi[i].index * imgWidth);
    };
}
//5. 添加定时器
let timer = setInterval(autoPlay, 1500);
// 固定向右切换图片
// 两个定时器
// 图片
let picIndex = 0;
// 图片下方数字索引
let pointerIndex = 0;

function autoPlay() {
    //通过picIndex自增，模拟图片索引值，移动ucarousel
    picIndex++;
    if (picIndex > currentLi.length) {
        // 说明图片已经到了最后一张，接下来跳转到第一张，然后再滑动到第二张
        carousel.style.left = 0;
        picIndex = 1;
    }
    //动画
    animate(carousel, -picIndex * imgWidth);
    //通过控制pointerIndex的自增来模拟消费的索引值，然后点亮盒子
    pointerIndex+
    if (pointerIndex > currentLi.length - 1) {
        pointerIndex = 0;
    }
    for (let i = 0; i < currentLi.length; i++) {
        currentLi[i].className = '';
    }
    currentLi[pointerIndex].className = 'current';
}

//鼠标放上去清楚定时器
wrap.onmouseover = () => {
    div.style.display = 'block';
    clearInterval(timer);
};
wrap.onmouseout = () => {
    div.style.display = 'none';
    timer = setInterval(autoPlay, 1500);
};

//6.左右切换图片
//上一张
spanArr[0].onclick = () => {
    picIndex--;
    if (picIndex < 0) {
        //先移动到第一张
        carousel.style.left = -imgWidth * currentLi.length + 'px';
        picIndex = currentLi.length - 1;
    }
    animate(carousel, -picIndex * imgWidth);

    pointerIndex--;
    if (pointerIndex < 0) {
        pointerIndex = currentLi.length - 1;
    }
    for (let i = 0; i < currentLi.length; i++) {
        currentLi[i].className = '';
    }
    currentLi[pointerIndex].className = 'current';
};

spanArr[1].onclick = () => {
    //右侧和定时器效果一样，点击立刻调用
    autoPlay();
};
function animate(ele, traget) {
    clearInterval(ele.timer);
    var speed = traget > ele.offsetLeft ? 10 : -10;
    ele.timer = setInterval(() => {
        var val = traget - ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + 'px';
        if (Math.abs(val) < Math.abs(speed)) {
            ele.style.left = traget + 'px';
            clearInterval(ele.timer);
        }
    }, 10);
}

```



# 缓动动画

### 三个函数

缓慢动画里，我们要用到三个函数，这里先列出来：

```js
Math.ceil();//向上取整
Math.floor();//向下取整
Math.round();//四舍五入
```

### 缓动动画的原理

缓动动画的原理就是：在移动的过程中，步长越来越小。

设置步长为：**目标位置和盒子当前位置的十分之一**。用公式表达，即：

```
盒子位置 = 盒子本身位置 + (目标位置 - 盒子本身位置)/ 10；
```

```js
setInterval(function () {
    //动画原理：盒子未来的位置 = 盒子当前的位置+步长
    div.style.left = div.offsetLeft + (400 - div.offsetLeft) / 10 + 'px';
}, 30);
```

### 缓慢动画的封装（解决四舍五入的问题）

通过`div.style.left`获取的值是精确的，通过`div.offsetLeft`获取的left值会进行四舍五入

```js
//缓动动画封装
function animate(ele, target) {
    //要用定时器，先清定时器
    //一个萝卜一个坑儿，一个元素对应一个定时器
    clearInterval(ele.timer);
    //定义定时器
    ele.timer = setInterval(function () {
        //获取步长
        //步长应该是越来越小的，缓动的算法。
        var step = (target - ele.offsetLeft) / 10;
        //对步长进行二次加工(大于0向上取整,小于0向下取整)
        //达到的效果是：最后10像素的时候都是1像素1像素的向目标位置移动，就能够到达指定位置。
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //动画原理： 目标位置 = 当前位置 + 步长
        ele.style.left = ele.offsetLeft + step + 'px';
        console.log(step);
        //检测缓动动画有没有停止
        console.log('playlife');
        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            //处理小数赋值
            ele.style.left = target + 'px';
            clearInterval(ele.timer);
        }
    }, 30);
}
```

# 鼠标事件

## 鼠标的拖拽事件

拖拽的流程：

（1）`onmousedown`：当鼠标在被拖拽元素上按下时，开始拖拽；

（2）`onmousemove`：当鼠标移动时被拖拽元素跟随鼠标移动；

（3）`onmouseup`：当鼠标松开时，被拖拽元素固定在当前位置。

## 鼠标的滚轮事件

`onmousewheel`：鼠标滚轮滚动的事件，会在滚轮滚动时触发。但是火狐不支持该属性。

`DOMMouseScroll`：在火狐中需要使用 DOMMouseScroll 来绑定滚动事件。注意该事件需要通过addEventListener()函数来绑定。

# 键盘事件

可以通过`event`事件对象的`keyCode`来获取按键的编码。


此外，`event`事件对象里面还提供了以下几个属性：

- altKey

- ctrlKey

- shiftKey


上面这三个属性，可以用来判断`alt`、`ctrl`、和`shift`是否被按下。如果按下则返回true，否则返回false。

```js
<body>
    <script>
        document.onkeydown = function(event) {
            event = event || window.event;
            console.log('qianguyihao：键盘按下了');
            // 判断y和ctrl是否同时被按下
            if (event.ctrlKey && event.keyCode === 89) {
                console.log('ctrl和y都被按下了');
            }
        };
    </script>
</body>
```

**举例**：input 文本框中，禁止输入数字。代码实现：

```html
    <body>
        <input type="text" />

        <script>
            //获取input
            var input = document.getElementsByTagName('input')[0];

            input.onkeydown = function(event) {
                event = event || window.event;

                //console.log('qianguyihao:' + event.keyCode);
                //数字 48 - 57
                //使文本框中不能输入数字
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    //在文本框中输入内容，属于onkeydown的默认行为
                    return false; // 如果在onkeydown中取消了默认行为，则输入的内容，不会出现在文本框中
                }
            };
        </script>
    </body>

```

## 举例：通过键盘的方向键，移动盒子

```js
//上38下40左37右39
const box = document.getElementsByClassName('box')[0];
//键盘事件不能单独添加给元素,不起效果
document.documentElement.addEventListener('keydown', function (e) {
    let speed = 10;
    switch (e.keyCode) {
        //上==38
        case 38:
            box.style.top = box.offsetTop - speed + 'px';
            break;
        //下==40
        case 40:
            box.style.top = box.offsetTop + speed + 'px';
            break;
        //左==37
        case 37:
            box.style.left = box.offsetLeft - speed + 'px';
            break;
        //右==38
        case 39:
            box.style.left = box.offsetLeft + speed + 'px';
            break;
        default:
            break;
    }
});
```



