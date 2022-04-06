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