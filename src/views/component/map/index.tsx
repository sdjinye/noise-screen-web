import { PropType, defineComponent, onMounted, watch } from 'vue'
import '@/views/component/map/styles/index.less'
import alarmPointImage from '@/assets/alarmPoint.png'
import faultPointImage from '@/assets/faultPoint.png'
import { props } from '@antv/g2/lib/api/chart'
import { Item } from 'ant-design-vue/es/menu'
export default defineComponent({
	name: 'ComponentMap',
	emits:['eMarkerclick'],
	props: {
		mapDevList: { type: Array } as any,
		centLongitude: { type: Number, default: 116.607214 },
		centLatitude: { type: Number, default: 35.400786 }
	},
	setup(props,{emit}) {
		let map

		function countCharacters(str) {
			// 提取中文字符数量
			const regexChinese = /[\u4e00-\u9fa5]/g
			const countChinese = (str.match(regexChinese) || []).length

			// 提取英文字符数量
			const regexEnglish = /[a-zA-Z]/g
			const countEnglish = (str.match(regexEnglish) || []).length

			// 提取数字数量
			const regexNumber = /[0-9]/g
			const countNumber = (str.match(regexNumber) || []).length

			// 返回结果对象
			return {
				chinese: countChinese,
				english: countEnglish,
				number: countNumber
			}
		}

		const setLabel = (type: 'alarm' | 'default' | 'fault' = 'default', position: number[], title: string, devid: Number, devMn: String) => {
			// 创建标记点对象
			const count = countCharacters(title)
			let length = count.chinese * 10
			length += (count.english + count.number) * 5
			let markerParmas = {}
			let labelParmas = {}
			switch (type) {
				case 'alarm':
					markerParmas = { position: position, icon: alarmPointImage }
					labelParmas = { direction: 'center', offset: new AMap.Pixel(0, 50), content: "<div class='info z-warn'>" + title + '</div>' }
					break

				case 'fault':
					markerParmas = { position: position, icon: faultPointImage, offset: new AMap.Pixel(-30, -110) }
					labelParmas = {
						direction: 'center',
						offset: new AMap.Pixel((length / 2) * -1, 80),
						content: "<div class='info z-danger'>" + title + '</div>'
					}
					break

				default:
					markerParmas = { position: position }
					labelParmas = { direction: 'center', offset: new AMap.Pixel(0, 35), content: "<div class='info'>" + title + '</div>' }
					break
			}
			const marker = new AMap.Marker(markerParmas)
			marker.setLabel(labelParmas)
			marker.setMap(map)
			// console.log(devid)
			marker.on('click', () => markerclick(devid,devMn))
		}
		// 地图标点点击事件
		const markerclick = (devid,devMn) => {
			// console.log('markerclick',devid,devMn)
			emit('eMarkerclick',devid,devMn)
		}

		onMounted(() => {
			map = new AMap.Map('cm-map-container', {
				resizeEnable: true,
				rotateEnable: true,
				pitchEnable: true,
				zoom: 17,
				pitch: 70,
				rotation: -15,
				viewMode: '3D', //开启3D视图,默认为关闭
				buildingAnimation: true, //楼块出现是否带动画
				expandZoomRange: true,
				zooms: [3, 20],
				center: [props.centLongitude, props.centLatitude]
			})
			// 地图加载标点
			watch(
				() => props.mapDevList,
				() => {
					let lon
					let lat
					props.mapDevList.forEach((item) => {
						// console.log(item)
						setLabel(item.online === 0 ? 'fault' : 'default', [item.longitude, item.latitude], item.mn, item.device_id_d,item.mn)
						// setLabel('fault', [116.330926, 39.997245], 'K14创业路与开拓路路灯杆')
						lon = item.longitude
						lat = item.latitude
						// console.log("111111",lon,lat)
					})
					map.setCenter([lon, lat])
				}
			)
			// 选中设备 地图选中
			watch(
				() => [props.centLongitude, props.centLatitude],
				() => {
					// console.log(props.centLongitude, props.centLatitude)
					map.setCenter([props.centLongitude, props.centLatitude])
				}
			)
			
		})


		return map
	},
	render() {
		return <div class="cm-map" id="cm-map-container"></div>
	}
})
