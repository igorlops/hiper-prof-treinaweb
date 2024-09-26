import { ProfessorCadastroInterface, ProfessorErrorInterface } from "@data/@types/professor";
import useCadastroProfessor from "@data/hooks/pages/professor/useCadastroProfessor";
import CadastroProfessorPage from "@pages/professor/cadastro-professor";
import { BrowserService } from "./BrowserService";

export const FormSchemaService = {
    cadastroProfessor(professor: ProfessorCadastroInterface) : ProfessorErrorInterface {
        const formValidate = {} as ProfessorErrorInterface

        // if(!professor.nome) {
        //     formValidate.nome = "Campo obrigatório";
        //     BrowserService.scrollToTop();
        // }
        // if(!professor.idade) {
        //     formValidate.idade = "Campo obrigatório";
        //     BrowserService.scrollToTop();
        // }
        // if(!professor.valor_hora) {
        //     formValidate.valor_hora = "Campo obrigatório";
        //     BrowserService.scrollToTop();
        // }
        // if(!professor.descricao) {
        //     formValidate.descricao = "Campo obrigatório";
        //     BrowserService.scrollToTop();
        // }
        // if(!professor.email?.includes("@")) {
        //     formValidate.email = "Campo obrigatório";
        //     if(professor.email && !professor.email?.includes("@")) {
        //         formValidate.email = "E-mail inválido"
        //     }
        //     BrowserService.scrollToTop();
        // }

        // if(professor.password && professor.password_confirmation) {
        //     if(professor.password != professor.password_confirmation) {
        //         formValidate.password = "As senhas são diferentes";
        //         formValidate.password_confirmation = "As senhas são diferentes";
        //     }
        // } 
        return formValidate;
    },
}