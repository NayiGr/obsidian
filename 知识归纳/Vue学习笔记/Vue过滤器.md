##### 局部过滤器
```
[Vue Component].vue

	<span>{{time | dateFormat(toUTCString) | stringSlice}}</span>    // 过滤器按从左到右将结果依次执行
	<span :[value]="time | dateFormat(toUTCString) | stringSlice"></span>    // 过滤器只能在插值语法和(v-bind:属性)中使用

	<script type="text/javascript">
		export default {
			name: '(Component Name)',
			filters: {
			    // time作为默认参数传入，若有其他参数则在其之后，再将返回值替换time所在的整个插值语法（{{time | dateFormat}}）
				dateFormat(value, type) {
					if (type == toUTCString) {
						return value.toUTCString();
					}
					return value.toISOString();
				},
				stringSlice(value) {
					return value.slice(0, 4);
				}
			}
		}
	</script>
```

##### 全局过滤器
```
	Vue.filter('dateFormat', function(value){});    // 必须在new Vue()实例前，设置好过滤器
```