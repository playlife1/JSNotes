# HTML&CSS

> HTML & CSS 碎片相关知识点

# HTML 元素标签语义化

### 一、标签语义化是什么？

标签语义化就是让元素标签做适当的事情。例如 `p` 标签就是代表文本，`button` 标签代表按钮，`nav` 标签代表导航等等。

### 二、为什么要标签语义化？

其实标签语义化是给浏览器和搜索引擎看的。

#### 为什么浏览器关心？

DOM 的大部分内容具有隐式语义含义。 也就是说，DOM 采用的原生 HTML 元素能够被浏览器识别，并且可以预测其在各类平台上的工作方式。

例如用 `div` 实现的按钮和用原生 `button` 实现的按钮就有一些区别，在表单内 `button` 可以不用绑定 onclick 事件就可以提交表单内容，用 `div` 实现的按钮则不行。另外在浏览器中按 tab 键盘可以在 `button` 之间来回切换，而 `div` 则不可以。

还有 `input` 标签 type 属性，由于值的不同在手机上的表现也不同。例如 type="tel" 和 type="number" 弹出来的数字键盘是不一样的。

#### 为什么搜索引擎关心？

搜索引擎的爬虫根据标签来确定上下文、关键字的权重，有利于 SEO。



# 盒子模型

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

每个盒子由四个部分（或称*区域*）组成，其效用由它们各自的边界（Edge）所定义

每个盒子有四个边界：*内容边界* *Content edge*、*内边距边界* *Padding Edge*、*边框边界* *Border Edge*、*外边框边界* *Margin Edge*。

一个盒子中主要的属性就5个：width、height、padding、border、margin。

- width和height：**内容**的宽度、高度（不是盒子的宽度、高度）。
- padding：内边距。
- border：边框。
- margin：外边距。

盒子模型有两种：

- W3C 标准盒子模型

- IE 盒子模型

CSS盒模型和IE盒模型的区别：

在 **标准盒子模型**中，**width 和 height 指的是内容区域**的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

在**IE盒子模型**中，**width 和 height 指的是 内容区域 + border + padding** 的宽度和高度。

通过 CSS3 新添加属性 `box-sizing` 可以更改盒子模型标准

# BFC 块格式化上下文

块格式化上下文 (Block Formatting Context，BFC) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

块格式化上下文对浮动定位与清除浮动都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠也只会发生在属于同一BFC的块级元素之间。

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。**

触发 BFC形成条件（任意一条）：

- `<html>` 根元素
- `float` 值不为 `none`
- `overflow` 值为`auto`,`scroll`,`hidden` 不是`visible`
- `display` 的值为 `table-cell`, `table-caption`,`inline-block`,`flex`,或者`inline-flex`中任何一个              
- `position` 的值不为 `static` 和 `relative`

BFC 特性

- 内部的盒子会在垂直方向上一个接一个的放置
- 对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。**(外边距塌陷)**
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC的区域不会与float的元素区域重叠，BFC 可以阻止元素被浮动元素覆盖
- 计算BFC的高度时，浮动子元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

**外边距塌陷：**

> 同一个 BFC 下外边距会发生折叠

有三种情况会形成外边距重叠：

- 同一层相邻元素之间相邻的两个元素之间的外边距重叠，除非后一个元素加上。

- 没有内容将父元素和后代元素分开

- 空的块级元素

BFC 可以包含浮动的元素 用于**清除浮动**

# 清除浮动的方式

1. 给外部盒子也添加浮动 （BFC 可以包含浮动的元素 用于**清除浮动**）
   缺点：可读性差，不易于维护（别人很难理解为什么要给父元素也添上float），而且可能需要调整整个页面布局。

2. 在外部盒子内最下方添上带clear属性的空盒子

   可以是div也可以是其它块级元素，把 `<div style="clear:both;"></div>`放在盒内底部，用最下面的空盒子清除浮动，把盒子重新撑起来。
   缺点：引入了冗余元素

3. 用`overflow:hidden `清除浮动 (计算BFC的高度时，浮动子元素也参与计算)
   给外部盒子添上这个属性
   缺点：有可能造成溢出元素不可见，影响展示效果。

4. 用伪元素清除浮动
   给外部盒子的 after 伪元素设置 clear 属性，再隐藏它
   这其实是对空盒子方案的改进，一种纯 CSS 的解决方案，不用引入冗余元素。

   ```css
   /*清除浮动*/
   .clearfix::before,
   .clearfix::after {
       content: '';
       display: table;
   }
   .clearfix::after {
       clear: both;
   }
   ```

   这也是 bootstrap 框架采用的清除浮动的方法。

