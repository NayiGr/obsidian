##### 组件嵌套
```html
[Vue Component].vue(Son)

	<script type="text/javascript">
		export default {
			name: '[ComponentName]',    // 存在name时，最终显示在Vue debug开发者工具中显示的标签就是定义的name，否则使用Parent中注册Son组件的名字
		}
	</script>
```

```html
[Vue Component].vue(Parent)

	<Son></Son>

	<script type="text/javascript">
		import Son from './[Vue Component].vue(Son)'	

		export default {
			...
			components: {
				Son
			}
		}
	</script>
```

```html
Vue debug

	<`[ComponentName]`></`[ComponentName]`>
	<`[ComponentName]` />

```

##### ref属性
存在于`HTML`标签中，`作为id`的替代者，`this.$refs`获取到对应的DOM元素；存在于组件标签，`this.$refs`获取到对应组件的实例对象，而组件标签若根据`id`获取，得到的是组件中完整`DOM`结构；

```html
[Vue Component].vue

	<h1 ref="title">value</h1>
	<[VueComponent] ref='component'/>

	<script>
		...

		methods: {
			handle() {
				this.$refs.title;    // <h1>value</h1>
				this.$refs.component;
			}
		}
		
		...
	</script>
```

