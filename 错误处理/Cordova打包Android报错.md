#### 未知错误

Cordova打包Android时提示报错：

```
error：......\AndroidManifest.xml:61: error: No resource identifier found for attribute 'appComponentFactory' in package 'android'
......
Execution failed for task ':processDebugResources'. > 	com.android.ide.common.process.ProcessException: Failed to execute aapt
```

解决方案一：

```
cordova plugin add cordova-android-support-gradle-release --variable ANDROID_SUPPORT_VERSION=27.+
```


解决方案二：

在 /platform/android 目录下找到`build.gradle`文件，打开并在`def promptForReleaseKeyPassword() {...}`前加入以下内容：

```
configurations.all {
  resolutionStrategy {
      force 'com.android.support:support-v4:27.1.0'
  }
}
```




#### 权限重复

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

#### PC连接真机测试打包失败
执行命令行：
- 打开设备：`adb start-server`
- 关闭设备：`adb kill-server`
- 查看端口：`adb nodaemon server`
- 查看端口占用情况：`netstat -ano | findstr "5037"`
- 删除测试机中已存在同名apk：`adb uninstall + (config.xml 中 widget 的 id)`