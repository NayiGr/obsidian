报错信息：

```
':processDebugManifest FAILED'
        Element uses-permission#android.permission.CAMERA at AndroidManifest.xml:35:5-65 duplicated with element declared at AndroidManifest.xml:30:5-90
```

原因：AndroidManifest.xml 中申请了重复权限
如下：

```
<uses-permission android:name="android.permission.CAMERA" android:required="false" />
<uses-permission android:name="android.permission.CAMERA" />
```

解决方案：如果只是在`AndroidManifest.xml`中删除重复权限，编译打包时会重新添加重复权限；
在 /platforms/android/ 目录下（`AndroidManifest.xml`同目录）的`android.json `里，找到`AndroidManifest.xml`属性下找到并删除重复对象，之后再在 `AndroidManifest.xml`中删除重复权限，重新编译打包。
注：删除平台后再添加平台需重新删除