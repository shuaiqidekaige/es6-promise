const resolvePromise = Symbol('resolvePromise');
const resovle =  Symbol('resovle');
const reject =  Symbol('reject');

class Promise {
    constructor(exector) {
        this.value = 'undefined';
        this.reason = 'undefined';
        this.status = 'pedding';
        this.onFullFillArr = [];
        this.onFullFailArr = [];

        this[resovle] = this[resovle].bind(this);
        this[reject] = this[reject].bind(this);

        try {
            exector(this[resovle], this[reject]);
        } catch (error) {
            this[reject](error)
        }
    }
    [resovle](value) {
        if (this.status === 'pedding') {
            this.value = value;
            this.status = 'resolved'
        }
    }

    [reject](reason) {
        if (this.status === 'pedding') {
            this.reason = reason;
            this.status = 'reject'
        }
    }
    [resolvePromise](x, promise2, resolve, reject) {
        if (x === promise2) {
            return new TypeError('引用错误')
        } else {
           if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
               try {
                   let then = x.then;
                   if (typeof then === 'function') {
                       let r = then.call(x, resolve, reject);
                       this[resolvePromise](r, promise2, resolve, reject);
                   } else {
                       resolve(x);
                   }
               } catch (error) {
                   reject(error);
               }
           } else {
               resolve(x)
           }
        }
    }
    then(onFullFill, onFullFail) {
        onFullFill = typeof onFullFill === 'function'? onFullFill: (data) => {
            return data;
        }
        onFullFail = typeof onFullFail === 'function'? onFullFail: (data) => {
            return data;
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'resolved') {
               setTimeout(() => {
                    try {
                        let x = onFullFill(this.value);
                        this[resolvePromise](x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
               }, 0);
            }
            if (this.status === 'reject') {
                setTimeout(() => {
                    try {
                        let x =  onFullFail(this.reason);
                        this[resolvePromise](x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
               }, 0);
            }
            if (this.status === 'pedding') {
                this.onFullFillArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullFill(this.value);
                            this[resolvePromise](x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                   }, 0);
                });
                this.onFullFailArr.push(() => {
                    setTimeout(() => {
                        try {
                            let x =  onFullFail(this.reason);
                            this[resolvePromise](x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                   }, 0);
                });
            }
        })
        return promise2;
    }
    catch(fn) {
       return this.then(null, fn);
    }
    finnaly(fn) {
        return this.then((value) => {
            return Promise.resolve(fn()).then(() => value);
        }, (reason) => {
            return Promise.reject(fn()).then(() => reason);
        })
    }
    all(...args) {
        return new Promise((resolve, reject) => {
            let arr = [];
            let currentIndex = 0;

            function pushArr (val, index) {
                arr[index] = val;
                currentIndex++;

                if (currentIndex === arr.length) {
                    resolve(val);
                }
            }

            for(let i = 0; i < args.length; i++) {
                args[i].then((value) => {
                    pushArr(value, i);
                }, reject);
            }
        })
    }
    race(...args) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < args.length; i++) {
                args[i].then(resolve, reject);
            }
        })
    }

}


Promise.resolve = (x) => {
    return new Promise((resolve, reject) => {
        resolve(x);
    })
}

Promise.reject = (x) => {
    return new Promise((resolve, reject) => {
        reject(x);
    })
}

