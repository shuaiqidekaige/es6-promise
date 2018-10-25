
//  buffe创建后不能修改长度
let buf1 = Buffer.alloc(3);   // 3代表字节

console.log(buf1)

let buf2 = Buffer.from([1,2])  // 可以存放数组和字符串

let buf3 = Buffer.from('陈圣凯')
console.log(buf3.length);

let buf2 = Buffer.from([1,2]);
let newBuffer = buf2.slice(0,1)
console.log(newBuffer[0])
newBuffer[0] = 3;
console.log(newBuffer)


let buf1 = Buffer.alloc(12);
let buf2 = Buffer.from('陈');
console.log(buf1)
buf2.copy(buf1, 0, 0, 3)   // 拷贝

console.log(buf1)

let buf1 = Buffer.alloc(12);
let buf2 = Buffer.from('陈');
let buf3 = Buffer.concat([buf2, buf1], 3);

console.log(buf3.toString())

console.log(buf2.indexOf('陈'))