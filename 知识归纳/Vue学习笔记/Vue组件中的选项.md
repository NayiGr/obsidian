### 常用选项
##### data
使用数据代理^[通过一个对象代理对另外一个对象的操作]的方式实现双向绑定^[详细见Vue响应数据原理]。

---

##### methods
事件处理方法。

---

##### computed
计算属性：将原有的属性（`data`中的数据），进行加工计算所生成的新属性。
```html
[Vue Component].vue

	......
	<!-- 是属性而非方法函数，不可加() -->
	<div>{{[computedHandle]}}</div>
	......
```

```js
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
```js
[Vue Component].vue

	......
	data() {
		return {
			[data value]: true
		}
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
```js
[Vue Component].vue

	......
	data() {
		return {
			obj: {
				value: 0
			}
		}
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

---

##### watch和computed区别
一般对于新变量依赖已有变量，随已有变量改变而改变情况下使用，`watch`比`computed`更繁琐
```js
[Vue Component].vue

	......
	data() {
		return {
			[value_1]: 1,
			[value_2]: 2,
			[result_value]: 0,    // watch中使用
		}
	},
	computed: {
		[result_value]() {
			return this.[value_1] + this.[value_2];
		}
	},
	watch: {
		[value_1](val) {
			this.[result_value] = val + this.[value_2];
		},
		[value_2](val) {
			this.[result_value] = this.[value_1] + val;
		},
	}
	......
```

但当需要进行异步操作时，只能使用`watch`，而`computed`计算属性无法开启异步任务。
```js
[Vue Component].vue

	......
	data() {
		return {
			[value_1]: 1,
			[value_2]: 2,
			[result_value]: 0,    // watch中使用
		}
	},
	computed: {
		[result_value]() {
			return this.[value_1] + this.[value_2];
		}
	},
	watch: {
		[value_1](val) {
			setTimeout(() => {    // setTimeout中回调若使用普通函数则this指向Window，而使用箭头函数让其没有了自己的this，变为使用父级的this
				this.[result_value] = val + this.[value_2];
			})
		},
		[value_2](val) {
			this.[result_value] = this.[value_1] + val;
		},
	}
	......
```

1. `computed`能完成的功能，`watch`都能完成；
2. `watch`能完成的共功能，`computed`不一定能完成。

==注==：
- 所有被`Vue`管理的函数，都写为普通函数，如此`this`的指向才是`vm`或组件实例对象；
- 所有不被`Vue`管理的函数（定时器的回调函数，`Ajax`的回调函数，`Promise`的回调函数），都写成箭头函数，如此`this`的指向才是`vm`或组件实例对象。

---

### 其它配置项
#### 过滤器
##### 局部过滤器
```html
[Vue Component].vue

	<!-- 过滤器按从左到右将结果依次执行 -->
	<span>{{time | dateFormat(toUTCString) | stringSlice}}</span>

	<!-- 过滤器只能在插值语法和(v-bind:属性)中使用 -->
	<span :[value]="time | dateFormat(toUTCString) | stringSlice"></span>

	<script type="text/javascript">
		export default {
			name: '(Component Name)',
			filters: {
			    // time作为默认参数传入，若有其他参数则在其之后，再将返回值替换time所在的整个插值语法（{{time | dateFormat}}）
				dateFormat(value, type) {
					if (type == toUTCString) {
						return value.toUTCString();
					}
					return value.toISOString();
				},
				stringSlice(value) {
					return value.slice(0, 4);
				}
			}
		}
	</script>
```

##### 全局过滤器
```js
	Vue.filter('dateFormat', function(value){});    // 必须在new Vue()实例前，设置好过滤器
```

---

#### 自定义指令
自定义函数在**指令与元素成功绑定（即初始化，但在页面渲染前）**时，和**指令所在的模板被重新解析（即任意数据被修改导致模板改变时）**时调用

##### 局部指令
```html
[Vue Component].vue

	<!-- 'directive name': 以下划线连接单词，kebab-case命名方式 -->
	<span v-['directive name']='value'></span>
	
	<script type="text/javascript">
		export default {
			name: '[ComponentName]',
			data() {
				return {
					value: 1
				}
			}
			directives: {    // 指令中的this指向Window
				// 简写，不依靠返回值触发修改，依靠操作DOM元素改变
				['directive name'](element, binding){    // 第一个参数是指令绑定的DOM元素，第二个参数是当前指令的绑定对象
					element.innerText = binding.value * 10;    // binding.value指所绑定的值
				},
				
				// 完整写法
				['directive name']: {
					bind(element, binding) {},    // 指令与元素成功绑定时（初始化）
					inserted(element, binding) {},    // 指令所在元素被插入DOM页面时
					update(element, binding) {},    // 指令所在的模板被重新解析（任意数据被修改）
				}
			}
		}
	</script>
```

##### 全局指令
```js
	// 简写
	Vue.directive("['directive name']", function(value){});    // 必须在new Vue()实例前，设置好自定义指令

	// 全写
	Vue.directive("['directive name']", {
		bind(element, binding) {},
		inserted(element, binding) {},
		update(element, binding) {},    
	});
```