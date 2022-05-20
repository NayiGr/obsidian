一般组件^[须引入注册，在`template`中写入组件标签]置于目录`components`
路由组件^[依靠路由规则匹配，由路由器渲染]置于目录`pages`

##### 一级路由和多级路由使用
```
router.js

	import VueRouter from 'vue-router';    Vue 2.x
	import {createRouter,createWebHistory} from "vue-router";    // Vue 3.x
	
	import LoginPage from "../views/LoginPage.vue";
	import LoginPage from "../views/User.vue";
	import LoginPage from "../views/Setting.vue";

	Vue.use(VueRouter);    // Vue规定须先use再创建路由

	const routes = [    // 定义路由
	  {
	    path: '/login',    // 一级路由由“/”+路由名组成
	    name: 'Login',
	    component: LoginPage,
	    children: [    // 多级路由
		    {
			    path: 'user',    // 子级路由不需要加“/”，Vue遍历路由时已默认添加
			    component: 'User'
		    },
		    {
			    path: 'setting',
			    component: 'Setting'
		    }
	    ]
	  }
	];

    // 创建并暴露路由器
	export default new VueRouter({    Vue 2.x
	  mode: 'history',
	  base: process.env.BASE_URL,
	  routes
	});

	export default createRouter({    // Vue 3.x
	  history: createWebHistory(),
	  routes
	});
```

```
[Vue Component].vue

	<router-link active-class="active" to="/login">Login</router-link>    // 点击触发路由切换，active-class绑定触发当前路由时，展示的class样式
	<router-view></router-view>    // 路由对应组件页面呈现的位置
```

```
LoginPage.vue

	<router-link active-class="active" to="/login/user">Login</router-link>
	<router-link active-class="active" to="/login/setting">Login</router-link>

	<router-view></router-view>    // 路由对应组件页面呈现的位置
```

---

##### 路由传参和命名路由
```
router.js

	......
	
	const routes = [
	  {
	    path: '/home',
	    name: 'Home',
	    component: HomePage,
	    children: [
		    {
			    path: 'detail/:id/:title',    // params传参配置占位符声明接收params参数
			    name: 'detailRouter'    // 命名路由
			    component: Detail

			// 接收者配置props
			    
				// props对象形式，该对象中键值对都会以props的形式传给接收者（如，此路由组件），但只能传递固定值，一般不会使用
			    props: {detailId: 01, detailTitle: 'value'},


			    // props布尔值形式，若布尔值为真，则该路由组件接收的所有params（且只能是params）参数，以props的形式传给接收者（如，此路由组件）
			    props: true,


			    // props函数形式，依靠返回值传递参数
			    // 一般方式返回值
			    props($route) {
				    return {dId: $route.query.id, dTitle: $route.query.title}
			    },
			    // 连续解构赋值（重命名属性值时再解构，无法获取外层属性值，如，此处query，因已被重命名）
			    props({query: {id, title}}) {
				    return {dId: id, dTitle: title};
			    },
			    // 直接输出query
			    props({query}) {
				    return {...query};
			    }
		    }
	    ]
	  }
	];

	......
```

```
HomePage.vue

// query方式传递参数
	
	<router-link :to="`/home/detail?id=${detail.id}&title=${detail.title}`">Home</router-link>   // query方式传参字符串写法
	
	<router-link :to="{
		path: '/home/detail',
		query: {
			id: detail.id,
			title: detail.title
		}
	}">Home</router-link>   // query方式传参对象写法

	// 等同

	<router-link :to="{
		name: 'detailRouter',   // 替换path，省去过长路径，同时使用了命名路由就无法使用字符串写法
		query: {
			id: detail.id,
			title: detail.title
		}
	}">Home</router-link>


// params方式传递参数，需配置路由

	<router-link :to="`/home/detail/${detail.id}/${detail.title}`">Home</router-link>   // params方式传参字符串写法

	<router-link :to="{
		name: 'detailRouter',    // params方式传参只能使用命名路由
		params: {
			id: detail.id,
			title: detail.title
		}
	}">Home</router-link>   // params方式传参对象写法
```

```
Detail.vue
	// 接收参数
	
	<script>
		......
		props: ['detailId', 'detailTitle'],    // 路由props对象接收形式时对应属性
		props: ['id', 'title'],    // 路由props布尔值接收形式时对应属性
		props: ['dId', 'dTitle'],    // 路由props布尔值接收形式时对应属性
		mounted() {
			// 一般方式接收参数
			this.$route.query.(id/title);    // query方式接收参数
			this.$route.params.(id/title);    // params方式接收参数
		}
		......
	</script>
```

```
[Vue Component].vue

	<router-link replace active-class="active" to="/login">Login</router-link>    // replace替换当前记录的路由
```

---

