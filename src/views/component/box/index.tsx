import { defineComponent } from 'vue'
import '@/views/component/box/styles/index.less'
export default defineComponent({
	name: 'ComponentBox',
	props: {
		title: { type: String, default: '-' }
	},
	render() {
		return <div class="cm-box">{() => (typeof this.$slots.default === 'undefined' ? '' : this.$slots.default())}</div>
	}
})
