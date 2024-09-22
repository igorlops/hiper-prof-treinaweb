export interface LoginInterface {
    email:string;
    password: string;
}

export interface LoginErrorInterface extends LoginInterface {}

export interface ResponseLoginInterface {
    token: string;
    refresh_token:string
}