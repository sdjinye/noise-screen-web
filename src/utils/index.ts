export function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	const charactersLength = characters.length

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}

export function GetUserData() {
	const userData = localStorage.getItem('device6.jinyeins.com:16479/userData')
	if (typeof userData === 'undefined' || userData === '' || userData === null) {
		console.error('当前用户未登录')
		return false
	}

	const user = JSON.parse(userData)
	return user
}
