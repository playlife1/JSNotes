# Ajax 五大步骤　

1. 创建`XMLHTTPRequest`对象

1. 使用open方法创建http请求,并设置请求地址 ( POST请求,需要设置请求头 )
   
3. 设置发送的数据，开始和服务器端交互

4. 注册事件(状态监听事件)

5. 获取响应并更新界面


# HTTP 协议

## 请求

客户端发出的请求，主要由三个组成部分：请求行、请求头、请求主体

**1、请求行：**

- 请求方法：GET or POST

- 请求URL

- HTTP协议版本

**2、请求头：**

```
User-Agent：浏览器的具体类型　　如：User-Agent：Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0

Accept：浏览器支持哪些数据类型　　如：Accept: text/html,application/xhtml+xml,application/xml;q=0.9;

Accept-Charset：浏览器采用的是哪种编码　　如：Accept-Charset: ISO-8859-1

Accept-Encoding：浏览器支持解码的数据压缩格式　　如：Accept-Encoding: gzip, deflate

Accept-Language：浏览器的语言环境　　如：Accept-Language zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3

Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。Host:www.baidu.com

Connection：表示是否需要持久连接。
属性值可以是Keep-Alive/close，HTTP1.1默认是持久连接，它可以利用持久连接的优点，当页面包含多个元素时（例如Applet，图片），显著地减少下载所需要的时间。
要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入ByteArrayOutputStream，然后在正式写出内容之前计算它的大小。如：Connection: Keep-Alive

Content-Length：表示请求消息正文的长度。对于POST请求来说Content-Length必须出现。

Content-Type：WEB服务器告诉浏览器自己响应的对象的类型和字符集。例如：Content-Type: text/html; charset='gb2312'

Content-Encoding：WEB服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象。例如：Content-Encoding：gzip

Content-Language：WEB服务器告诉浏览器自己响应的对象的语言。

Cookie：最常用的请求头，浏览器每次都会将cookie发送到服务器上，允许服务器在客户端存储少量数据。

Referer：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。服务器能知道你是从哪个页面过来的。Referer: http://www.baidu.com/
```

**3、请求体：**

指的是提交给服务器的数据。

需要注意的是，如果是往服务器提交数据，需要在请求头中设置`Content-Type: application/x-www-form-urlencoded`(在ajax中需要手动设置)。

### **GET 和 POST 方法的区别**：

| 分类             | GET                                                          | POST                                                         |
| :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 后退按钮/刷新    | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）。     |
| 书签             | 可收藏为书签                                                 | 不可收藏为书签                                               |
| 缓存             | 能被缓存                                                     | 不能缓存                                                     |
| 编码类型         | application/x-www-form-urlencoded                            | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史             | 参数保留在浏览器历史中。                                     | 参数不会保存在浏览器历史中。                                 |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。 | 无限制。                                                     |
| 对数据类型的限制 | 只允许 ASCII 字符。                                          | 没有限制。也允许二进制数据。                                 |
| 安全性           | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。 |
| 可见性           | 数据在 URL 中对所有人都是可见的。                            | 数据不会显示在 URL 中。                                      |

注意，并不是所有浏览器都如此，上述区别在大部分**实现了 HTTP 标准的浏览器**上是存在的

从标准上来看，GET 和 POST 的区别如下：

- GET 用于获取信息，是无副作用的，是幂等的，且可缓存

- POST 用于修改服务器上的数据，有副作用，非幂等，不可缓存

*幂等*（idempotent、idempotence）是一个数学与计算机学概念，常见于抽象代数中。

> 在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同

## 响应

响应报文是服务器返回给客户端的。组成部分有响应行、响应头、响应主体。

**1、状态行：**

HTTP响应行：主要是设置响应状态等信息。

**2、响应头：**

Cookie、缓存等信息就是在响应头的属性中设置的。

常见的响应头如下：

