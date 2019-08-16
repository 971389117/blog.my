#  ES6 module | 模块化

## export default 默认导入

输出一个默认变量,输入可以取任意的名字
```js
// a.js
export default function(){}
// b.js
import customName from "./a";
```

## 其它导入方式

### 模式 1

同时输出多个变量,同时导入多个变量
```js
//a.js
function a(){}
b="B"
c=3
export {a,b,c}
// b.js
import {a,b,c} from './a';
```
### 模式 2
边定义边输出
```js
// a.js
export function a(){}
export const b="A";
c="hello world"
// b.js
import {a,b,c} from "./a"
```
### 模式 3 整体加载
把所有输出打包成一个对象整体加载
```js
// a.js
export function area(){}
export function length(){}
// b.js
import * as circle from './circle'

circle.area
```

## 导入导出重命名

```js
// a.js
let a="大名"
export {a as xiaoA}
// b.js
import {xiaoA as daA} from './a';
```
## other 其它

```js
import "lodash";
```

上面的代码仅仅执行`lodash`模块,但是不输入任何值.
多次 import 同意语句,只执行一次.

## 笔记
:::tip
1. 动态值:export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
2. 只读性(单向数据流):
import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
上面代码中，重写 d 的值就会报错，因为d是一个只读的接口。但是，如果d是一个对象，改写d的属性是允许的。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。
:::
