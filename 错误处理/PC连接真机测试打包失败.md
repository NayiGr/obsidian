执行命令行：
    打开设备：`adb start-server`
    关闭设备：`adb kill-server`
    查看端口：`adb nodaemon server`
    查看端口占用情况：`netstat -ano | findstr "5037"`
    删除测试机中已存在同名apk：`adb uninstall + (config.xml 中 widget 的 id)`