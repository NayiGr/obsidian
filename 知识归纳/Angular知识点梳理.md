#### Angular 父子组件传值

尽量减少使用全局`EventEmitter`（事件发射器）
可用父子组件，便少用`router-outlet`（如此可使用`@Input`和`@Output`传值，以减少使用全局`EventEmitter`）

###### 父传子：
子组件：
```
	@Input() param: any;
	ngOnChange() {}	// 当传递的值发生改变，会执行在此生命周期函数，可在里面执行当值改变时需要执行的方法；
```

父组件：
```
	<page [param]="current"></page>
	this.current = 'others';	// current发生改变时会传递给param；
```

###### 子传父：
子组件：
```
	@Output() param: EventEmitter<any> = new EventEmitter<any>();
	this.param.emit(true);	// 触发传值
```
父组件：
```
	<page (param)='getParam($event)'></page>	// 传递过来的值作为$event传进方法中并执行此方法
	getParam(event) {}
```

---

#### Angular请求数据配置HttpClient

设置Http拦截器，拦截服务端地址，对该请求进行转换：
```
@NgModule({
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
```

若无配置，则使用本地地址请求如：`http://localhost:8100/getApi`