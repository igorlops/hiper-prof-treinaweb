import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginErrorInterface, LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import { ApiService } from "@data/services/ApiService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function useLogin(){
    const [valuesLogin, setValuesLogin] = useState<LoginInterface>(
        {} as LoginInterface
    ),
    [messageError, setMessageError] = useState<LoginErrorInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState(''),
    router = useRouter()
    async function handleLogin(event:FormEvent) {
        event.preventDefault();

        if(!loading) {
            setLoading(true)
            await ApiService.post('/api/auth/login', valuesLogin)
                .then(({data}: AxiosResponse<ResponseLoginInterface>) => {
                    localStorage.setItem('token_hiperprof', data.token);
                    localStorage.setItem('refresh_token_hiperprof', data.refresh_token);
                    Router.listaDeAlunos.push(router)
                })
                .catch(({ response }: AxiosError<ResponseErrorInterface<LoginErrorInterface>>) => {
                    if(response) {
                        const { message, errors } = response.data;

                        setMessageError(errors)
                        setSnackMessage(message ?? "")
                    }
                }).finally(() => {
                    setLoading(false)
                });
        }
    }
    return {
        setValuesLogin,
        messageError,
        handleLogin,
        loading,
        snackMessage,
        setSnackMessage
    }
}