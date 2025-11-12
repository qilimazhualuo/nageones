/**
 * 生成一个符合UUID v4格式的全局唯一标识符（GUID）。
 * UUID v4格式为：xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx，其中x为随机生成的十六进制数字，y为8、9、A或B中的一个。
 * @returns {string} 返回一个符合UUID v4格式的字符串。
 */
export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

/**
 * 顺序执行promise，任意一个失败则返回失败的reject，全部成功则返回最后一个resolve
 * @param {Array} promises 由函数组成的数组，每个函数应当返回一个promise
 * @returns Promise
 */
export const doPromise = (promises) => {
    return new Promise(async(resolve, reject) => {
        const result = []
        let lastRes
        for (let i = 0; i < promises.length; i++) {
            try {
                const res = await promises[i](lastRes)
                result.push(res)
                lastRes = res
            } catch (err) {
                return reject(err)
            }
        }
        resolve(result)
    })
}