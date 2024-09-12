import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function useIndex(){
    const router = useRouter(),
    [search,SetSearch] = useState<string>(""),
    [messageError,SetMessageError] = useState<string>("");

    function onBuscarProfessor(event: FormEvent) {
        event.preventDefault();
        if(search.length >= 3){
            router.push("/pesquisa-professor")
        } else {
            SetMessageError("Mínimo de 3 caracteres")
        }
    }

    return {
        SetSearch,
        messageError,
        onBuscarProfessor
    }
}