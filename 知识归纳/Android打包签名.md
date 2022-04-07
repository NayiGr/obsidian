##### 方法一（.bat文件打包）：
1. 命令行输入：`ionic cordova build android --prod --release`      //  在ionic项目中直接打包加上ionic前缀;

2. 打开Android签名文件夹，如：
`D:\Mobility-Update\trunk\Documents\09 Configuration and Delivery\Certificate\android`
打开目录下的`keystore.txt`文件，找到所需的`Alias name`复制到同目录下的 `android_sign.cmd`(编辑打开)中，找到`set key_alias`属性，并将所得`Alias name`赋给它，如：`set key_alias=contacts`

3. 找到Cordova打包的Android App目录中的`android-release-unsigned.apk`文件;^[release文件名字不定]^[一般打包后是这个文件名，路径: `C:\Users\Admin\Desktop\App\platforms\android\build\outputs\apk` ]
	复制到先前配置签名的目录下，并将`android-release-unsigned.apk`复制，赋值给`android_sign.cmd`中的`set apk_unsigned`属性，如`set apk_unsigned=android-release-unsigned.apk`;

4. 将App要发布的名字赋给`set apk_aligned`属性，如`set apk_aligned=BusinessPartner.apk`;

5. 将系统sdk目录下`build-tools`文件中最新版本SDK的路径赋给`set PATH`属性，如：`set PATH=%PATH%;D:\Android\android-sdk\build-tools\26.0.2`;

6. 最后双击`android_sign.cmd`文件执行。

注：`keystore.txt`相当于签名所需的密钥库，每个签名对应一个密钥，`android_sign.cmd`是最后执行签名的文件，其中还有一些其它属性是需要进行配置。

---

##### 方法二（Android Studio打包）：
1. 打开`Generate Signed Bundle / APK`;

![[open_generate_singed.png]]


2. 选择打包格式(aab / apk)

![[generate_signed_app.png]]


3. 配置keystore路径，password，alias;^[记住密码会导致打包报错，取消记住密码]

![[config_generate_singed.png]]


4. 选择debug / release。

![[finish_generate_signed.png]]
