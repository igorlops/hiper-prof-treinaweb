import { NextRouter } from "next/router";

export const Router = {
    home: {
        name:'/',
        push: function(router: NextRouter){
            router.push({pathname: this.name});
        },
        icon:"home",
    },
    pesquisaProfessor: {
        name: "/pesquisa-professor",
        push: function(router: NextRouter,search?: string) {
            router.push( {pathname: this.name, query:{ search }})
        },
        icon: ""
    },
    detalheProfessor: {
        name: "/professor/detalhe-professor",
        push: function(router: NextRouter, search?: string) {
            router.push( {pathname: this.name, query: { search }})
        },
        icon: ""
    },
    cadastroProfessor: {
        name: "/professor/cadastro-professor",
        push: function(router: NextRouter) {
            router.push( {pathname: this.name})
        },
        icon: "app_registration"
    },
    listaDeAlunos: {
        name: "/professor/",
        push: function(router: NextRouter) {
            router.push( {pathname: this.name})
        },
        icon: "lista"
    },
    login: {
        name: "/login",
        push: function(router: NextRouter) {
            router.push( {pathname: this.name})
        },
        icon: ""
    }
};