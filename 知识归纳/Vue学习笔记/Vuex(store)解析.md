#### Vuex中state、mutations、actions功能使用

```js
store.js

	const actions = {    // 响应组件中的动作，处理业务逻辑，如发送请求，dispatch('[function name]', value)
		[function name](context, value) {    // context是简化后的store，value是传入的值
			...
			context.commit('[function name]', value)
		},
		actionHandle(context, value) {    // eg
			...
			context.commit('mutationHandle', value)
		}
	};
	const mutations = {    // 操作数据(state), commit('[function name]', value)
		[function name](state, value) {    // state是经过处理后变成响应式的state，value是传入的值
			...
			state.value = value;
		},
		mutationHandle(state, value) {    // eg
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

```js
[Vue Component].vue

	methods: {
		handle() {
			this.$store.state.value;    // 获取state中的数据
			this.$store.dispatch('actionHandle', value);    // 调用store中action的方法
			this.$store.commit('mutationHandle', value);    // 若无需处理业务逻辑，可直接调用store中mutations的方法
			this.$store.gettters.gettersHandle;    // 调用getters方法
		}
	}
```

##### 简化调用state：
```js
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
```js
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
```js
[Vue Component].vue

	import {mapMutations} from 'vuex';

	methods: {
	// 借助mapMutations生成对应的方法，方法中会调用commit去联系store中的mutations
	    
	    // 对象写法
		...mapMutations({handle: 'mutationHandle', ...})
		// handle是当前.vue文件要调用的方法名，mutationHandle是Vuex中actions的方法名。
		// 等同于/生成
		handle(value) {
			this.$store.commit('mutationHandle', value);    // 默认参数是event
		}，

		execute() {
			this.handle(1);    // 调用执行
		}

		--- --- ---

		// 数组写法
		...mapMutations(['mutationHandle'])
		// 当前.vue文件中要调用执行方法的方法名和Vuex中mutations的方法名相同，可简写成以方法名组成的数组
	}

```

##### 简化调用actions：
```js
[Vue Component].vue

	import {mapActions} from 'vuex';

	methods: {
	// 借助mapActions生成对应的方法，方法中会调用dispatch去联系store中的actions
	    
	    // 对象写法
		...mapActions({handle: 'actionHandle', ...})
		// handle是当前.vue文件要调用的方法名，actionHandle是Vuex中actions的方法名。
		// 等同于/生成
		handle(value) {
			this.$store.dispatch('actionHandle', value);    // 默认参数是event
		}，

		execute() {
			this.handle(1);    // 调用执行
		}

		--- --- ---

		// 数组写法
		...mapActions(['actionHandle'])
		// 当前.vue文件中要调用执行方法的方法名和Vuex中actions的方法名相同，可简写成以方法名组成的数组
	}

```

==注意==：
- `...mapXXX()`：解构其中的对象或数组
- `mapState()`和`mapGetters()`是获取变量，所以放在`computed`中；
   `mapMutations()`和`mapActions()`是执行方法，所以放在`methods`中。
- `mapMutations()`和`mapActions()`使用时，若需要传递参数，须在模板中绑定事件时或在执行方法时传递参数，否则参数默认是事件对象(`event`)。