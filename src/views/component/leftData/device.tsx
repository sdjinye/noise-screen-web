import { defineComponent } from 'vue'
import '@/views/component/leftData/styles/device.less'
export default defineComponent({
	name: 'ComponentLeftDataDevice',
	render() {
		return (
			<div class="cm-device-list">
				<div class="cm-device-row z-t">
					<h6>设备列表</h6>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K9通源大道与科技路口监控杆</div>
					<div class="cm-device-row__item">YL0912WZ002303011</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K10通源大道与陕煤路(太阳能)</div>
					<div class="cm-device-row__item">YL0912WZ002303020</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K7汇源大道与能源路口监控杆</div>
					<div class="cm-device-row__item">YL0912WZ002303019</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K4能源路东1设备（太阳能）</div>
					<div class="cm-device-row__item">YL0912WZ002303018</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K8通源大道与能源路（太阳能）</div>
					<div class="cm-device-row__item">YL0912WZ002303017</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K14创业路与开拓路路灯杆</div>
					<div class="cm-device-row__item">YL0912WZ002303016</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K13榆神管委会后山气象站监控杆</div>
					<div class="cm-device-row__item">YL0912WZ002303015</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K19清水北路与神华路监控杆</div>
					<div class="cm-device-row__item">YL0912WZ002303014</div>
					<div class="cm-device-row__item">在线</div>
				</div>
				<div class="cm-device-row">
					<div class="cm-device-row__item z-title">K11通源大道与延长路监控杆</div>
					<div class="cm-device-row__item">YL0912WZ002303013</div>
					<div class="cm-device-row__item">在线</div>
				</div>
			</div>
		)
	}
})
