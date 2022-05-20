##### data
使用数据代理^[通过一个对象代理对另外一个对象的操作]的方式实现双向绑定^[详细见Vue响应数据原理]。

##### computed
计算属性：将原有的属性（`data`中的数据），进行加工计算所生成的新属性。
```
[Vue Component].vue

	......
	computed: {
		[computedHandle]: {
			get() {},    // 当初次读取[computedHandle]时调用，和所依赖的数据发送变化时调用，且返回值作为[computedHandle]的属性值
			set() {},
		}
	}
	......
```