````
1. npm i msal@1.4.14

2. npm i @ionic-native/themeable-browser

3. ionic cordova plugin add git+ssh://git@gitlab.mtwoai.com:10022/mobility/cordova-plugin-themeablebrowser.git

4. import {ThemeableBrowser} from '@ionic-native/themeable-browser/ngx';
   providers: [..., ThemeableBrowser]

5. app.service.ts: remove STORE_LIST, use STORE_LIST from mobility-lib

6. app.store.ts: 
  adLoginConfig: '/services/mtwo/publicapi/aadapp/1.0/config',
  azureLogin: '/services/mtwo/publicapi/aadapp/1.0/login',

7. app.config.ts: 
export const AUTH_CONFIG: AuthConfig = {
   ...
   appGuid: 'xxx'
}
````

* replace themeablebrowser to inappbrowser 3.2.0