```
Cache-Control

响应输出到客户端后，服务端通过该报文头属告诉客户端如何控制响应内容的缓存。

下面，的设置让客户端对响应内容缓存3600秒，也即在3600秒内，如果客户再次访问该资源，直接从客户端的缓存中返回内容给客户，不要再从服务端获取（当然，这个功能是靠客户端实现的，服务端只是通过这个属性提示客户端“应该这么做”，做不做，还是决定于客户端，如果是自己宣称支持HTTP的客户端，则就应该这样实现）。

Cache-Control: max-age=3600

ETag

一个代表响应服务端资源（如页面）版本的报文头属性，如果某个服务端资源发生变化了，这个ETag就会相应发生变化。它是Cache-Control的有益补充，可以让客户端“更智能”地处理什么时候要从服务端取资源，什么时候可以直接从缓存中返回响应。

ETag: "737060cd8c284d8af7ad3082f209582d"

Location

我们在Asp.net中让页面Redirect到一个某个A页面中，其实是让客户端再发一个请求到A页面，这个需要Redirect到的A页面的URL，其实就是通过响应报文头的Location属性告知客户端的，如下的报文头属性，将使客户端redirect到iteye的首页中：

Location: http://www.google.com.hk

Set-Cookie

服务端可以设置客户端的Cookie，其原理就是通过这个响应报文头属性实现的。

Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1

```

**3、HTTP响应体：**

如果请求的是HTML页面，那么返回的就是HTML代码。如果是JS就是JS代码。



# Ajax

## 同步和异步

### 同步和异步的概念


- 同步：必须等待前面的任务完成，才能继续后面的任务。

- 异步：不受当前任务的影响。

拿排队举例：

- 同步：在银行排队时，只有等到你了，才能够去处理业务。

- 异步：在排队的时候，可以玩手机。

### 异步更新网站

我们在访问一个普通的网站时，当浏览器加载完`HTML、CSS、JS`以后，网站的内容就固定了。如果想让网站内容发生更改，就必须**刷新**页面才能够看到更新的内容。

可如果用到**异步更新**，情况就大为改观了。比如，我们在访问新浪微博时，看到一大半了，点击底部的**加载更多**，会自动帮我们加载更多的微博，同时页面并没有刷新。

试想一下，如果没有异步刷新的话，每次点击“加载更多”，网页都要刷新，体验就太不好了。

Web前端里的异步更新，就要用到 Ajax。

## Ajax

### Ajax 的概念

在浏览器中，我们可以在不刷新页面的情况下，通过ajax的方式去获取一些新的内容。

Ajax：Asynchronous Javascript And XML（异步 JavaScript 和 XML）。它并不是凭空出现的新技术，而是对于现有技术的结合。Ajax 的核心是 js 对象：**XMLHttpRequest**。

### 发送 Ajax 请求的五个步骤

> 其实也就是 使用 XMLHttpRequest 对象的五个步骤。

我们先回忆一下，一个完整的HTTP请求需要的是：

- 请求的网址、请求方法get/post。

- 提交请求的内容数据、请求主体等。

- 接收响应回来的内容。

发送 Ajax 请求的五个步骤：

（1）创建异步对象。即 XMLHttpRequest 对象。

（2）使用open方法设置请求的参数。open(method, url, async)。参数解释：请求的方法、请求的url、是否异步。

（3）发送请求。

（4）注册事件。 注册onreadystatechange事件，状态改变时就会调用。

如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。

（5）获取返回的数据。

## Ajax 请求：get 请求举例

index.html

```html
<body>
        <h1>Ajax 发送 get 请求</h1>
        <input type="button" value="发送get_ajax请求" id="btnAjax" />
        <script>
            // 绑定点击事件
            document.querySelector('#btnAjax').onclick = function () {
                // 发送ajax 请求 需要 五步
                // （1）创建异步对象
                var ajaxObj = new XMLHttpRequest();
                // （2）设置请求的参数。包括：请求的方法、请求的url。
                ajaxObj.open('get', './get.html');
                // （3）发送请求
                ajaxObj.send();
                //（4）注册事件。 onreadystatechange事件，状态改变时就会调用。
                //如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
                ajaxObj.onreadystatechange = function () {
                    // 为了保证 数据 完整返回，我们一般会判断 两个值
                    if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
                        // 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                        // 5.在注册的事件中 获取 返回的 内容 并修改页面的显示
                        console.log('数据返回成功');
                        // 数据是保存在 异步对象的 属性中
                        console.log(ajaxObj.responseText);
                        // 修改页面的显示
                        document.querySelector('body').innerHTML =
                            ajaxObj.responseText;
                    }
                };
            };
        </script>
    </body>
```

