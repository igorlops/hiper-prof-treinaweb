import { getUser } from "@data/services/MeService";
import { Router } from "@routes/routes";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function useIndex(){
    const router = useRouter(),
    [search,SetSearch] = useState<string>(""),
    [messageError,SetMessageError] = useState<string>("");

    function onBuscarProfessor(event: FormEvent) {
        event.preventDefault();
        if(search.length >= 3){
            Router.pesquisaProfessor.push(router,search);
        } else {
            SetMessageError("Mínimo de 3 caracteres")
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token_hiperprof');
        token && getUser()
            .then(() => Router.listaDeAlunos.push(router))
        // eslint-disable-next-line react-hooks/exaustive-deps
    }, []);

    return {
        SetSearch,
        messageError,
        onBuscarProfessor
    }
}