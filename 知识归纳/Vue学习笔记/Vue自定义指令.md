自定义函数在**指令与元素成功绑定**时，和**指令所在的模板被重新解析**时调用
```html
[Vue Component].vue

	<span v-['directive name']='value'></span>
	
	<script type="text/javascript">
		export default {
			name: '(Component Name)',
			data() {
				return {
					value: 1
				}
			}
			directives: {
				// 简写，不依靠返回值触发修改，依靠修改DOM元素改变
				['directive name'](element, binding){    // 第一个参数是指令绑定的DOM元素，第二个参数是当前指令的绑定对象
					element.innerText = binding.value * 10;    // binding.value指所绑定的值
				}
			}
		}
	</script>
```