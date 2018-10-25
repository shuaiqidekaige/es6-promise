let path = require('path');
let fs = require('fs');
let vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {};
}
Module.wrapper = ['(function(module, exports, id){', '\n})'];
Module.wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1];
}
// 扩展名
Module._extensions = {
    '.js'(module) {
       let fn  =  fs.readFileSync(module.id, 'utf8');
       let m = vm.runInThisContext(Module.wrap(fn))
       m(module, module.exports, module.id);
    },
    '.json'(module) {
        module.exports =  fs.readFileSync(module.id, 'utf8');
    }
}

// 解析文件绝对路径
Module._resolveFileName = function(filename) {
    let r = path.resolve(__dirname, filename);
    if(!path.extname(r)) {
        let extnames = Object.keys(Module._extensions);
        for (let i = 0; i < extnames.length; i++) {
            let p = r + extnames[i];
            try {
              fs.accessSync(p); 
              return p;
            } catch (e) {
              
            }
          }
    } else {

    }

}

// 加载模块
Module._loadModule = function(filename) {
    let r = Module._resolveFileName(filename);
    let module = new Module(r);
    // 加载模块
    let ext = path.extname(module.id);
    Module._extensions[ext](module);

    return module.exports;
}


function req(id) {
   return Module._loadModule(id);
}

let sj = req('./user');  // 会先找js, 再找json

sj()