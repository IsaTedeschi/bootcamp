/*
Para criar: nome, email, password
*/

//toda vez que precisa criar o formato de um objeto cria uma interface
interface TechObject {
    title: string;
    experience: number;
}


//ela basicamente, como a gente define os tipos de um conjunto de informações, normalmente um objeto
//?: = não precisa ser informado
interface CreateUserData{
    name?: string;
    email: string;
    password: string;
    //duas formas de definir tipagem de um vetor, uma delas é com Array, outra - para array mistos - cria uma interface
    techs: Array<string | TechObject>;
    //usar com string[] é um conjunto de strings
}

export default function createUser({name, email, password }: CreateUserData){
    const user = {
        name,
        email,
        password,
    }

    return user;
}