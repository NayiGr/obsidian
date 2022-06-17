##### 各种数据类型的遍历渲染
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

	data() {
		return {
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
	}

	......
```

---

##### `key`的原理
虚拟`DOM`的`diff`(对比)算法

`key`是虚拟`DOM`对象的标识，当数据发生变化时，`Vue`会根据【新数据】生成【新的虚拟`DOM`】，随后`Vue`进行【新虚拟`DOM`】与【旧虚拟`DOM`】的`diff`(对比)算法。

`index`作为`key`：
1. 若对数据进行破坏顺序操作，会产生没有必要的真实`DOM`更新，即使界面效果正常，但效率低；
2. 若结构中还包含输入类的`DOM`，则会产生错误`DOM`更新，导致界面异常；
3. 若仅用于渲染列表展示，`index`可以作为`key`。