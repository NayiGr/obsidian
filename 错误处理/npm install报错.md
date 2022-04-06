#### `node-sass`
##### 报错一：
```
ERROR in ./src/global.scss (./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--14-3!./src/global.scss)
......
```

解决方案：
`npm install -g node-gyp`
`npm install --global --production windows-build-tools`
`npm uninstall node-sass`
`npm install node-sass`

---

##### 报错二：
```
[ERROR] ionic-app-scripts has unexpectedly closed (exit code 1).
```

解决方案：
1. 检查`node`版本和`node-sass`版本是否匹配
	`Node 11 -> node-sass@4.10+`
	`Node 10 -> node-sass@4.9+`
	`Node 8  -> node-sass@4.5.3+`

2. `npm rebuild node-sass`
    `npm rebuild node-sass --force`

3. `npm install`

---

#### `@types/jasmine`
```
ERROR in node_modules/@types/jasmine/index.d.ts(138,47): error TS1005: ';' expected.
node_modules/@types/jasmine/index.d.ts(138,90): error TS1005: '(' expected.
node_modules/@types/jasmine/index.d.ts(138,104): error TS1005: ']' expected.
node_modules/@types/jasmine/index.d.ts(138,112): error TS1005: ',' expected.
node_modules/@types/jasmine/index.d.ts(138,113): error TS1136: Property assignment expected.
......
```

解决方案：
`@types/jasmine`和`typescript`版本不匹配，修改`typescript`版本
如：当前匹配版本`@types/jasmine@2.5.38`和`typescript@2.9.2`

---
