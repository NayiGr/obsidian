#### Vuex中state、mutations、actions功能使用

```
store.js

	const actions = {    // 响应组件中的动作，处理业务逻辑，如发送请求，dispatch('function name', value)
		[function name](context, value) {    // context是简化后的store，value是传入的值
			...
			context.commit('[function name]', value)
		},
		actionHandle(context, value) {    // eg
			...
			context.commit('mutationsHandle', value)
		}
	};
	const mutations = {    // 操作数据(state), commit('function name', value)
		[function name](state, value) {    // state是经过处理后变成响应式的state，value是传入的值
			...
			state.value = value;
		},
		mutationsHandle(state, value) {    // eg
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
		},
		gettersHandle(state) {    // eg
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
			this.$store.dispatch('actionHandle', value);    // 调用store中action的方法
			this.$store.commit('mutationsHandle', value);    // 若无需处理业务逻辑，可直接调用store中mutations的方法
			this.$store.gettters.gettersHandle;    // 调用getters方法
		}
	}
```

##### 简化调用state：
```
[Vue Component].vue

	import {mapState} from 'vuex';

	computed: {
		// 借助mapState生成计算属性，从store的state中读取数据
		
		// 对象写法
		...mapState({current: 'value', ...})
		// current是当前.vue文件要调用的变量，value是Vuex中数据的变量名，相当于从Vuex中找到名为value的变量，将其作为方法的输出值，并将方法赋给current。
		// 等同于
		current() {
			return this.$store.state.value;
		}
		
		--- --- ---

		// 数组写法
		...mapState(['value', ...])
		// 当前.vue文件要调用的变量和Vuex中数据的变量是同名变量，可简写成以变量名组成的数组
	}

```

##### 简化调用getters：
```
[Vue Component].vue

	import {mapGetters} from 'vuex';

	computed: {
		// 借助mapGetters生成计算属性，从store的getters中读取数据
		
		// 对象写法
		...mapGetters({current: 'gettersHandle', ...})
		// current是当前.vue文件要调用的计算属性名，gettersHandle是Vuex中getters的计算属性名。

		--- --- ---

		// 数组写法
		...mapGetters(['gettersHandle', ...])
		// 当前.vue文件中computed要调用的计算属性名和Vuex中getters的计算属性名相同，可简写成以计算属性名组成的数组
	}

```

##### 简化调用mutations：
```
[Vue Component].vue

	import {mapMutations} from 'vuex';

	methods: {
	    // 借助mapMutations生成对应的方法，方法中会调用commit去联系store中的mutations
	    
	    // 对象写法
		...mapMutations({handle: 'mutationsHandle', ...})
		// handle是当前.vue文件要调用的方法名，mutationsHandle是Vuex中actions的方法名。
		// 等同于/生成
		handle(value) {
			this.$store.commit('mutationsHandle', value);    // 默认参数是event
		}，

		execute() {
			this.handle(1);    // 调用执行
		}

		--- --- ---

		// 数组写法
		...mapMutations(['mutationsHandle'])
		// 当前.vue文件中要调用执行方法的方法名和Vuex中mutations的方法名相同，可简写成以方法名组成的数组
	}

```




理解：state和getters都是获取变量，所以将mapState和mapGetters放在computed中；
mutations、actions是执行方法，所以将mapMutations和mapActions放methods中