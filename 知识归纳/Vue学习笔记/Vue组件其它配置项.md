#### 过滤器
##### 局部过滤器
```html
[Vue Component].vue

	<span>{{time | dateFormat(toUTCString) | stringSlice}}</span>    // 过滤器按从左到右将结果依次执行
	<span :[value]="time | dateFormat(toUTCString) | stringSlice"></span>    // 过滤器只能在插值语法和(v-bind:属性)中使用

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

	<span v-['directive name']='value'></span>    // 'directive name': 以下划线连接单词，kebab-case命名方式
	
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