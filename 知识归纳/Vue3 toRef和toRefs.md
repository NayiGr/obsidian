#### toRef和toRefs作用：
```
let object = reactive({
	name: 'XXX',
	catalog: {
		title: 'YYY',
		info: {
			type: 'ZZZ'
		}
	}
});

return {
	name: object.name,
	type: catalog.info.type,
};
```
输出的数据不再是`reactive`所属类型的响应数据，而只是基础类型，无法实现触发响应拦截和数据监听，所以要使用`toRef/toRefs`;
```
return {
	name: toRef(object, 'name'),
	...toRefs(object)
};
```