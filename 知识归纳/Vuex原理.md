```
store.js

	const action = {    // 响应组件中的动作，dispatch('function name', value)
		[function name](context, value) {    // context是简化后的store，value是传入的值
			...
			context.commit('[function name]', value)
		}
	};
	const mutations = {    // 操作数据(state), commit('function name', value)
	
	};
	const state = {};    // 储存数据
```

```

```