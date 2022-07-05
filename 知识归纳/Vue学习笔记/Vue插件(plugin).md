`plugin`用于增强`Vue`，`plugin`是一个对象，且里面必须包含`install()`。
```js
plugin.js

	export default {
		install(Vue) {    // Vue：Vue的构造函数
			Vue.directive("['directive name']", function(value){}); 

			Vue.filter("['filter name']", function(value){});
		}
	}


```

```js
main.js

	import plugin from 'plugin.js'

	Vue.use(plugin);    // 使用插件
```