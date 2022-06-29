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