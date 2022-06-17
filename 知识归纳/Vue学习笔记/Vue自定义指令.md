```
[Vue Component].vue

	<span v-['directive name']=></span>
	
	<script type="text/javascript">
		export default {
			name: '(Component Name)',
			data() {
				return {
					value: 1
				}
			}
			directives: {
				// 简写，不依靠返回值，
				['directive name'](){
					
				}
			}
		}
	</script>
```