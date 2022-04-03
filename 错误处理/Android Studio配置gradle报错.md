android studio run 报错：
```
Exception in thread "main" javax.net.ssl.SSLException: Connection has been shutdown: javax.net.ssl.SSLException: Tag mismatch!
	at sun.security.ssl.SSLSocketImpl.checkEOF(SSLSocketImpl.java:1533)
	at sun.security.ssl.AppInputStream.available(AppInputStream.java:60)
	at java.io.BufferedInputStream.available(BufferedInputStream.java:410)
	at sun.net.www.MeteredStream.available(MeteredStream.java:170)
	at sun.net.www.http.KeepAliveStream.close(KeepAliveStream.java:85)
	at java.io.FilterInputStream.close(FilterInputStream.java:181)
	at sun.net.www.protocol.http.HttpURLConnection$HttpInputStream.close(HttpURLConnection.java:3527)
	at org.gradle.wrapper.Download.downloadInternal(Download.java:77)
	at org.gradle.wrapper.Download.download(Download.java:44)
	at org.gradle.wrapper.Install$1.call(Install.java:61)
	at org.gradle.wrapper.Install$1.call(Install.java:48)
	at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:65)
	at org.gradle.wrapper.Install.createDist(Install.java:48)
	at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:128)
	at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:61)
...
```


尝试解决方案：
一、配置gradle，可能出现卡在`Running Gradle task 'assembleDebug'`，可手动下载并在项目`/gradle/wrapper/gradle-wrapper.properties`中配置引用本地路径：`distributionUrl=file\:///D:/**/**/**/gradle-6.7-all.zip`（本地gradle路径）

二、在`android/build.gradle`目录下，将`buildscript`和`allprojects`中的`repositories`调用的方法
```
     google()
     jcenter()
```
替换为：
```
	maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
```
      
