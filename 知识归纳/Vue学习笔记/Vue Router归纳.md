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
			    
			    // props布尔值形式，若布尔值为真，则接收的所有params参数，以props的形式传给接收者
			    props: true,
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
		props: ['detailId', 'detailTitle']
		mounted() {
			// 一般方式接收参数
			this.$route.query.(id/title);    // query方式接收参数
			this.$route.params.(id/title);    // params方式接收参数
		}
		......
	</script>
```


一般组件^[须引入注册，在`template`中写入组件标签]置于目录`components`
路由组件^[依靠路由规则匹配，由路由器渲染]置于目录`pages`