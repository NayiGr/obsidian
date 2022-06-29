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