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
	const getters = {    // 计算属性，将state中的数据进行加工，返回值作为自身的值
		[function name](state) {    // state是经过处理后变成响应式的state
			...
			return state.value * 1;
		}
	}

	Vue.use(Vuex);    // 应用插件，必须先于创建store运行
	
	export default new Vuex.Store({    创建store
		actions,
		mutations,
		state,
		getters    // （非必须）
	});
```

```
[Vue Component].vue

	methods: {
		handle() {
			this.$store.state.value;    // 获取state中的数据
			this.$store.dispatch('[function name]', value);    // 调用store中action的方法
			this.$store.commit('[function name]', value);    // 若无需处理业务逻辑，可直接调用store中mutations的方法
			this.$store.gettters.[function name];    // 调用getters方法
		}
	}
```