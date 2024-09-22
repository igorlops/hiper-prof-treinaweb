export interface AlunoInterface {
    id: number;
    nome: string;
    email: string;
    data_aula: string|Date;
}

export interface AlunoErrorResponseInterface extends AlunoInterface {

}