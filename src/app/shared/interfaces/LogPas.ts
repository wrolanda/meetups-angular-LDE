export interface LogPas {
    email: string;
    password: string;
}

export class LogPas {
    constructor(
        email: string,
        password: string,
    ) {
        this.email = email;
        this.password = password;
    }
}