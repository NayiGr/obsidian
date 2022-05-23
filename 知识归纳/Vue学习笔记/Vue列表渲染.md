```
[Vue Component].vue
	......
	// 遍历数组
	<ul>
		<li v-for="item in list" :key="item.id">{{item.title}}</li>
	</ul>
	<ul>
		<li v-for="(item, index) in list" :key="item.id">{{item.title}}</li>
	</ul>

	// 遍历对象
	<ul>
		<li v-for="(value, key) in obj" :key="key">{{key}}: {{value}}</li>
	</ul>

	// 遍历字符串
	<ul>
		<li v-for="(char, index) in string" :key="index">{{char}}</li>
	</ul>

	// 遍历指定次数
	<ul>
		<li v-for="(number, index) in 10" :key="index">{{number}}</li>    // number从1到10
	</ul>
	......


	......

	data: {
		list: [
			{id: 1, title: 'title_1'},
			{id: 2, title: 'title_2'},
			{id: 3, title: 'title_3'},
		],
		obj: {
			id: 1,
			title: 'obj_1',
			code: 'obj_code_1'
		},
		string: 'string_title'
	}

	......
```