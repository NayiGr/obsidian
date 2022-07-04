```html
[Vue Component].vue (Parent)

    <!-- 使用:[属性]（v-bind:[属性]），让属性值变为js表达式结果，这样才能得到该类型的值，否则类型是字符串 -->
	<[VueComponent] title='parent' :value="1" />

	<script>
		...

		
		
		...
	</script>
```

```html
[Vue Component].vue (Son)

	<span>{{title}}</span>
	<span>{{value}}</span>

	<script>
		...

		// 简单声明接收
		props: ['title', 'value'],

		// 类型限制接收
		props: {
			title: String,
			value: Number
		},

		// 配置接收
		props: {
			title: {
				type: String,
				required: true,    // 是否必须
			},
			value: {
				type: Number,
				default: 2,    // 若没有传递，则是默认值
			}
		}
		...
	</script>
```