5. 定高法	

   给每个盒子规定 width 和 height，要多大给多大即可。但是这样的布局不是内容自适应的，如果页面内容极少发生变动，这也是一个不错的方案，因为它的兼容性是毋庸置疑的。

# HTML5 新添加特性简单说明

新增加语义化更好的标签元素

1. 结构元素：article、aside、header、hgroup、footer、figure、section、nav
2. 其他元素：video、audio、canvas、embed、mark、progress、meter、time、command、details、datagrid、keygen、output、source、menu、ruby、wbr、bdi、dialog、

废除了：纯表现元素、部分浏览器支持的元素和对可用性产生负面影响的元素

> 纯表现元素：basefont、big、center、font、s、strike、tt、u 用css代替
> 部分浏览器支持的元素：applet、bgsound、blink、marquee
> 对可用性产生负面影响的元素：frameset、frame、noframes,在html5中不支持frame框架，只支持iframe框架

新增的API：

Canvas：首先获取canvas元素的上下文对象，然后使用该上下文对象中的绘图功能进行绘制。

SVG：SVG是html5的另一项图形功能，是一种标准的矢量图形，是一种文件格式，有自己的API。

音频和视频：2大好处,一是作为浏览器原生支持的功能，新的audio和video元素无需安装；二是媒体元素向web页面提供了通用、集成和可脚本化控制的API。

Geolocation：可以请求用户共享他们的位置。位置信息来源IP地址、三维坐标、GPS、从RFID、Wifi和蓝牙到Wifi的MAC地址、GSM或CDMA手机的ID、用户自定义数据

XMLHttpRequest Level2：改进了跨源XMLHttpRequest和进度事件，XMLHttpRequest Level2通过CORS实现了跨源XMLHttpRequest。跨源HTTP请求包含一个Origin头部，它为服务器提供HTTP请求的源信息。

WebSockets：要连接远程主机，只需新建一个WebSocket实例，提供希望连接的对端URL。

Forms：新表单元素tel、email、url、search、range、number 未来的表单元素color、datetime、datetime-local、time、date、week、month

新表单特性和函数：placeholder、autocomplete、autofocus、spellcheck、list特性、datalist元素、min和max、step、required

拖放API：draggable属性、拖放事件(dragstart、drag、dragenter、dragleave、dragover、drap、dragend)、dataTransfer对象

Web Workers API：Web Workers可以让Web应用程序具备后台处理能力，对多线程的支持性非常好。但是在Web Workers中执行的脚本不能访问该页面的window对象，也就是Web Workers不能直接访问Web页面和DOM API。虽然Web Workers不会导致浏览器UI停止响应，但是仍然会消耗CPU周期，导致系统反应速度变慢。

Web Storage API：sessionStorage(保存在session中，浏览器关闭，数据消失)、localStorage(保存在客户端本地，除非手动删除，否则一直保存)

# CSS3 新添加的属性简单说明

## 选择器

> 新增加了一些选择器

```css
element1~element2: /*选择前面有element1元素的每个element2元素。*/
[attribute^=value]:/*选择某元素attribute属性是以value开头的。*/
[attribute$=value]:/*选择某元素attribute属性是以value结尾的。*/
[attribute*=value]:/*选择某元素attribute属性包含value字符串的。*/
E:first-of-type: /*选择属于其父元素的首个E元素的每个E元素。*/
E:last-of-type: /*选择属于其父元素的最后E元素的每个E元素。*/
E:only-of-type: /*选择属于其父元素唯一的E元素的每个E元素。*/
E:only-child: /*选择属于其父元素的唯一子元素的每个E元素。*/
E:nth-child(n): /*选择属于其父元素的第n个子元素的每个E元素。*/
E:nth-last-child(n): /*选择属于其父元素的倒数第n个子元素的每个E元素。*/
E:nth-of-type(n): /*选择属于其父元素第n个E元素的每个E元素。*/
E:nth-last-of-type(n): /*选择属于其父元素倒数第n个E元素的每个E元素。*/
E:last-child: /*选择属于其父元素最后一个子元素每个E元素。*/
:root: /*选择文档的根元素。*/
E:empty: /*选择没有子元素的每个E元素（包括文本节点)。*/
E:target: /*选择当前活动的E元素。*/
E:enabled: /*选择每个启用的E元素。*/
E:disabled: /*选择每个禁用的E元素。*/
E:checked: /*选择每个被选中的E元素。*/
E:not(selector): /*选择非selector元素的每个元素。*/
E::selection: /*选择被用户选取的元素部分。*/
```

