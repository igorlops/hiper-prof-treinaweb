import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";
import { Router } from "@routes/routes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePesquisaProfessor() {
        const router = useRouter(),
        [search, setSearch] = useState<string>(router.query.search as string),
        [professores,setProfessores] = useState<ProfessorInterface[]>(),
        [timeOutRef, setTimeoutRef] = useState<NodeJS.Timeout>()
    
    useEffect(() => {
        ApiService.get("/api/professores",{params: {q: router.query.search as string}})
        .then(({data}:AxiosResponse<ProfessorInterface[]>) => {
            setProfessores(data);
        })
        .catch(() => setProfessores([]))
    }, [search]);

    function onSearch(value:string) {
        clearTimeout(timeOutRef)
        const time = setTimeout(() => {
            setSearch(value)
            Router.pesquisaProfessor.push(router, value)
        }, 1000)
        setTimeoutRef(time)
        // setSearch(value)
    }
    function selecionarProfessor(professor: ProfessorInterface){
        sessionStorage.setItem('hyperprof_professor',JSON.stringify(professor))
        Router.detalheProfessor.push(router)
    }
    return { professores, onSearch, selecionarProfessor };
}