##### Vue2响应式原理
Vue2依靠`Object.defineProperty()`实现响应监听和数据拦截，但`Object.defineProperty()`无法捕获新增和删除数据，需要通过使用`Vue.set()`添加新属性，`vm.$delete()/this.$delete()`删除属性；
```
let object = {
	name: 'XXX',
	type: 'YYY'
};
let obj = {};

Object.defineProperty(obj, 'name', {    // 每个属性都需要定义一个Object.defineProperty()
	configurable: true,    // 控制属性是否可以删除，默认值是false，但无法捕获数据
	enumerable: true,      // 控制属性是否可以枚举，默认值是false
	writable: true,        // 控制属性是否可以被修改，默认值是false
	get() {
		return object.name
	},
	set(value) {
		object.name = value;
	}
});
```

---

##### Vue3响应式原理
Vue3依靠`Proxy()`实现响应监听和数据拦截；
```
let object = {
	name: 'XXX',
	type: 'YYY'
};

const proxy = new Proxy(object, {    // 单个Proxy可满足一维对象进行响应监听和数据拦截，无需每个属性都定义
	get(target, propName) {
		return target[propName];
	},
	set(target, propName, value) {    // 新增和修改时触发调用
		target[propName] = value;
	},
	deleteProperty(target, propName) {
		return delete target[propName];
	}
});
```

---

##### Vue检测对象数据改变
对对象的keys进行遍历并使用`Object.defineProperty()`，监视data中属性的变化。

仿Vue实现响应式检测对象的简化功能：
```
	let data = {value: 0, objects: {proper: ''}};

	const _data = new Data(data);
	vm._data = data = _data;

	function Data(obj) {
		Object.keys(obj).forEach((key) => {
			Object.defineProperty(this, key, {
				get() {
					return obj[key];
				},
				set(val) {
					obj[key] = val;
				}
			});
			// 当存在对象子级也是对象时，进行递归遍历
		})
	}
	
```

响应式对象添加属性，并使新属性同样时响应式：`vm.$set(vm.objects, 'proper', 'P')`，但对象不能是`Vue`实例，或是Vue实例的根数据对象(`data`)。

---

##### Vue检测数组数据改变
数组元素不是用`Object.defineProperty()`实现监视数据变化，
Vue对数组方法

最后一位新增元素push
删除最后一位元素pop
删除第一位元素shift
第一位元素前新增元素unshift
指定位置插入/删除/替换元素splice
排序数组sort
反转数组reverse

