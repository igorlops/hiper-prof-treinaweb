import { AlunoInterface } from "@data/@types/alunos";
import { ApiService } from "@data/services/ApiService";
import { Router } from "@routes/routes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePainelProfessor() {

    const [alunos,setAlunos] = useState<AlunoInterface[]>(),
    [expanded, setExpanded] = useState(''),
    router = useRouter();

    useEffect(() => {
        ApiService.get("/api/professores/alunos", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_hiperprof')}`,
            }
        })
        .then(({ data }: AxiosResponse<AlunoInterface[]>) => {
            setAlunos(data);
        })
        .catch(() => {
            Router.login.push(router);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        alunos,
        expanded,
        setExpanded
    }
}