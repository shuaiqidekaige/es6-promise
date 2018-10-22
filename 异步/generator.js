function * gen(a) {
    let b = yield a;
    return undefined;
}

const a = gen('1');

let flag = false;
do {
    let { done, value } = a.next();
    flag = done;
    console.log(value);
} while(flag);