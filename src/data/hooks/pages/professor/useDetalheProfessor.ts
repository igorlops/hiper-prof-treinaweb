import { AlunoErrorResponseInterface, AlunoInterface } from "@data/@types/alunos";
import { ResponseErrorInterface } from "@data/@types/axios_response";
import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";
import { BrowserService } from "@data/services/BrowserService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function useDetalheProfessor() {
    const router = useRouter(),
    [professor, setProfessor] = useState<ProfessorInterface>(),
    [professores, setProfessores] = useState<ProfessorInterface[]>([]),
    [openDialog, setOpenDialog] = useState<boolean>(false),
    [aluno, setAluno] = useState<AlunoInterface>({
        nome: "",
        data_aula:"",
        email:"",
        id:1
    }),
    [snackMessage, setSnackMessage] = useState(''),
    [alunoErro, setAlunoErro] = useState<AlunoErrorResponseInterface>()

    useEffect(() => {
        const data = sessionStorage.getItem("hyperprof_professor");
        console.log(data)

        if(data) {
            setProfessor(JSON.parse(data));
            getProfessores();
        } else {
            Router.home.push(router)
        }

        return () => {
            console.log("removendo item")
            sessionStorage.removeItem("hyperprof_professor")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getProfessores() {
        await ApiService.get("/api/professores", { 
            params: router.query.search 
        }).then(({ data }: AxiosResponse<ProfessorInterface[]>) => {
            setProfessores(data)
        })
        .catch(() => setProfessores([]));
    }

    function selecionarProfessor(professor:ProfessorInterface) {
        setProfessor(professor);
        sessionStorage.setItem("hyperprof_professor", JSON.stringify(professor));
        BrowserService.scrollToTop()
    }

    function formatDataToJson(data: string):Date {
        const [_data, tempo] = data.split(' ');
        const [dia,mes,ano] = _data.split("/")
        const [hora,minuto] = tempo?.split(':') ?? []

        const newDate =  new Date(`${mes} ${dia} ${ano} ${hora}:${minuto} UTC`);
        return newDate;
    }
    async function handleSubmit() {
        setSnackMessage("Agendado com sucesso")

        const newDate = {
            ...aluno,
            data_aula: formatDataToJson(aluno.data_aula as string)
        } as AlunoInterface

        await ApiService.post(`/api/professores/${professor!.id}/alunos`, newDate)
            .then(
                () => {
                    setOpenDialog(false),
                    setAluno({ 
                        data_aula: "", 
                        nome: "", 
                        email:"", 
                        id:1
                    }),
                    setSnackMessage("Agendado com sucesso")
                }
            )
            .catch(({response}:AxiosError<ResponseErrorInterface<AlunoErrorResponseInterface>>) => {
                if(response) {
                    setAlunoErro(response.data.errors)
                    setSnackMessage(response.data.message)
                }
            })
    }

    return {    
        professor, 
        professores, 
        selecionarProfessor, 
        openDialog, 
        setOpenDialog,
        setAluno,
        handleSubmit,
        snackMessage,
        setSnackMessage,
        alunoErro,
        setAlunoErro, 
    }
}