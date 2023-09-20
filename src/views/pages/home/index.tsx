import { defineComponent, reactive, toRefs, ref } from 'vue'
import Map from '@/views/component/map'
import LeftData from '@/views/component/leftData'
import '@/views/pages/home/styles/index.less'
import AlarmImage from '@/assets/alarm.png'
import Line from './line'
import devlApi from '@/api/devApi'
import untilApi from '@/api/untilApi'
import { GetUserData } from '@/utils'
export default defineComponent({
	name: 'HomeView',
	setup() {
		const state = reactive({
			user: {} as any,
			showDeviceInfo: false,
			showDeviceVideo: false,
			showDeviceAlarmPopup: true,
			devlist: [],
			mapDevList: [],
			// 默认经纬度
			lat: 31.239637,
			lon: 121.498586,
			dataCheck: 'minute',
			selectOptin: ['LAF-SD', 'LAF-Max','LAF-Min','LAS-SD','LAS-Max','LAS-Min', 'LAI-SD', 'LAI-Max','LAI-Mix',
			'LCF-SD','LCF-Max','LCF-Min','LCS-SD','LCS-Max','LCS-Min', 'LCI-SD','LCI-Max','LCI-Min', 'LZF-SD','LZF-Max','LZF-Min', 
			'LZS-SD','LZS-Max','LZS-Min', 'LZI-SD','LZI-Max','LZI-Min','LEQ-A','LEQ-C','LEQ-Z','L5','L10','L50','L90','L95'],
			// 设备瞬时数据
			devDataRt: [] as any
		})
		state.user = GetUserData()
		// 获取列表中的设备
		const getDevList = () => {
			let param = {
				user_id: state.user.id,
				dept_id: state.user.dept_id,
				device_mn: '',
				device_name: '',
				device_status: -1,
				page_row_index: -20,
				page_row_count: 10,
				v_version: '',
				v_type: '',
				v_chanshu: '',
				v_cs_d: '',
				v_cs_x: ''
			}
			const api = devlApi.GetDevList({ params: param })
			api.then((data) => {
				// console.log(data)
				state.devlist = data
				// console.log("AAAAAAAAA",state.devlist)
			})
		}
		getDevList()
		// 列表中的设备选中，选中的设备信息 由子页面回传
		// 根据经纬度在页面中地位设备
		const devClick = (item) => {
			// console.log("AAA",state.lat,state.lon);
			// console.log("AAA",item);
			state.lat = parseFloat(item.latitude === '' ? state.lat : item.latitude)
			state.lon = parseFloat(item.longitude === '' ? state.lon : item.longitude)

			// console.log(state.lat,state.lon);
		}

		// 获取要在地图上显示的设备
		const getMapDevList = () => {
			let param = {
				cpn: 'p_device_map_rt',
				pns: [
					'v_user_id',
					'v_dept_id',
					'v_latitude',
					'v_longitude',
					'v_distance_min',
					'v_distance_max',
					'v_device_mn',
					'v_device_name',
					'v_device_status'
				],
				pts: [4, 4, 12, 12, 4, 4, 12, 12, 4],
				pvs: [state.user.id, state.user.dept_id, state.lat, state.lon, 1, 100000, '', '', -1]
			}
			// console.log(state.user.id, state.user.dept_id, state.lat, state.lon, 1, 100000, '', '', -1)
			const api = untilApi.callp({ params: param })
			api.then((data) => {
				// console.log(data)
				state.mapDevList = data
				// console.log("AAAAAAAAA",state.mapDevList)
			})
		}
		getMapDevList()

		// 地图中标记点击事件，显示设备详情页
		const eMarkerclick = (devid, devMn) => {
			// console.log('子页面传上', devid, devMn)

			getDataRtByMn(devMn)
			state.showDeviceInfo = true
		}

		// 根据MN查找实时数据
		const getDataRtByMn = (devMn) => {
			let param = {
				cpn: 'p_noise_rt',
				pns: ['v_user_id', 'v_dept_id', 'v_device_mn', 'v_device_name', 'v_device_status', 'v_page_row_index', 'v_page_row_count'],
				pts: [4, 4, 12, 12, 4, 4, 4],
				pvs: [state.user.id, state.user.dept_id, devMn, '', -1, -20, 20]
			}
			const api = untilApi.callp({ params: param })
			api.then((data) => {
				state.devDataRt = data
				// console.log(state.devDataRt)
			})
		}
		// 分钟数据选中
		const minuteCheck = () => {
			state.dataCheck = 'minute'
			state.selectOptin = ['LAF-SD', 'LAF-Max','LAF-Min','LAS-SD','LAS-Max','LAS-Min', 'LAI-SD', 'LAI-Max','LAI-Mix',
			'LCF-SD','LCF-Max','LCF-Min','LCS-SD','LCS-Max','LCS-Min', 'LCI-SD','LCI-Max','LCI-Min', 'LZF-SD','LZF-Max','LZF-Min', 
			'LZS-SD','LZS-Max','LZS-Min', 'LZI-SD','LZI-Max','LZI-Min','LEQ-A','LEQ-C','LEQ-Z','L5','L10','L50','L90','L95']
		}
		// 小时数据选中
		const hourCheck = () => {
			state.dataCheck = 'hour'
			state.selectOptin = ['L5','L10','L50','L90','L95','SD','LEQT','LMax','LMin']
		}
		// 日选中
		const dayCheck = () => {
			state.dataCheck = 'day'
			state.selectOptin = ['L5','L10','L50','L90','L95','SD','LEQT','LMax','LMin','LD','LN','LDN']
		}
		// 详情页面页面下拉选中
		const selectOptinCheck = () =>{
			console.log("selectOptinCheck")
		}
		return {
			selectOptinCheck,
			dayCheck,
			hourCheck,
			minuteCheck,
			eMarkerclick,
			devClick,
			// 将Object的键值对暴露
			...toRefs(state)
		}
	},
	render() {
		// 报警视频
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
		// 设备详情
		const deviceInfo = (
			<div class="device-info" a-down-close-trigger>
				<div class="device-info__title">
					<span>设备详情</span>
					<div class="device-info__close" onClick={() => (this.showDeviceInfo = false)}>
						x
					</div>
				</div>
				<div class="device-info__content">
					{this.devDataRt.map((item) => {
						return (
							<div>
								<div class="device-info__row">MN：{item.mn}</div>
								<div class="device-info__row">名称：{item.name}</div>
								<div class="device-info__row">
									LAF-Rtd：{item.nlaf_1 / 100}；LAS-Rtd：{item.nlas_1 / 100}； LAI-Rtd：{item.nlai_1 / 100}；LCF-Rtd：{item.nlcf_1 / 100}；LCS-Rtd：
									{item.nlcs_1 / 100}；LCI-Rtd：{item.nlci_1 / 100}
								</div>
								<div class="device-info__row">
									LZF-Rtd：{item.nlzf_1 / 100}；LZS-Rtd：{item.nlzs_1 / 100}；LZI-Rtd：{item.nlzi_1 / 100}；电池电压：{item.p1_1 / 100}；经度：
									{item.p4_1 / 100}；纬度：{item.p3_1/100}
								</div>
							</div>
						)
					})}
					<div class="device-info__history">
						<div class="device-info__history-tools">
							<div class={`device-info__history-tool ${this.dataCheck == 'minute' ? 'z-active' : ''}`} onClick={this.minuteCheck}>
								分钟数据
							</div>
							<div class={`device-info__history-tool ${this.dataCheck == 'hour' ? 'z-active' : ''}`} onClick={this.hourCheck}>
								小时数据
							</div>
							<div class={`device-info__history-tool ${this.dataCheck == 'day' ? 'z-active' : ''}`} onClick={this.dayCheck}>
								日数据
							</div>
							<select name="" id="" onChange={this.selectOptinCheck}>
								{this.selectOptin.map((item) => {
									// console.log('AAAA000', item)
									return <option id={item}>{item}</option>
								})}
							</select>
						</div>
						<Line />
					</div>
				</div>
			</div>
		)
		// 右下角报警提示
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

				<LeftData onDevClick={this.devClick} devlist={this.devlist} />
				<Map mapDevList={this.mapDevList} centLatitude={this.lat} centLongitude={this.lon} onEMarkerclick={this.eMarkerclick} />
				{this.showDeviceAlarmPopup ? alarmPopup : ''}
			</div>
		)
	}
})