## transform

> CSS `transform` 属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

```css
transform:matrix translate scale rotate skew perspective；
transform-style: preserve-3d;/*真3d效果*/
transform-orign/*转换发生位置*/ 
```

## 过渡与动画

> 过渡需要出发、动画可以自己启动

```css
/*过渡*/
transition/*配合转换使用，形成动画效果*/

/*动画*/
animation
@keyfram 动画名{}
```

## 边框

```css
border-radius/*可以创建圆角边框*/
box-shadow/*可以为元素添加阴影*/
border-image/*可以使用图片来绘制边框*/
```

## 背景

```css
background-clip/*确定背景画区*/
background-origin/*确定背景的位置，它通常与background-position联合使用*/
background-size/*调整背景图片的大小，等比例缩放，移动Web开发常常用的*/
background-break/*控制背景怎样在这些不同的盒子中显示*/
```

## 背景可以添加渐变属性

```css
/*渐变*/
linear-gradient/*线性渐变*/
radial-gradient/*径向渐变*/
```

## 用户界面

```css
/*自动内减*/
/*content-box: padding和border不被包含在定义的width和height之内。*/
box-sizing:content-box;
/*border-box: padding和border被包含在定义的width和height之内。*/
```



# CSS 优先级计算规则

优先级就是分配给指定的 CSS 声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。

而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。

当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的 CSS 规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则。

用一个简单的公式来说明一下 CSS 选择器的优先级：

!important (正无穷) > 内联样式(1000) > #id(100) > .class(10)、属性(10)、伪类(10) > tag(1)、伪元素(1) > *(0)、相邻选择器、子代选择器

权重值计算:

| 选择器                         | 案例          | 权重值   |
| ------------------------------ | ------------- | -------- |
| !important                     | !important    | Infinity |
| 内联样式                       | style=".."    | 1000     |
| ID                             | #id           | 100      |
| class                          | .class        | 10       |
| 属性                           | [type='text'] | 10       |
| 伪类                           | :hover        | 10       |
| 标签                           | p             | 1        |
| 伪元素                         | ::first-line  | 1        |
| 相邻选择器、子代选择器、通配符 | * > +         | 0        |

比较规则:

- 1000>100。也就是说从左往右逐个等级比较，前一等级相等才往后比。
- 在权重相同的情况下，后面的样式会覆盖掉前面的样式。
- 继承属性没有权重值
- 通配符、子选择器、相邻选择器等的。虽然权值为0，但是也比继承的样式优先。
- ie6以上才支持`important`，并且尽量少用它。

## !important 说明

使用 `!important` 是一个**坏习惯**，应该尽量避免，因为这破坏了样式表中的固有的级联规则 使得调试找 bug 变得更加困难了。当两条相互冲突的带有 `!important` 规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。

**一些经验法则：**

- **一定**要优先考虑使用样式规则的优先级来解决问题而不是 `!important`
- **只有**在需要覆盖全站或外部 CSS 的特定页面中使用 `!important`
- **永远不要**在你的插件中使用 `!important`
- **永远不要**在全站范围的 CSS 代码中使用 `!important`

- **与其使用** **`!important`****，你可以：**

1. 更好地利用 CSS 级联属性
2. 使用更具体的规则。在您选择的元素之前，增加一个或多个其他元素，使选择器变得更加具体，并获得更高的优先级。

# CSS 弹性盒子布局

> **CSS 弹性盒子布局**是 CSS 的模块之一，定义了一种针对用户界面设计而优化的 CSS 盒子模型。

```css
.box {
	display: flex;
}
```

## 弹性盒子布局主要属性

容器属性：

 1. flex-direction 属性决定主轴的方向（即项目的排列方向）。
 2. flex-wrap 属性定义，如果一条轴线排不下，如何换行。
 3. flex-flow 属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
 4. justify-content 属性定义了项目在主轴上（即相当于X轴）的对齐方式。
 5. align-items 属性定义项目在交叉轴上（即Y轴上）如何对齐。
 6. align-content 属性定义了多根轴线的对齐方式。

项目属性：

 1. order 属性定义项目的排列顺序
 2. flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
 3. flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
 4. flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
 5. flex 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。
 6. align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

