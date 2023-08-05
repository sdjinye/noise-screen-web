module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 37.5, // (Number | Function) 表示根元素字体大小或根据input参数返回根元素字体大小
			unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
			propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
			selectorBlackList: [], // （数组）要忽略并保留为 px 的选择器。
			replace: true, // 替换包含 rems 的规则，而不是添加回退。
			minPixelValue: 0, // 最小的转化单位
			exclude: /node_modules/i // 要忽略并保留为 px 的文件路径
		}
	}
	// pixrem 将rem转换为px
	// postcss-pxtorem 将px转换为rem
	// {
	// 	rootValue: 37.5,
	// 	propList: ['*']
	// }
}

// postcss-sprites 自动制作雪碧图，不用手动拼接啦，哈哈哈
// cssnano 压缩css代码(如果你是用webpack的话，css-loader集成了cssnano，你不需要再次引入)
// , require('postcss-import')