##### 编程式路由导航
```
[Vue Component].vue

	<script>
		......

		methods: {
			routeGo() {
				// 跳转的配置与router-link的:to对象方法一致
				this.$router.push({path: '/', query: {}});    // 跳转到对应路由
				this.$router.replace({path: '/', query: {}});    // 跳转并替换当前路由
				this.$router.back();    // 后退
				this.$router.forward();    // 前进
				this.$router.go([num]);    // 需传入数字，前进正数次，后退负数次
				this.$router.go(3);    // 前进三次
				this.$router.go(-4);    // 后退四次
			}
		}

		......
	</script>
```

---

##### 缓存路由组件
```
[Vue Component].vue

	// 一般情况下切换路由会销毁当前路由组件，其中的数据会被清空
	<router-view></router-view>

	// 将路由展示区置于<keep-alive>中，缓存其中的展示区即路由组件
	<keep-alive>
		<router-view></router-view>
	</keep-alive>

	// include指定需要缓存的路由组件的组件名，除此之外的路由组件不进行缓存
	<keep-alive include="(Component Name)">
		<router-view></router-view>
	</keep-alive>
	<keep-alive :include="['(Component Name)', ...]">    // 数组形式
		<router-view></router-view>
	</keep-alive>


	<script>
		export default {
			name: '(Component Name)'
		}
	</script>
```

---

##### 路由组件中两(+1)个新生命周期钩子
```
[Vue Component].vue

	<script>
		export default {
			name: '(Component Name)',
			activated() {    // 路由激活时触发（切换到当前路由组件时，无关是否缓存）
			},
			deactivated() {    // 路由失活时触发（切换到其他路由组件时，无关是否缓存）
			},
			methods: {
				methodHandle() {
					......    // DOM会在触发方法后，方法中的代码执行完毕，改变数据后才更新DOM，
					this.$nextTick(function() {});    // nextTick指定的回调函数会在更新后的新DOM节点再执行（类似延时器）
				}
			}
		}
	</script>
```
 注意：`activated()`和`deactivated()`只有在`<keep-alive></keep-alive>`包裹的时候才有效；

---

##### 路由守卫：对路由进行权限控制
```
router.js

	import VueRouter from 'vue-router';
	
	import LoginPage from "../views/LoginPage.vue";
	import LoginPage from "../views/User.vue";
	import LoginPage from "../views/Setting.vue";

	Vue.use(VueRouter);

	const routes = [
	  {
	    path: '/login',
	    name: 'Login',
	    component: LoginPage,
	    children: [
		    {
			    path: 'user',
			    component: 'User',
			    meta: {isGo: false},    //路由元信息，配置自定义内容，可用于在路由守卫中进行权限校验
			    beforeEnter: (to, from, next) {    // 独享路由守卫，只有前置没有后置
				    // to: 目标路由(此路由)，from: 发起路由，next: 继续执行（如不执行则无法进行路由跳转）
			    }
		    },
		    {
			    path: 'setting',
			    component: 'Setting',
			    meta: {isGo: true}
		    }
	    ]
	  }
	];

	const router = new VueRouter({
	  mode: 'history',
	  base: process.env.BASE_URL,
	  routes
	});

	// 全局前置路由守卫，初始化和每次路由切换前调用指定的回调函数
	router.beforeEach((to, from, next) => {    // to: 目标路由，from: 发起路由，next: 继续执行（如不执行则无法进行路由跳转）
		if (to.meta.isGo) {
			next();
		}
	});

	// 全局后置路由守卫，初始化和每次路由切换后调用指定的回调函数
	router.afterEach((to, from) => {    // to: 目标路由，from: 发起路由
		document.title = '(页面自定义)';    // 真正进入页面后才需修改的数据，如页面标题
	});

	export default router;

```

**组件内路由守卫**
```
[Vue Component].vue

	<script>
		export default {
			name: '(Component Name)',
			// 进入时守卫，通过路由规则，进入该组件时被调用，同独享路由守卫
			beforeRouteEnter(to, from, next) {
			},
			
			// 离开时守卫，通过路由规则，离开该组件时被调用，不同于后置路由守卫
			beforeRouteLeave(to, from, next) {
				// to: 目标路由，from: 发起路由（此路由），next: 继续执行（如不执行则无法进行路由跳转）
			}
		}
	</script>

```

注：全局路由守卫可与其他类型路由守卫配合使用。

---

##### 路由工作模式
hash工作模式：`https://localhost/#/...`哈希/`hash`(`#`)后的路径不会作为整体的一部分发送给服务器，兼容性好；
history工作模式：路径中不会出现哈希值(`#`)，同时也不会将路径中不必要的部分发送给服务器，但后端部署上线时需配置才能实现，兼容性略差；
配置：
```
export default new VueRouter({    Vue 2.x
  mode: 'history'/'hash',
  base: process.env.BASE_URL,
  routes
});

export default createRouter({    // Vue 3.x
  history: createWebHistory()/createWebHashHistory(),
  routes
});
```