## CSS 属性 - flex

`flex` 属性简写详解：

此属性是以下 CSS 属性的简写：

- `flex-grow` 增长系数
- `flex-shrink` 元素的收缩规则
- `flex-basis` 初始大小

CSS属性 **`flex-grow`**设置了一个flex项主尺寸的 flex 增长系数。它指定了 flex 容器中剩余空间的多少应该分配给项目（flex增长系数）。

CSS属性 **`flex-shrink`** 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

CSS属性 属性 **`flex-basis`** 指定了 flex 元素在主轴方向上的初始大小。如果不使用  `box-sizing`改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

语法：

可以使用一个，两个或三个值来指定 `flex`属性。

**单值语法**: 值必须为以下其中之一:

- 一个无单位**数`(<number>)`**: 它会被当作`<flex-grow>的值。`
- 一个有效的**宽度(`width`)**值: 它会被当作 `<flex-basis>的值。`
- 关键字`none`，`auto`或`initial`.

**双值语法**: 第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。第二个值必须为以下之一：

- 一个无单位数：它会被当作 `<flex-shrink>` 的值。
- 一个有效的宽度值: 它会被当作 `<flex-basis>` 的值。

**三值语法:**

- 第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。
- 第二个值必须为一个无单位数，并且它会被当作 `<flex-shrink>` 的值。
- 第三个值必须为一个有效的宽度值， 并且它会被当作 `<flex-basis>` 的值。

大多数情况下，开发者需要将 `flex` 设置为以下值之一： `auto`，`initial`，`none`，或一个无单位正数。

```css
/* 关键字值 */
flex: auto;
flex: initial;
flex: none;

/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/*全局属性值 */
flex: inherit;
flex: initial;
flex: unset;
```

# CSS 属性

## object-fit

**`object-fit`** CSS 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。

您可以通过使用 `object-position` 属性来切换被替换元素的内容对象在元素框内的对齐方式。

### 取值

