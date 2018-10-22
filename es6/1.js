// 深拷贝
function deepClone(obj) {
    if (obj === null)  return obj;
    if (typeof obj !== 'object') return obj;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);

    let constrouct = new obj.constrouct;
    for (let key in obj) {
        constrouct[key] = deepClone(obj[key]);
    }
    return constrouct;
}