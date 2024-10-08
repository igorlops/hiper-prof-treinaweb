export interface ProfessorInterface{
    id: number;
    nome: string;
    email:string;
    idade: number;
    descricao: string;
    valor_hora: number;
    foto_perfil?: string;
    created_at: string;
    updated_at: string;
}

export interface ProfessorCadastroInterface extends 
    Omit<ProfessorInterface, 'id'|'created_at'|'updated_at'|'valor_hora'> {
    password: string;
    password_confirmation: string;
    valor_hora: string|number;
}

export interface ProfessorErrorInterface extends Omit<ProfessorCadastroInterface, 'idade'|'valor_hora'> {
    idade:string;
    valor_hora:string;
}