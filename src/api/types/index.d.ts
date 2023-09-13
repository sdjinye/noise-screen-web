export type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

export interface ApiParams<T = Record<string, any>> {
	params?: T
	method?: Method = 'get'
	dataMethod?: Method[]
	rule?: Record<string, any>
	loading?: (state: boolean) => void
	autoErrorPrompt?: boolean = true
}

export interface ApiData<T = Record<string, any>> {
	state: boolean
	result: T
	message: string
	errCode: number
}
