```
[Vue Component].vue

	<span>{{time | dateFormat('')}}</span>


	<script type="text/javascript">
		export default {
			name: '(Component Name)',
			filters: {
				dateFormat(value) {    // time作为默认参数传入，若有其他参数则在其之后，再将返回值替换time所在的整个插值语法（{{time | dateFormat}}）
					return value.toISOString();
				}
			}
		}
	</script>
`