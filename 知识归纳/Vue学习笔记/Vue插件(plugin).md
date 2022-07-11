`plugin`用于增强`Vue`，`plugin`是一个对象，且里面必须包含`install()`。
```js
plugin.js

	export default {
		install(Vue, a, b, c, ...) {    // Vue：Vue的构造函数 // 输出Vue的构造函数, 1, 2, 3, ...

			// 定义全局指令
			Vue.directive("['directive name']", function(value){}); 

			// 定义全局过滤器
			Vue.filter("['filter name']", function(value){});

			// 定义全局混入
			Vue.mixin(['mixin module']);
			
			// Vue原型直接添加其他自定义数据
			Vue.prototype.['prototype name'] = ['anything'];
		}
	}
```

```js
main.js

	import plugin from 'plugin.js'

	Vue.use(plugin);    // 使用插件
	Vue.use(plugin , 1, 2, 3, ...);

	new Vue({...});
```