Ajax 请求：post 请求举例

```js
//1.创建异步对象                            ------>对比get请求
let postObj = new XMLHttpRequest();     // var ajaxObj = new XMLHttpRequest();
//2.设置请求的参数：请求的方法、url
postObj.open('post', './post.html');    // ajaxObj.open('get', './get.html');
//3.发送请求
// 如果想要使用post提交数据,必须添加此行
postObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 将数据通过send方法传递
postObj.send('name=fox&age=18');        // ajaxObj.send();

// 发送并接受返回值
postObj.onreadystatechange = function () {  //ajaxObj.onreadystatechange = function () {
    // 这步为判断服务器是否正确响应
    if (postObj.readyState == 4 && postObj.status == 200) { // if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        alert(postObj.responseText);                    // 更新内容
    }
};

```

## XMLHttpRequest 对象详解

### 发送请求

发送请求的方法：

```js
open(method, url, async);
```

参数解释：

- method：请求的类型；GET 或 POST

- url：文件在服务器上的位置

- async：true（异步）或 false（同步）

另外还有个方法：（仅用于 POST 请求）

```javascript
send('string');//（仅用于 POST 请求）
```

### POST 请求时注意‼️

如果想让 像`form`表单提交数据那样使用POST请求，就需要使用`XMLHttpRequest` 对象的 `setRequestHeader()`方法 来添加 HTTP 头。然后在 `send()` 方法中添加想要发送的数据：

```js
xmlhttp.open("POST","ajax_test.html", true);

xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xmlhttp.send("name=playlife&age=23");
```

### `onreadystatechange` 事件‼️

注册 `onreadystatechange` 事件后，每当 `readyState` 属性改变时，就会调用 `onreadystatechange` 函数。

`readyState`：（存有 `XMLHttpRequest` 的状态。从 0 到 4 发生变化）

- 0: 请求未初始化

- 1: 服务器连接已建立

- 2: 请求已接收

- 3: 请求处理中

- 4: 请求已完成，且响应已就绪

`status`：

- 200: "OK"。

- 404: 未找到页面。

在 `onreadystatechange` 事件中，**当 readyState 等于 4，且状态码为200时，表示响应已就绪**。

### 服务器响应的内容

- `responseText`：获得 *字符串形式* 的响应数据。

- `responseXML`：获得 *XML* 形式的响应数据。

如果响应的是普通字符串，就使用``responseText`；如果响应的是XML，使用`responseXML`。

## Ajax 传输 XML

### XML 语法

XML（Extensible Markup Language）：可扩展标记语言。

**1、XML声明：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

第一行的声明，指定了XML版本(1.0)以及使用的编码。

**2、自定义标签：**

XML中没有默认的标签，所有的标签都是我们自己已定义的。例如：

```xml
<fox></fox>
<name></name>
```

XML中没有单标签，都是双标签。

**3、根节点：**

XML中必须要有一个根节点，所有的子节点都放置在根节点下。例如：

```xml
<root1>
  <name></name>
</root1>
```

### XML 解析

因为 XML 就是标签，所以我们可以直接用**解析Dom元素**的方法解析 XML。

**解析过程：**

(1) html 部分：（包含XML）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <person id='personXML'>
      <name>playlife</name>
      <age>23</age>
      <skill>写代码</skill>
  </person>
</body>
</html>
```

（2）解析 xml：

```js
var xmlObj = document.getElementById("personXML");
var name = xmlObj.getElementsByTagName('name')[0].innerHTML;
console.log(name);
```

## Ajax 请求解析XML（举例）

