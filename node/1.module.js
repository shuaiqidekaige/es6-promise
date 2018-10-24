
let vm = require('vm');

let fn  =  `(function a(){console.log('执行了,不依赖外界环境,沙箱')})()`

vm.runInThisContext(fn)  //  这个环境叫做沙箱

/* fs模块 */
let fs = require('fs');

try {
    fs.accessSync('1.js'); // 同步的 检测文件是否存在 不存在就报错
} catch (error) {
    console.log('不存在')
} 

/* path模块 */
let path = require('path');

console.log(path.resolve('a'))  // 将a转化成绝对路径
console.log(__dirname);  // 当前文件夹所在的绝对路径
console.log(path.resolve(__dirname,'a'))  // 依次将参数转化为绝对路径 延用上次的路径拼接
console.log(path.resolve('/','a'))   // 特例  遇到 / 就会变回根目录

console.log(path.join(__dirname, 'a'))   // 拼接两次路径
console.log(path.join(__dirname, '/'))   // 遇到 / 不会回到根目录 继续拼接

console.log(path.extname('1.min.js'));  // 获取扩展名

console.log(path.basename('1.min.js', '.js'));   // 获取除掉第二个参数的剩余的名