- `contain`

  被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“[黑边](https://zh.wikipedia.org/wiki/黑邊)”。

- `cover`

  被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

- `fill`

  被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

- `none`

  被替换的内容将保持其原有的尺寸。

- `scale-down`

  内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

## word-break

CSS 属性 `word-break` 指定了怎样在单词内断行。

**语法：**

```css
/* Keyword values */
word-break: normal; 
word-break: break-all; 
word-break: keep-all;
word-break: break-word; /* deprecated */

/* Global values */
word-break: inherit;
word-break: initial;
word-break: unset;
```

**值:**

- `normal` 使用默认的断行规则。

- `break-all` 对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。

- `keep-all` CJK 文本不断行。 Non-CJK 文本表现同 `normal`。

- `break-word` 他的效果是`word-break: normal` 和 `overflow-wrap: anywhere` 的合，不论 `overflow-wrap`的值是多少。



## white-space

CSS 属性`white-space` 是用来设置如何处理元素中的空白。

语法：

```css
/* Keyword values */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;

/* https://github.com/w3c/csswg-drafts/pull/2841 */
white-space: break-spaces;

/* Global values */
white-space: inherit;
white-space: initial;
white-space: unset;	
```

**值:**

- `normal`

  连续的空白符会被合并，换行符会被当作空白符来处理。换行在填充「行框盒子」时是必要。

- `nowrap`

  和 normal 一样，连续的空白符会被合并。但文本内的换行无效。

- `pre`

  连续的空白符会被保留。在遇到换行符或者`<br>`元素时才会换行。 

- `pre-wrap`

  连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充「行框盒子」时才会换行。

- `pre-line`

  连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充「行框盒子」时会换行。

- `break-spaces`与 `pre-wrap`的行为相同，除了：
  - 任何保留的空白序列总是占用空间，包括在行尾。
  - 每个保留的空格字符后都存在换行机会，包括空格字符之间。
  - 这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容大小和最大内容大小）。

对于展示文章可以结合使用

```css
.article{
  /*连续的空白符会被保留。在遇到换行符或者<br>元素，或者需要为了填充「行框盒子(line boxes)」时才会换行。*/
	white-space: pre-wrap;
	/*对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。*/
	word-break: break-all;
}
```



# 页面导入样式时，使用link和@import有什么区别？

- 区别1：`link` 是 **XHTML 标签**，除了加载 **CSS** 外，还可以定义 **RSS** 等其他事务；`@import `属于 **CSS** 范畴，只能加载 **CSS**。
- 区别2：`link` 引用 **CSS** 时，在页面载入时同时加载；`@import`需要页面网页完全载入以后加载。
  所以会出现一开始没有 **CSS** 样式，闪烁一下出现样式后的页面(网速慢的情况下)
- 区别3：`link` 是XHTML标签，无兼容问题；`@import `是在 **CSS2.1** 提出的，低版本的浏览器不支持。
- 区别4：`link` 支持使用 **Javascript** 控制 **DOM** 去改变样式；而`@import`不支持。



# CSS 实现垂直水平居中

> 不定宽高的盒子水平居中

## 使用 flex 布局

```css
/*1.使用flex布局*/
/*1.1方案*/
/*设置父盒子：*/
display:flex;
justify-content:center;
align-item:center;/*侧轴只有单个元素*/
/*1.2方案（单个元素）*/
/*设置父盒子：*/
display:flex;
/*设置要居中的DIV：*/
margin:auto;



```

## 使用绝对定位配合 transform

```css
/*2.使用CSS3 transform*/
/*设置父盒子：*/
display:relative;
/*设置要居中的DIV：*/
transform:translate(-50%,-50%);
top:50%;
left50%;
position:absolute;
```

## 使用表格布局

```css
/*3.使用display:table-cell方法(拓展)*/
/*设置父盒子：*/
display:table-cell;
text-align:center;
vertical-align:middle;
/*设置要居中的DIV：*/
display:inline-block;
vertical-align:middle;
```

## 使用 grid 布局

```css
/*4.grid布局 (最新浏览器支持,只支持IE10及以上，兼容性不如flex优先使用flex)*/
/*设置父盒子：*/
display: grid;
align-items:center;
justify-content: center;
```

# 简述一下 src 与 href 的区别

`href` 是指向「网络资源」所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

`src`   是指向「外部资源」的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 `src` 资源时会将其指向的资源下载并应用到文档内，例如 js脚本，img图片 和 frame等元素。

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js脚本放在底部而不是头部。

# px 和 em 的区别

相同点：px 和 em 都是长度单位；

异同点：px 的值是固定的，指定是多少就是多少，计算比较容易。em 的值不是固定的，并且 em 会继承父级元素的字体大小。

浏览器的默认字体高都是16px。所以未经调整的浏览器都符合: 1em=16px。那么12px=0.75em, 10px=0.625em。

px 是 CSS中的逻辑像素，和移动端的物理像素之间会有一个比值dpr。

px 是固定的值,无论页面放大或者缩小都不会改变。
em 是指相对于父元素的大小如果父元素的字体为 12px，那么子元素 1em 就是 24px。由于是相对父级的倍数，所以多层嵌套时，倍数关系的计算会很头痛。

rem 中的 r 就是 root，也就是相对于 root元素(html标签) 的字体大小的倍数。如果不做任何修改，浏览器默认字体大小为 16px。

默认情况下： 1 em = 10 px 、1 rem = 16 px

# 什么叫优雅降级和渐进增强？

**渐进增强** progressive enhancement：

针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

**优雅降级** graceful degradation：

一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

**区别**：

1. 优雅降级是从复杂的现状开始，并试图减少用户体验的供给

2. 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要

3. 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带

# CSS的优先级是如何计算的？

!important (正无穷) > 内联样式(1000) > #id(100) > .class(10)、属性(10)、伪类(10) > tag(1)、伪元素(1) > *(0)、相邻选择器、子代选择器

## 权重值计算

| 选择器                         | 案例          | 权重值   |
| ------------------------------ | ------------- | -------- |
| !important                     | !important    | Infinity |
| 内联样式                       | style=".."    | 1000     |
| ID                             | #id           | 100      |
| class                          | .class        | 10       |
| 属性                           | [type='text'] | 10       |
| 伪类                           | :hover        | 10       |
| 标签                           | p             | 1        |
| 伪元素                         | ::first-line  | 1        |
| 相邻选择器、子代选择器、通配符 | * > +         | 0        |

## 比较规则

- 1000>100。也就是说从左往右逐个等级比较，前一等级相等才往后比。
- 在权重相同的情况下，后面的样式会覆盖掉前面的样式。
- 继承属性没有权重值
- 通配符、子选择器、相邻选择器等的。虽然权值为0，但是也比继承的样式优先。
- ie6以上才支持`important`，并且尽量少用它。