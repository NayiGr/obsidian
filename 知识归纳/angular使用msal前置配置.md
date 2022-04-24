````
1. npm i msal@1.4.14

2. npm i @ionic-native/in-app-browser

3. ionic cordova plugin add cordova-plugin-inappbrowser@3.2.0

4. import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';;
   providers: [..., InAppBrowser]

5. app.store.ts: 
  adLoginConfig: 'adLoginConfig api',
  azureLogin: 'azureLogin api',

6. app.config.ts: 
export const AUTH_CONFIG: AuthConfig = {
   ...
   appGuid: 'xxx'
}
````
[azure-login.service.ts](obsidian://open?file=%2Fattachment%2Fazure-login.service.ts)