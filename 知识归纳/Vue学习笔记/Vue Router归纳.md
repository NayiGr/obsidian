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


一般组件^[须引入注册，在`template`中写入组件标签]置于目录`components`
路由组件^[依靠路由规则匹配，由路由器渲染]置于目录`pages`