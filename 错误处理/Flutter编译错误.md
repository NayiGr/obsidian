#### 提示svg文件错误
报错信息：
```
I/flutter (18076): unhandled element switch; Picture key: AssetBundlePictureKey(bundle: PlatformAssetBundle#74687(), name: "assets/icons/xxx.svg", colorFilter: null)
```

svg文件中存在不可用的标签或属性，有些不可以标签可能导致图片无法显示；
如<switch></switch>，包裹了`<path></path>`导致其中内容无法显示；
还有其他不可用标签，如：`<style></style>`。

#### Localizations Error
```
Flutter does not support the non-standard locale form en_gb (which might be en_GB
'package:flutter_localizations/src/cupertino_localizations.dart':
Failed assertion: line 442 pos 9: 'locale.toString() == localeName'
...
```

安装`intl: ^0.17.0-nullsafety.2`，清除模拟器缓存，清除插件缓存，重新编译语言