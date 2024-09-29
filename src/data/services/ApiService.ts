import axios, { AxiosError, AxiosResponse } from "axios";

export const ApiService = axios.create({
    baseURL: "https://alunos.treinaweb.com.br/hyperprof",
    headers: {
        "Content-Type":"application/json",
        "Accept-Language" :"pt-BR"
    }
})

ApiService.interceptors.response.use(
    (response) => {
        return response;
    }, 
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            return await handleTokenRefresh(error);
        }

        return Promise.reject(error);
    }
);

async function handleTokenRefresh(error: AxiosError) {
    try {
        const refreshToken = localStorage.getItem('refresh_token_hiperprof');
        if(refreshToken) {
            await ApiService.post<{token: string, refresh_token: string}>
            ('/api/auth/refresh', { 
                refresh_token: refreshToken
            })
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token_hiperprof',data.token);
                localStorage.setItem('refresh_token_hiperprof',data.refresh_token);
            });

            return await ApiService({
                ...error.config,
                headers: {
                    ...error.config?.headers,
                    Authorization: `Bearer ${localStorage.getItem('token_hiperprof')}`,
                }
            })
        }
    } catch(error) {
        return Promise.reject(error)
    }
}