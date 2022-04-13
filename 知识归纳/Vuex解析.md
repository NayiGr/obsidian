##### Vuex中state、mutations、actions功能使用

```
store.js

	const action = {    // 响应组件中的动作，处理业务逻辑，如发送请求，dispatch('function name', value)
		[function name](context, value) {    // context是简化后的store，value是传入的值
			...
			context.commit('[function name]', value)
		}
	};
	const mutations = {    // 操作数据(state), commit('function name', value)
		[function name](state, value) {    // state是经过处理后变成响应式的state，value是传入的值
			...
			state.value = value;
		}
	};
	const state = {    // 储存数据
		value: 0
	};
```

```
[Vue Component].vue

	methods: {
		handle() {
			this.$store.dispatch('[function name]', value);    // 调用store中action的方法
			this.$store.commit('[function name]', value);    // 若无需处理业务逻辑，可直接调用store中mutations的方法
		}
	}
```