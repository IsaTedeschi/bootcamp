//typescript ajuda muito nessa parte de inteligencia de ide
//pode fazer tanto tipagem comum (primitiva): string, number, boolean, object, Array
//interfaces: formas de definir tipagem de conjunto de dados, principalmente objetos de javascript


import { Request, Response } from 'express';
import createUser from './services/CreateUser';

//o request: Request é a tipagem
export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'isabelli1prtd@gmail.com',
        password: '1234567',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
            {title: 'Javascript', experience: 100},
        ],
    });

    return response.json({ message: 'Hello World'});
}

