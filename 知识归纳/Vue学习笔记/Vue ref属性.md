`HTML`标签中`id`的替代者
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