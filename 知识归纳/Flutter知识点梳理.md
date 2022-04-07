##### 组件
`BorderRadius` => `style-boder-radius`
`Radius.circular` => `style-boder-radius.px`
`Matrix4` => `style-transform`
`Image.asset` => `img`本地路径
`Image.network` =>` img`远程路径
`BoxFit` => `style-background-size`
`ClipOval` => 嵌套`Image`使用，自动使图片化为圆形
`SingleChildScrollView` => 防止弹出键盘压缩页面导致容器越界

##### 关键字
`final`和`const`的区别：都只能赋值一次，但final不仅有`const`的编译时常量的特性，更重要的它是运行时的常量，是惰性初始化，即在运行时第一次使用前才初始化，如，定义当前时间，代码运行到第一次使用`final`的变量，此时`final`才进行初始化，所以时间也是代码运行到此时的时间；一般将方法赋给常量`final`，`const`无法定义

##### 计算字符
`is`：判断类型，变量`is`类型
`~/`：取整（除后）
`??=`：左边变量如果为空，就赋值，否则不赋值
`parse()`： 字符转数字，`int.parse()`，`double.parse()`，`double`兼容`int`
`++`： eg: `a++; ++a;`^[`++`在后，表示先将`a`赋给左边变量之后`a`再加1，`++`在前表示`a`加1后再将`a`赋给左边变量]
`break`：只能向外跳出一层
`continue`：跳过当次循环

##### 语法糖
###### `List`：
　`.reversed`：倒置数组，结果非`[]`包裹，而是`()`包裹着数组
　`.addAll` => `.concat()`
　`.remove(data)`：根据值删除数组项
　`.removeAt(index)`：根据索引删除数组项
　`.fillRange(start, end, data)`：替换，`start`指要替换的索引，`end`指要替换的索引后一位作为结束，`data`指要替换的新数据
　`.insert(index, data)`：在`index`索引插入数据
　`.insertAll(index, Lisr)`：在`index`索引插入数组，改数组自动合并到原数组
　`.join()` => `.join()`
　`.split()` => `.split()`

###### `Set`：去重数组，无法添加相同数组项(使用的方法和List相同)
eg: 
```
	final s = new Set();
	s.addAll(data).toList();	// 对List去重
```

###### `Map`：
　`.keys()`：获取所有属性名
　`.values()`：获取所有属性值
　`.addAll()`：合并Map
　`.remove(name)`：根据属性名删除数据
　`.containsValue(value)`：查找所有属性值中是否存在value


###### `List & Set & Map`
　for in & forEach()：forEach中只有Map有key参数
　.map() ≈> .map()，返回()包裹的数组
　.where() => .filter()
　.any() => .some()，js中.some()满足条件返回true，.find()满足条件返回此元素
　.every() => .every()，全满足条件返回true，否则返回false

##### 方法功能
构造函数：
class Test {
　　Test() {}	// 默认构造函数
　　Test.getKey() {}		// 命名构造函数，如new Date.now()一样调用
}

私有属性：
　　_+变量，需要将类抽离成单独文件才能实现其私有的功能，否则和公有的无异

初始化列表
　　构造函数括号后初始化类的变量(属性)
eg:
class Test {
　　int age;
　　Test():age=10 {}	// 执行前初始化变量
}

静态成员：
　　static，不需要实例就可以调用
eg：class Test{ static name } 
　　Test.name

super()：
　　子类继承父类时，父类构造函数需要传参，将传给子类的参数用super()，再传递给父类