```js
var ajax = new XMLHttpRequest();

ajax.open('get', 'get_XMl.php');

ajax.send();

ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        // 如果 返回的是 字符串形式文件
        console.log(ajax.responseText);
        // 异步 对象中 有另外一个属性 用来专门获取 xml
        // xml对象 在浏览器段 就是一个 document对象
        // 解析时 可以直接使用 querySelector 或者 getElementById等等 document对象 有的语法
        console.log(ajax.responseXML);
        console.log(ajax.responseXML.querySelector('kuzi').innerHTML);
        // 下面这个 页面文档对象 如果要获取某个标签
        console.log(window.document);
    }
};
```

## Ajax 传输 JSON

### JSON 的语法

JSON(JavaScript Object Notation)：是ECMAScript的子集。作用是进行数据的交换。语法更为简洁，网络传输、机器解析都更为迅速。


语法规则：

- 数据在键值对中

- 数据由逗号分隔

- 花括号保存对象

- 方括号保存数组

数据类型：

- 数字（整数或浮点数）

- 字符串（在双引号中）

- 逻辑值（true 或 false）

- 数组（在方括号中）

- 对象（在花括号中）

- null

```json
// 对象
{
    "name":"fox",
    "age":"18",
    "sex":"true",
    "car":null
}
  
// 数组
[
    {
      "name":"小小胡",
        "age":"1"
    },
    {
       "name":"小二胡",
       "age":"2"
    }
]
```
## JavaScript中：json 字符串 <—> js 对象

在 js中：

- JSON.parse()：将JSON字符串转化为 js 对象。例如：

```javascript
	// 将 JSON 字符串格式化为 js 对象
	var jsObj = JSON.parse(ajax.responseText);
```

- JSON.stringify()：将 JS 对象转化为JSON字符串。例如：

```javascript
var Obj = {
	name: "playlife",
	age: 23,
	skill: "写代码"
};
console.log(Obj);
// 将 js 对象格式化为 JSON 字符串
var jsonStr = JSON.stringify(Obj);
```

解析：

```js
var ajax = new XMLHttpRequest();
ajax.open('get', 'json');
ajax.send();
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        // json 字符串 是字符串 所以我们可以 通过  responseText获取
        console.log(ajax.responseText);
        // 转化为 js对象
        var jsObj = JSON.parse(ajax.responseText);
        console.log(jsObj);
        // 拼接ul
        var str = '';
        str += '<ul>';
        str += '<li>' + jsObj.name + '</li>';
        str += '<li>' + jsObj.skill + '</li>';
        str += '<li>' + jsObj.friend + '</li>';
        str += '</ul>';
        // 设置到界面上
        document.body.innerHTML = str;
    }
};
```

# 函数封装Ajax 

```js
/**
 * @param {String} url url
 * @param {String} data 数据
 * @param {String} method 请求的方法
 * @param {Function} success 数据成功获取以后，调用的方法
 */
function ajaxTool(url, data, method, success) {
    // 异步对象
    var ajax = new XMLHttpRequest();

    // get 跟post  需要分别写不同的代码
    if (method == 'get') {
        // get请求
        if (data) {
            // 如果有值
            url += '?';
            url += data;
        } 
        // 设置 方法 以及 url
        ajax.open(method, url);

        // send即可
        ajax.send();
    } else {
        // post请求
        // post请求 url 是不需要改变
        ajax.open(method, url);

        // 需要设置请求报文
        ajax.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        );

        // 判断data send发送数据
        if (data) {
            // 如果有值 从send发送
            ajax.send(data);
        } else {
            // 木有值 直接发送即可
            ajax.send();
        }
    }

    // 注册事件
    ajax.onreadystatechange = function () {
        // 在事件中 获取数据 并修改界面显示
        if (ajax.readyState == 4 && ajax.status == 200) {
            // console.log(ajax.responseText);

            // 将 数据 让 外面可以使用
            // return ajax.responseText;

            // 当 onreadystatechange 调用时 说明 数据回来了
            // ajax.responseText;

            // 数据成功获取以后，执行方法success()。
            //我们把获取的数据作为 success()的参数，意思是：
            //success方法是外面的，数据是里面给的。那数据就变相地传递到了外面去【重要】
            success(ajax.responseText);
        }
    };
}

```

