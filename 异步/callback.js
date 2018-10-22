// 有一个函数可以接收一个函数，可以根据条件选择执行这个函数

function checkType(type) {
    return function(str) {
        let sort = Object.prototype.toString.call(str);
        return sort.replace(/(\[object\s)|(\])/g, '') === type;
    }
}

const isType = checkType('Number');
console.log(isType(1));

//  根据调用次数 来打印结果

function checkTime(times, fn) {
    return function() {
        if (--times === 0) {
            fn();
        }
    }
}

const fn = checkTime(3, function() {
    console.log('我调用了3次')
});

fn();
fn();
fn();