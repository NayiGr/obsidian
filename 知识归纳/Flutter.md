组件(类)
　　Container => div
　　Text => span
　　BorderRadius => style-boder-radius
　　Radius.circular => style-boder-radius.px
　　Matrix4 => style-transform
　　Image => img
　　Image.asset => img本地路径
　　Image.network => img远程路径
　　BoxFit => style-background-size
　　ClipOval => 嵌套Image使用，自动使图片化为圆形
　　ListView => ion-list (参数scrollDirection：设置横/纵向列表)
　　ListTile => ion-item
　　SingleChildScrollView => 防止弹出键盘压缩页面导致容器越界

词语解释
　　动态列表 => 循环显示数据列表
　　状态管理 => 对数据进行共享、操作、更新
　　路由管理 => 配置路由
　　资源管理 => 配置assets


final和const的区别：都只能赋值一次，但final不仅有const的编译时常量的特性，更重要的它是运行时的常量，是惰性初始化，即在运行时第一次使用前才初始化，如，定义当前时间，代码运行到第一次使用final的变量，此时final才进行初始化，所以时间也是代码运行到此时的时间；一般将方法赋给常量final，const无法定义

List => Array
Map => JSON，获取值-Map['属性']
is：判断类型，变量 is 类型
~/：取整（除后）
??=：左边变量如果为空，就赋值，否则不赋值
??： eg: var a; var b = a ?? 10; 若双问号前的变量有值，则将其赋给左边变量，否则将双问号后的变量赋给左边的变量
toString()： 数字转字符
parse()： 字符转数字，int.parse()，double.parse()，double兼容int
isEmpty： 判断变量是否为空
++： eg: a++; ++a;
	++在后，表示先将a赋给左边变量之后a再加1，++在前表示a加1后再将a赋给左边变量
break：只能向外跳出一层
continue：跳过当次循环

List：
　.add(data)：添加数据
　.isEmpty&isNotEmpty：是否为空
　.reversed：倒置数组，结果非[]包裹，而是()包裹着数组，
　.toList()：转换为正常的[]包裹的数组
　.addAll => .concat()
　.remove(data)：根据值删除数组项
　.removeAt(index)：根据索引删除数组项
　.fillRange(start, end, data)：替换，start->要替换的索引，end->要替换的索引后一位作为结束，data->要替换的新数据
　.insert(index, data)：在index索引插入数据
　.insertAll(index, Lisr)：在index索引插入数组，改数组自动合并到原数组
　.join() => .join()
　.split() => .split()

Set: (去重数组，无法添加相同数组项)->{}包裹
eg: var s = new Set();
　　s.addAll(data).toList();	// 对List去重
　使用的方法和List相同

Map：
　.keys：获取所有属性名
　.values：获取所有属性值
　.addAll：合并Map
　.remove(name)：根据属性名删除数据
　.containsValue(value)：查找所有属性值中是否存在value


List & Set & Map
　for in & forEach()：forEach中只有Map有key参数
　.map() ≈> .map()，返回()包裹的数组
　.where() => .filter()
　.any() => .some()，js中.some()满足条件返回true，.find()满足条件返回此元素
　.every() => .every()，全满足条件返回true，否则返回false


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