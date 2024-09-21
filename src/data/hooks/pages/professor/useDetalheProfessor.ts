import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";
import { BrowserService } from "@data/services/BrowserService";
import { Router } from "@routes/routes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDetalheProfessor() {
    const router = useRouter(),
    [professor, setProfessor] = useState<ProfessorInterface>(),
    [professores, setProfessores] = useState<ProfessorInterface[]>([])

    useEffect(() => {
        const data = sessionStorage.getItem("hyperprof_professor");

        if(data) {
            setProfessor(JSON.parse(data));
            getProfessores();
        } else {
            Router.home.push(router)
        }
        // return () => {
        //     sessionStorage.removeItem("hyperprof_professor")
        // }
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

    return { professor, professores, selecionarProfessor }
}