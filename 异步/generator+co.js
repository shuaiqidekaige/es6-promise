function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let { value, done } = it.next(data);
            if (!done) {
               Promise.resolve(value).then((value) => {
                   next(value);
               }, reject)
            } else{
                resolve(value);
            }
        }
        next();
    })
}

function * gen() {
    let a = yield 1;
    let b = yield 2;

    return b;
}

co(gen()).then((value) =>{
    console.log(value)
})