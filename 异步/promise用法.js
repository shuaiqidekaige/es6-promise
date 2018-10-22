// demo1 
const p1 = new Promise((resolve, reject) => {
    resolve(1);
})

p1.then((val) => {
    console.log(val)
})
//  demo2
const p2 = new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
})

p2.then((val) => {
    console.log(val)
})

// demo3
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000);
})

p3.then((val) => {
    console.log(val)
})

// demo4
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    }, 2000);
})

p4.then(null, (reason) =>{
    console.log(reason)
})

// demo5
const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    }, 2000);
})

p5.catch((reason) =>{
    console.log(reason)
})