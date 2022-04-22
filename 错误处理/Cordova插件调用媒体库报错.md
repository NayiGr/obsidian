##### 报错信息：
```
File upload and download error code 3 and 401
```

1. config.xml add `<allow-navigation href="*" />`
2. update `cordova-plugin-file-transfer` to github(dev-2.0.0)
3. replace `android/`[FileTransfer.java](obsidian://open?file=%2Fattachment%2FFileTransfer.java)