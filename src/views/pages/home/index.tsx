import { defineComponent, reactive, toRefs } from 'vue'
import Map from '@/views/component/map'
import LeftData from '@/views/component/leftData'
import '@/views/pages/home/styles/index.less'
import AlarmImage from '@/assets/alarm.png'
import Line from './line'
export default defineComponent({
	name: 'HomeView',
	setup() {
		const state = reactive({
			showDeviceInfo: true,
			showDeviceVideo: false,
			showDeviceAlarmPopup: true
		})

		return {
			...toRefs(state)
		}
	},
	render() {
		const alarmVideo = (
			<div class="device-info" a-down-close-trigger>
				<div class="device-info__title">
					<span>报警视频</span>
					<div class="device-info__close" onClick={() => (this.showDeviceVideo = false)}>
						x
					</div>
				</div>
				<div class="device-info__content">
					<video
						autoplay
						controls
						src="http://112.35.143.195:11327/sta/img/jpg/2023-09/2023-09-02/CAMERA12C0000FC9E03298/merge1_HDjvo01QXrktstAb.mp4"></video>
				</div>
			</div>
		)
		const deviceInfo = (
			<div class="device-info" a-down-close-trigger>
				<div class="device-info__title">
					<span>设备详情</span>
					<div class="device-info__close" onClick={() => (this.showDeviceInfo = false)}>
						x
					</div>
				</div>
				<div class="device-info__content">
					<div class="device-info__row">MN：YL0912WZ002303011</div>
					<div class="device-info__row">名称：K9通源大道与科技路口监控杆</div>
					<div class="device-info__row">LAF-Rtd：48.80；LAS-Rtd：48.80；LAI-Rtd：49.20；LCF-Rtd：61.10；LCS-Rtd：60.60；LCI-Rtd：62.60</div>
					<div class="device-info__row">LZF-Rtd：63.10；LZS-Rtd：62.60；LZI-Rtd：65.30；电池电压：12.60；经度：0.00；纬度：0.00</div>
					<div class="device-info__history">
						<div class="device-info__history-tools">
							<div class="device-info__history-tool z-active">分钟数据</div>
							<div class="device-info__history-tool">小时数据</div>
							<div class="device-info__history-tool">日数据</div>
							<select name="" id="">
								<option>LAF-Rtd</option>
								<option>LAS-Rtd</option>
								<option>LAI-Rtd</option>
								<option>LCF-Rtd</option>
								<option>LCS-Rtd</option>
								<option>LCI-Rtd</option>
								<option>LZF-Rtd</option>
								<option>LZS-Rtd</option>
								<option>LZI-Rtd</option>
								<option>电池电压</option>
								<option>经度</option>
								<option>纬度</option>
							</select>
						</div>
						<Line />
					</div>
				</div>
			</div>
		)

		const alarmPopup = (
			<div class="alarm-video-popup">
				<div class="alarm-video-popup__image" onClick={() => (this.showDeviceVideo = true)}>
					<img src={AlarmImage} alt="" />
				</div>

				<div class="alarm-video-popup__content" onClick={() => (this.showDeviceVideo = true)}>
					<div
						class="alarm-video-popup__content-close"
						onClick={(e) => {
							this.showDeviceAlarmPopup = false
							e.stopPropagation()
						}}>
						x
					</div>
					<h2>K9通源大道与科技路口监控杆</h2>
					<p>2023-09-04 10:17:20</p>
					<span> 发生了视频报警事件，并上传的超标报警视频，请注意查看</span>
				</div>
			</div>
		)
		return (
			<div class="page-home">
				{(() => (this.showDeviceInfo ? deviceInfo : ''))()}
				{(() => (this.showDeviceVideo ? alarmVideo : ''))()}

				<LeftData />
				<Map />
				{this.showDeviceAlarmPopup ? alarmPopup : ''}
			</div>
		)
	}
})
