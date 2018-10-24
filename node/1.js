console.log(this); // 这个this是文件模块

// 在cmd中this指向global
console.log(global);




// process
console.log(process.pid);
process.exit();

process.stdout.write('111');

process.stderr.write('111');

process.stdin.on('data', function(data) {
    console.log(data.toString());
})
process.argv    // 获取输入参数

console.log(process.cwd())
process.chdir('node');
console.log(process.cwd())

process.env.NODE_ENV  // 设置环境变量





