import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { ProfessorInterface } from "@data/@types/professor";
import { getUser } from "@data/services/MeService";

// Interface que define o estado e o dispatch
interface ProfessorReducerInterface {
    ProfessorState: ProfessorInterface | undefined;
    ProfessorDispatch: Dispatch<SetStateAction<ProfessorInterface | undefined>>;
}

// Valor inicial do contexto
const initialValue: ProfessorReducerInterface = {
    ProfessorDispatch: () => {},
    ProfessorState: undefined,
}

// Criando o contexto
export const ProfessorContext = createContext(initialValue);

// O componente ProfessorProvider que fornece o contexto
export const ProfessorProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [professor, setProfessor] = useState<ProfessorInterface>();

    useEffect(() => {
        getUser().then(({ data }) => {
            setProfessor(data)
        })
    }, [])
    return (
        // Passando o valor correto para o Provider
        <ProfessorContext.Provider value={{ ProfessorState: professor, ProfessorDispatch: setProfessor }}>
            {children}
        </ProfessorContext.Provider>
    );
}
