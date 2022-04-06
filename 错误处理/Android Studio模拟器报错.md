##### 报错信息：
```
Error:Emulator: Process finished with exit code -1073741819 (0xC0000005)
```

解决方案：
进入目录：`C:\Users\Administrator\.android\avd\(设备).avd\`
打开编辑：`config.ini`
修改：`hw.gpu.mode=auto` => `hw.gpu.mode=off`