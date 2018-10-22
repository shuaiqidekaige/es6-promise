// 其实就是generator+co的语法糖
async function ays() {
    let a = await 1;
    let b = await a;

    return b;
}

ays().then((value) => {
    console.log(value)
})