##### Img动态显示图片
Vue和ElementUI，链接本地图片地址需要包裹在`require()`中.

---

##### Vue3 toRef和toRefs
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

##### Vue事件修饰符
`@click.xxx="handle()"`
`@click.xxx.xxx="handle()"` ^[多个可链式书写]

**常用**
- `prevent`：阻止默认事件，如阻止点击`<a>`标签后默认跳转
- `stop`：阻止事件冒泡，如点击子元素事件后同时触发父元素事件
- `once`：事件只触发一次

**不常用**
- `capture`：使用事件的捕获模式，让事件在捕获阶段就开始处理（默认情况是冒泡阶段才处理事件）
- `self`：只有`event.target`是当前操作的元素时才触发事件（能够防止父元素因冒泡触发事件）
- `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕，如`wheel`后先执行默认滚动，再执行绑定滚动事件的方法^[仅部分事件的事件方法会先于默认行为执行，以此修饰符作为优化]

==注==：
 1. 事件先经过事件捕获，之后再事件冒泡，默认情况下是冒泡阶段才处理事件。
 2. 事件冒泡时触发了父元素的事件，但其`event.target`还是原来真正触发事件的子元素，而非冒泡导致事件触发的父元素。