# XMLHttpRequest 2.0

## 旧版XMLHttpRequest的缺点

1. 只支持文本数据的传输，无法用来读取和上传文件
2. 传送和接收数据时，没有进度信息，只能提示有没有完成

## XMLHttpRequest 2.0的新功能

1. 可以设置 HTTP 请求的时限
2. 可以使用 FormData 对象管理表单数据
3. 可以上传文件
4. 可以获得数据传输的进度信息

## 设置 HTTP 请求的时限

> 有时，Ajax 操作很耗时，而且无法预知要花多少时间。如果网速很慢，用户可能要等很久。新版本的 XMLHttpRequest 对象，增加了 timeout 属性，可以设置 HTTP 请求的时限

```js
xhr.timeout = 3000;

// 上面的语句，将最长等待时间设为 3000 毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个 timeout 事件，用来指定回调函数：


xhr.ontimeout = function(event){
    alert('请求超时！')
}
```

# FormData

> `FormData` 接口提供了一种表示表单数据的键值对 `key/value` 的构造方式，并且可以轻松的将数据通过XMLHttpRequest.send()方法发送出去，本接口和此方法都相当简单直接。如果

FormData对象管理表单数据

```js
 // 获取表单元素
 var form = document.querySelector('#form');

 // 监听表单元素的 submit 事件
 form.addEventListener('submit', function(e) {
    e.preventDefault();
     // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
     var fd = new FormData(form);
     var xhr = new XMLHttpRequest();
     xhr.open('POST', 'xxxx');
     xhr.send(fd);
     xhr.onreadystatechange = function() {
         // ...
     }
})
```

## 方法

- `FormData.append()`
  向 `FormData` 中添加新的属性值，`FormData` 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。

- `FormData.delete()`
  从 FormData 对象里面删除一个键值对。
- `FormData.entries()`
  返回一个包含所有键值对的`iterator`对象。

- `FormData.get()`
  `返回在 FormData` 对象中与给定键关联的第一个值。

- `FormData.getAll()`

  返回一个包含 `FormData` 对象中与给定键关联的所有值的数组。

- `FormData.has()`
  `返回一个布尔值表明 FormData` 对象是否包含某些键。

- `FormData.keys()`

  返回一个包含所有键的`iterator`对象。

- `FormData.set()`
  给 `FormData` 设置属性值，如果`FormData` 对应的属性值存在则覆盖原值，否则新增一项属性值。

- `FormData.values()`
  返回一个包含所有值的`iterator`对象。

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

## jQuery deferred 延迟对象

### deferred.done() 方法

当延迟成功时调用一个函数或者数组函数.

