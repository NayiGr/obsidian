##### data
使用数据代理^[通过一个对象代理对另外一个对象的操作]的方式实现双向绑定^[详细见Vue响应数据原理]。

---

##### computed
计算属性：将原有的属性（`data`中的数据），进行加工计算所生成的新属性。
```
[Vue Component].vue

	......
	<div>{{[computedHandle]}}</div>    // 是属性而非方法函数，不可加()
	......

	......
	computed: {
		// 完整写法
		[computedHandle]: {
			get() {},    // 返回值作为[computedHandle]的属性值，初次读取时和所依赖的数据发生变化时调用该方法，除此之外，读取的都是缓存中的[computedHandle]的值
			set(value) {},    // 非必须，[computedHandle]被修改时调用，需修改get()中所依赖的数据，[computedHandle]才会被修改
		},

		// 简写（只需要读取，不需要修改）
		[computedHandle]() {}    // 同[computedHandle]: {get()}
	}
	......
```

==注==：
- `computed`和`methods`的区别：`computed`读取时能够缓存调用方法的值（返回值），再之后所依赖的数据不变时，直接读取缓存的值，`methods`则没有缓存值，每次读取时都要调用`methods`中的对应的方法。

---

##### watch
```
[Vue Component].vue

	......
	data: {
		[data value]: true,
	},
	computed: {
		[computedHandle]() {}
	}
	// 方法一
	watch: {
		// 正常写法
		[data value]: {
			immediate: true,    // 非必须，初始化时调用handler()
			handler(newValue, oldValue) {}    // 当[data value]发生改变时调用
		},
		[computedHandle]: {    // 也可监听计算属性
			handler(newValue, oldValue) {}
		}，

		// 简写（不需要其他配置项）
		[data value](newValue, oldValue) {}    // 同[data value]: {handler(newValue, oldValue) {}}
	}
	......

	// 方法二
	const vm = new Vue({});
	
	// 正常写法
	vm.$watch('[data value]', {    // 或在methods中的方法中调用this.$watch()[?未尝试]
		immediate: true,
		handler(newValue, oldValue) {}
	});

	// 简写（不需要其他配置项）
	vm.$watch('[data value]', function (newValue, oldValue) {});
```
**深度监视**
```
[Vue Component].vue

	......
	data: {
		obj: {
			value: 0
		},
	}
	watch: {
		'obj.value': {    // 监视多级结构中单个属性的变化
			immediate: true,
			handler(newValue, oldValue) {}
		},
		obj: {
			deep: true,    // 监视多级结构中所有属性的变化，当obj中有属性变化就会触发
			handler(newValue, oldValue) {}
		}
		
	}
	......
```