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

##### 配置项props
```html
[Vue Component].vue (Parent)

    <!-- 使用:[属性]（v-bind:[属性]），让属性值变为js表达式结果，这样才能得到该类型的值，否则类型是字符串 -->
	<[VueComponent] title='parent' :value="1" />
```

```html
[Vue Component].vue (Son)

	<span>{{title}}</span>
	<span>{{value}}</span>

	<script>
		...
		// props执行优先级高于data
		data() {
			return {
				sonTitle: this.title
			}
		},

		// 简单声明接收
		props: ['title', 'value'],    // 不能修改接收的变量，可将接收变量赋给data定义的变量再进行修改

		// 类型限制接收
		props: {
			title: String,
			value: Number
		},

		// 配置限制和指定接收
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