> 该参数可以是一个函数或一个函数的数组。当延迟成功时，doneCallbacks被调用。回调执行是依照他们添加的顺序。一旦deferred.done()返回延迟对象，延迟对象的其它方法也可以链接到了这里，包括增加.done()方法。当延迟解决，doneCallbacks执行使用参数提供给resolve或resolveWith方法依照添加的顺序调用。有关详细信息，请参阅[Deferred object](http://api.jquery.com/category/deferred-object/) 。

`deferred.done( doneCallbacks [, doneCallbacks ] )`

Example: *一旦`jQuery.get` 方法返回一个来自延迟的对象的jqXHR对象，我们可以附加一个成功回调使用`.done()` 方法。*

```js
$.get("test.php").done(function() {  alert("$.get succeeded");});
```

## jQuery 提交 FormData数据

```js
$('form').on('submit',function(e){
  e.preventDefault();
  let fd = new FormData(this);
  $.ajax({
    type:'POST',
    //使用FormData需要设置 以下两句
    contentType:false,//jQ底层不要自己去设置,浏览器会设置请求头Content-Type
    processData:false,//不要转换为查询字符串
    data:fd,//传入FormData对象
    url:'?',
    success:function(res){
    },
  });
});
```

## jQuery.ajaxPrefilter()

> 在每个请求之前被发送和`$.ajax()`处理它们前处理，设置自定义Ajax选项或修改现有选项。

```js
jQuery.ajaxPrefilter( [dataTypes ], handler(options, originalOptions, jqXHR) )
```

- `options` 是请求的选项
- `originalOptions` 值作为提供给Ajax方法未经修改的选项，因此，没有`ajaxSettings`设置中的默认值
- `jqXHR` 是请求的jqXHR对象



# 模版引擎

### 引入

我们在使用ajax请求数据时，返回的如果是一个 JSON 格式的字符串，我们需要将其包装到对应的HTML代码中，再添加到页面上，才能看到效果。那么这个包装得过程有没有简单的方法呢?


假设在 js 中有如下数据：

```js
var obj = {
    name: 'playlife',
    age: 23,
    skill: '编程',
};
```

希望包装为:

```html
<ul>
  <li>姓名:playlife</li>
  <li>年龄:23</li>
  <li>爱好:编程</li>
</ul>
```

### 模版插件的原理

我们定义一段文本作为模板,读取文本,使用特殊的符号<%= 属性名 %>,通过正则表达式找到这些特殊的符号进行替换,是不是就实现了这样的效果呢?

### 常见的模板引擎

- BaiduTemplate(百度开发)

- ArtTemplate(腾讯开发)

- velocity.js(淘宝开发)

- Handlebars

# ArtTemplate

## 语法

art-template 支持标准语法与原始语法。标准语法可以让模板易读写，而原始语法拥有强大的逻辑表达能力。

标准语法支持基本模板语法以及基本 JavaScript 表达式；原始语法支持任意 JavaScript 语句，这和 EJS 一样。

> 模版内可以写注释,但是不要出现模版语法,否则会报错

## 输出

**标准语法**

```html
{{value}}
{{data.key}}
{{data['key']}}
{{a ? b : c}}
{{a || b}}
{{a + b}}
```

**原始语法**

```html
<%= value %>
<%= data.key %>
<%= data['key'] %>
<%= a ? b : c %>
<%= a || b %>
<%= a + b %>
```

模板一级特殊变量可以使用 `$data` 加下标的方式访问：

```html
{{$data['user list']}}
```

## 原文输出

**标准语法**

```html
{{@ value }}
```

**原始语法**

```html
<%- value %>
```

> 原文输出语句不会对 `HTML` 内容进行转义处理，可能存在安全风险，请谨慎使用。

## 条件

**标准语法**

```html
{{if value}} ... {{/if}}
{{if v1}} ... {{else if v2}} ... {{/if}}
```

**原始语法**

```html
<% if (value) { %> ... <% } %>
<% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
```

## 循环

**标准语法**

```html
{{each target}}
    {{$index}} {{$value}}
{{/each}}
```

**原始语法**

```html
<% for(var i = 0; i < target.length; i++){ %>
    <%= i %> <%= target[i] %>
<% } %>
```

1. `target` 支持 `array` 与 `object` 的迭代，其默认值为 `$data`。
2. `$value` 与 `$index` 可以自定义：`{{each target val key}}`。

## 变量

**标准语法**

```html
{{set temp = data.sub.content}}
```

**原始语法**

```html
<% var temp = data.sub.content; %>
```

## 模板继承

**标准语法**

```html
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

**原始语法**

```html
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

模板继承允许你构建一个包含你站点共同元素的基本模板“骨架”。范例：

```html
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{block 'content'}}{{/block}}
</body>
</html>
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

渲染 index.art 后，将自动应用布局骨架。

## 子模板

**标准语法**

```html
{{include './header.art'}}
{{include './header.art' data}}
```

**原始语法**

```html
<% include('./header.art') %>
<% include('./header.art', data) %>
```

1. `data` 数默认值为 `$data`；标准语法不支持声明 `object` 与 `array`，只支持引用变量，而原始语法不受限制。
2. art-template 内建 HTML 压缩器，请避免书写 HTML 非正常闭合的子模板，否则开启压缩后标签可能会被意外“优化。

## 过滤器

**注册过滤器**

```html
template.defaults.imports.dateFormat = function(date, format){/*[code..]*/};
template.defaults.imports.timestamp = function(value){return value * 1000};
```

过滤器函数第一个参数接受目标值。

**标准语法**

```html
{{date | timestamp | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
```

`{{value | filter}}` 过滤器语法类似管道操作符，它的上一个输出作为下一个输入。

**原始语法**

```html
<%= $imports.dateFormat($imports.timestamp(date), 'yyyy-MM-dd hh:mm:ss') %>
```

> 如果想修改 `{{` `}}` 与 `<%` `%>`，请参考 [解析规则](https://aui.github.io/art-template/zh-cn/docs/rules.html)。



# Axios

> Axios 是专注于网络数据请求的库。

相比于原生的 XMLHttpRequest 对象，axios 简单易用。 相比于 jQuery，axios 更加轻量化，只专注于网络数据请求。

## axios发起GET请求

```js
axios.get('url', { params: { /*参数*/ } }).then(callback)
```

代码演示

```js
// 请求的 URL 地址
var url = 'http://www.liulongbin.top:3006/api/post';

// 调用 axios.post() 发起 POST 请求
axios.post(url, { location: '北京', address: '顺义' }).then(function(res) {
    // res.data 是服务器返回的数据
    var result = res.data
    console.log(result)
})
```

## axios发起POST请求

```js
axios.post('url', { /*参数*/ }).then(callback)
```

代码演示

```js
// 请求的 URL 地址
var url = 'http://www.liulongbin.top:3006/api/post'

// 调用 axios.post() 发起 POST 请求
axios.post(url, { location: '北京', address: '顺义' }).then(function(res) {
    // res.data 是服务器返回的数据
    var result = res.data
    console.log(result)
})
```

## 直接使用axios发起请求

> axios 也提供了类似于 jQuery 中 $.ajax() 的函数，语法如下：

```js
axios({
    method: '请求类型',
    url: '请求的URL地址',
    data: { /* POST数据 */ },
    params: { /* GET参数 */ }
}) .then(callback)
```

```js
// 发送get请求
axios({
    method: 'GET',
    url: 'http://111.229.6.231:9996/v1/get',
    params: {
        // GET方式发送的数据，需要写在params
        name: 'admin',
        pwd: '123456',
    },
});

// 发送post请求
axios({
    method: 'POST',
    url: 'http://111.229.6.231:9996/v1/post',
    data: {
        // post方式发送的数据，需要写在data
        name: 'admin',
        pwd: '123456',
    },
});

```



# 同源和跨域

## 同源

同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。

![20180228_2231](/Users/johnny/Downloads/知识图谱/20180228_2231.png)

出于安全性考虑，浏览器不允许ajax跨域获取数据。


- iframe：处于安全性考虑，浏览器的开发厂商已经禁止了这种方式。

- JSONP：script 标签的 src 属性传递数据。

## JSONP

> JSONP(JSON with Padding)、可用于解决主流浏览器的跨域数据访问的问题。原理：服务端返回一个预先定义好的 javascript 函数的调用，并且将服务器的数据以该函数参数的形式传递过来，这个方法需要前后端配合。
>
> jsonp: 带补丁的 json, 服务器不直接返回 json , 而是把 json 数据放到函数中作为实参传递

`script` 标签是不受同源策略的限制的，它可以载入任意地方的 JavaScript 文件，而并不要求同源。类似的还有`img`和`link`标签

> script标签指向的资源文件被下载后，其中的内容会被**立即执行**；
>
> 服务器端的程序会解析src属性值中的url传递的参数，根据这些参数针对性返回一个/多个**函数调用表达式**，这些函数调用表达式的**参数**就是客户端跨域想得到的**数据**；
>
> 服务器生成、返回的文件中，表达式**调用的函数**是已经在本地提前定义好的，而参数就是希望从跨域服务器拿到的数据。
>
> 字面的script标签可以，动态添加到dom树中的script也可以，后者更方便绑定事件。

```html
<!--不受同源策略的标签-->
<img src="http://www.api.com/1.jpg" alt="" />
<link rel="stylesheet" href="http://www.api.com/1.css" />
<script src="http://www.api.com/1.js"></script>
```

说白了，jsonp 的原理就是 借助了 script 标签不受同源策略的限制，在服务端返回一个函数的调用，将数据作为当前调用函数的实参。 在浏览器端，需要程序要声明一个函数，通过形参就可以获取到服务端返回的对应的值。

jsonp 原理大家知道即可，因此 jquery 已经帮我们封装好了，我们使用起来非常的方便。

**指定callback**

```js
<script src="http://www.api.com/1.js?callback=fn"></script>
```

#####  JSONSP的套路：

 **核心**：script标签不受同源策略的限制， 通过script发送请求获取数据

 **前端**：

1. 通过script来请求接口数据

2. 在页面提前准备好fn函数，并且通过fn函数的形参可以来接受到数据

后端：

1. 接口里面提供的是fn函数的调用，并且把响应的数据作为fn函数的实参。

##  jQuery 对于 JSONP 的封装

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

## 跨域资源共享(CORS)

> 新版本的 XMLHttpRequest 对象，可以向不同域名的服务器发出 HTTP 请求。这叫做["跨域资源共享"](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing)（Cross-origin resource sharing，简称 CORS）。

跨域资源共享（CORS）的前提

- 浏览器支持这个功能
- 服务器必须允许这种跨域。

服务器允许跨域的代码：

```js
//允许所有的域名访问这个接口
header("Access-Control-Allow-Origin:*");
//允许www.playlife.com这个域名访问这个接口
header("Access-Control-Allow-Origin:http://www.playlife.com");
```

## CORS 的具体流程（了解）

1. 浏览器会向发送一条请求，服务器接受到请求之后，会返回请求头信息，浏览器查看返回的响应头信息中是否设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`
2. 如果没有设置，说明服务器不允许使用 cors 跨域，那么浏览器会把获取到的数据拦截。
3. 如果返回的响应头中设置了`header('Access-Control-Allow-Origin:请求源域名或者*');`,浏览器会跟请求头中的`Origin: http://www.study.com`进行对比，如果满足要求，就把数据发送给用户。
4. 结论：**跨域行为是浏览器行为，是浏览器阻止了 ajax 行为。服务器与服务器之间是不存在跨域的问题的**

## JSONP 与 CORS 的对比

- jsonp 兼容性好，老版本浏览器也支持，但是 jsonp 仅支持 get 请求，发送的数据量有限。使用麻烦
- cors 需要浏览器支持 cors 功能才行。但是使用简单，**只要服务端设置允许跨域，对于客户端来说，跟普通的 get、post 请求并没有什么区别。**
- 跨域的安全性问题：很多同学会觉得跨域能带来安全性问题，其实并不会，**因为跨域是需要服务端配合的** ，也就是说不论 jsonp 还是 cors，如果没有服务端的允许，浏览器是没法做到跨域的。



# Form 表单补充

```html
<progress max="100" value="5"></progress>
<!--进度条-->
```

# XMLHttpRequest.upload

**XMLHttpRequest.upload 属性返回一个** `XMLHttpRequestUpload`对象，用来表示上传的进度。这个对象是不透明的，但是作为一个XMLHttpRequestEventTarget，可以通过对其绑定事件来追踪它的进度。

可以被绑定在upload对象上的事件监听器如下：

| 事件          | 相应属性的信息类型               |
| ------------- | -------------------------------- |
| `onloadstart` | 获取开始                         |
| `onprogress`  | 数据传输进行中                   |
| `onabort`     | 获取操作终止                     |
| `onerror`     | 获取失败                         |
| `onload`      | 获取成功                         |
| `ontimeout`   | 获取操作在用户规定的时间内未完成 |
| `onloadend`   | 获取完成（不论成功与否）         |

`onprogress` 事件对象 `e.total` 属性代表上传文件整体大小 `e.loaded` 属性代表目前上传文件大小

