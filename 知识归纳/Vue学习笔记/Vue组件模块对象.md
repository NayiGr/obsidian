##### data
使用数据代理^[通过一个对象代理对另外一个对象的操作]的方式实现双向绑定^[详细见Vue响应数据原理]。

##### computed
计算属性：将原有的属性（`data`中的数据），进行加工计算所生成的新属性。
```
[Vue Component].vue

	......
	computed: {
		[computedHandle]: {
			get() {},    // 返回值作为[computedHandle]的属性值，初次读取时和所依赖的数据发生变化时调用该方法，除此之外，读取的都是缓存中的[computedHandle]的值
			set() {},
		}
	}
	......
```

==注==：
- `computed`和`methods`的区别：`computed`读取时能够缓存调用方法的值（返回值），再之后所依赖的数据不变时，直接读取缓存的值，`methods`则没有缓存值，每次读取时都要调用`methods`中的对应的方法。