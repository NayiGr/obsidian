- `Object.assign()`
- `Array.from()`    // 以类数组或可迭代对象作为参数创建一个新数组
- `Array.of()`    // 以(不限类型数量)参数创建为一个数组

`Array.prototype`(指代实例数组)
- `Array.prototype.fill(填充内容, 起始索引, 终止索引)`    // 固定值填充数组
- `Array.prototype.find()`    // 找到满足参数函数条件的第一个元素的值
- `Array.prototype.filter()`    // 找到满足参数函数条件的所有元素的值
- `Array.prototype.findIndex()`    // 找到满足参数函数条件的第一个元素的索引^[注：`.findIndex()`搜索条件自定义，`.indexOf()`搜索与条件(/值)相等]
- `Array.prototype.copyWithin()`
- `Array.prototype.entries()`    // 返回新的Array Iterator对象，包含数组中每个索引的键值对
- `Array.prototype.keys()`    // 返回包含数组每个索引键的Array Iterator
- `Array.prototype.values()`    // 返回包含数组每个值的Array Iterator

- `String.prototype.includes()`    // /.indexOf() /.search()
- `String.prototype.repeat()`    // 返回本字符串重复次数为参数的新字符串
- `String.prototype.startsWith()`
- `String.prototype.endsWith()`
- `String.prototype.padStart(目标长度，填充字符)`    // 从开头以填充字符填充到字符串长度满足目标长度
- `String.prototype.padEnd(目标长度，填充字符)`    // 从末尾以填充字符填充到字符串长度满足目标长度

- `Number.EPSILON`
- `Number.isInteger()`    // 判断参数是否是安全整数/十进制整数
- `Number.isSafeInteger()`
- `Number.isFinite()`    // 判断参数是否有穷数
- `Number.isNaN()`    // 判断Number类型参数是否为NaN

- `Math.sign()`    // 判断参数是否是正数
- `Math.trunc()`    // 只保留整数部分
- `Math.pow(值, 次幂)`    // 求幂

^[注：parseInt()当数字到达一定长度时，会变成个位的值，即把这个值当成字符串来处理]
