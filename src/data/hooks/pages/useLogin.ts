import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginErrorInterface, LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { ApiService } from "@data/services/ApiService";
import { getUser } from "@data/services/MeService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

export default function useLogin(){
    const [valuesLogin, setValuesLogin] = useState<LoginInterface>(
        {} as LoginInterface
    ),
    [messageError, setMessageError] = useState<LoginErrorInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState(''),
    router = useRouter(),
    {ProfessorState: professor, ProfessorDispatch} = useContext(ProfessorContext)
    async function handleLogin(event:FormEvent) {
        event.preventDefault();

        if(!loading) {
            setLoading(true)
            await ApiService.post('/api/auth/login', valuesLogin)
                .then( async ({data}: AxiosResponse<ResponseLoginInterface>) => {
                    localStorage.setItem('token_hiperprof', data.token);
                    localStorage.setItem('refresh_token_hiperprof', data.refresh_token);
                    await handleGetUser()
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

    async function handleGetUser() {
        await getUser().then(({ data }) => {
            ProfessorDispatch(data);
        })
        .catch(() => {
            setSnackMessage("Erro inesperado ao tentar fazer login")
        })
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