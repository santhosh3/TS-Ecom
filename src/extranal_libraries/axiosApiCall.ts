async function apiCall(api: string, token: string): Promise<any> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('Authorization', token)
    headers.set('X-Custom-Header', 'CustomValue')
    const request: RequestInfo = new Request(api, {
        method: 'GET',
        headers: headers
    })
    try {
        const response = await fetch(request);
        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(errorResponse.error);
        }
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        throw error;
    }
}

export default apiCall