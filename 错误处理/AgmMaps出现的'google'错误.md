安装@agm/core插件使用，编译后提示报错：

```
ERROR in node_modules/@agm/core/lib/directives/circle.d.ts:1:23 - error TS2688: Cannot find type definition file for 'googlemaps'.

1 /// <reference types="googlemaps" />
                        ~~~~~~~~~~
node_modules/@agm/core/lib/directives/circle.d.ts:51:34 - error TS2304: Cannot find name 'google'.

51     strokePosition: keyof typeof google.maps.StrokePosition;
                                    ~~~~~~
node_modules/@agm/core/lib/directives/circle.d.ts:67:32 - error TS2503: Cannot find namespace 'google'.

67     centerChange: EventEmitter<google.maps.LatLngLiteral>;
                                  ~~~~~~
node_modules/@agm/core/lib/directives/circle.d.ts:71:31 - error TS2503: Cannot find namespace 'google'.

71     circleClick: EventEmitter<google.maps.MouseEvent>;
                                 ~~~~~~
node_modules/@agm/core/lib/directives/circle.d.ts:75:34 - error TS2503: Cannot find namespace 'google'.

75     circleDblClick: EventEmitter<google.maps.MouseEvent>;
......
```

解决方案：
安装版本`@types/googlemaps@3.39.12`