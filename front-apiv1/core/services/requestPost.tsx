export interface RequestGetOptions {
    token?: string
    cache?: any
    headers?: any
}
const requestFetch = async (formData: object, url: string, method: string, options: RequestGetOptions = {}) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.token && { 'Authorization': `Bearer ${options.token}` }),
        };

        const response = await fetch(url, {
            method: method,
            headers,
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message };
        }

        return data;
    } catch (error) {
        console.error('Error al hacer la petición POST:', error);
    }
};
export default requestFetch;