# Node.js

主要应用场景是前端工具和服务端。

## module对象

每个自定义js文件都有一个 module 对象，module 变量就代表当前模块，用于存储当前模块的信息，最值得关注的是`exports`对象，默认为空对象(`{}`)。

```js
// module.exports和exports指向同一个对象
exports === module.exports // true
// 最终require只会得到module.exports输出对象的两个属性
exports.name = 'L'
module.exports = {
  age: 18,
  job: 'developer'
}
// 最终require只会得到module.exports输出对象的 name 属性
// 一开始 module.exports 和 exports 都指向同一个对象，后边exports指向了另一个对象，require时只会得到 module.exports 输出的对象
module.exports.name = 'L'
exports = {
  age: 18,
  job: 'developer'
}
// require得到 {name: 'Len',age: 18}
module.exports.name = 'L'
exports.age = 18
```
> - module.exports和exports指向同一个对象，初始值为{}
> - require模块时，得到的永远是 module.exports 指向的对象。所以不建议在同一个模块当中同时使用 exports 和 module.exports ，而是**推荐单独使用 module.exports 来输出对象**


## process对象

process包含许多信息和方法

- exit() 中止Node程序的方式之一
- env 对象包含环境变量
- cwd 返回应用程序当前的工作目录

## 启动服务

用HTTP模块开启服务之后，可以使用命令行程序`crul`测试（或者使用 Wget）

```bash
# 访问web资源
curl -i http://localhost:3030
# 返回值
HTTP/1.1 200 OK
Content-Length: 14
Content-Type: text/plain
Date: Fri, 29 Apr 2022 09:22:59 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello World!!
```


## require()模块的加载机制

1. **模块在第一次加载后会被缓存**，这也意味着多次调用 require() 不会导致模块代码被执行多次。
2. 会优先加载内置模块。如fs、url、http等模块，内建模块直接从内存加载。
3. require 自定义模块时，会依次尝试加载`.js`、`.json`、`.node` 文件
4. 第三方模块的加载则会一层一层往上目录查找`node_module`文件夹
5. 加载目录时，会查找 package.json 文件中的`main`属性作为`require`加载的入口。或者寻找`index.js`文件。


## http

## stream

## buffer

## net


## 值得关注的第三方包

- mkdirp(node 10+已经实现)
- fs-extra，相对于 fs 模块新增了功能
- fs-events 监听文件变化
- graceful-fs
- glob: ls -lah *.js
- braces

