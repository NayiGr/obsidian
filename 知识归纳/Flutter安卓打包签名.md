1. `document`下载mobility.keystore,放入`/Android/app`层级下；
2. 将`key.properties`放入`andriod`内
```
storePassword=
keyPassword=
keyAlias=
storeFile=mobility.keystore
```
3. 运行 ：
Windows 电脑
`flutter build apk --obfuscate --split-debug-info=/pps_installation/`
Mac 电脑
`flutter build apk --obfuscate --split-debug-info=/Users/mobility/pps_apk/`