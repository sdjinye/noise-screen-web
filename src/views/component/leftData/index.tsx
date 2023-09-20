import { defineComponent, toRefs } from 'vue'
import Overview from '@/views/component/leftData/overview'
import Device from '@/views/component/leftData/device'
import Ranking from '@/views/component/leftData/ranking'
import '@/views/component/leftData/styles/index.less'
import { Item } from 'ant-design-vue/es/menu'
export default defineComponent({
	name: 'ComponentLeftData',
	emits:["devClick"],
	props: {
		devlist: { type: Array } as any
	},
	setup(props,{emit}){
		const state = {
			devItem:{}
		}
		// 将接收到的子页面信息，上传给父页面
		const onDevclick = () => {
			emit('devClick', state.devItem)
		}
		// 接收子页面设备选中信息
		const devItemClick = (item) =>{
			// console.log("子值点击1",item)
			state.devItem = item;
			onDevclick();
		}
		return {
			devItemClick,
			...toRefs(state)
		}
	},
	render() {
		return (
			<div class="left-data">
				{/* 设备概述 */}
				{/* {JSON.stringify(this.$props.devlist)} */}
				<Overview />
				<Device onItemClick={this.devItemClick} devlist={this.$props.devlist}  />
				<Ranking devlist={this.$props.devlist}/>
			</div>
		)
	}
})
