export interface RequestGetOptions {
    token?: string
    cache?: any
    headers?: any
}
const requestDelete = async (url: string, options: RequestGetOptions = {}) => {
    try {
        if (options.token) {
            options.headers = options.headers || {}
            options.headers.authorization = `Bearer ${options.token}`
        }
        const typeFetch = { method: "DELETE", cache: options.cache || 'no-store' }
        const fetchOptions = { ...options, ...typeFetch }
        const response = await fetch(url, fetchOptions)
        if (!response.ok) {
            return await response.json()
        }
        return await response.json()
    } catch (error) {
        console.log("Error del servidor ", error)
    }
}

export default requestDelete