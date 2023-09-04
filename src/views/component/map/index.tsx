import { defineComponent, onMounted } from 'vue'
import '@/views/component/map/styles/index.less'
import alarmPointImage from '@/assets/alarmPoint.png'
import faultPointImage from '@/assets/faultPoint.png'
export default defineComponent({
	name: 'ComponentMap',
	setup() {
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

		const setLabel = (type: 'alarm' | 'default' | 'fault' = 'default', position: number[], title: string) => {
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
				center: [116.333926, 39.997245]
			})

			setLabel('fault', [116.330926, 39.997245], 'K14创业路与开拓路路灯杆')
			setLabel('default', [116.333926, 39.997245], 'K10通源大道与陕煤路(太阳能)')
			setLabel('alarm', [116.332946, 39.994255], 'K9通源大道与科技路口监控杆')
			setLabel('default', [116.332326, 39.999245], 'K7汇源大道与能源路口监控杆')
			setLabel('alarm', [116.333926, 39.993245], 'K4能源路东1设备（太阳能）')
			setLabel('default', [116.343926, 39.997245], 'K8通源大道与能源路（太阳能）')
			setLabel('fault', [116.336926, 39.997245], 'K13榆神管委会后山气象站监控杆')

			// K7汇源大道与能源路口监控杆
			// K4能源路东1设备（太阳能）
			// K8通源大道与能源路（太阳能）
			// K13榆神管委会后山气象站监控杆

			// K19清水北路与神华路监控杆
			// K11通源大道与延长路监控杆
			// label.setMap(map)
		})

		// alarmPoint.png

		return map
	},
	render() {
		return <div class="cm-map" id="cm-map-container"></div>
	}
})
