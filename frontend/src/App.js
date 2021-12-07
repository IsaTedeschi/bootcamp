//use faz parte de uma API, que se usa para criar estados, e nao mais classes
//useEffect = disparar funções sempre que tiver informações alteradas ou quando só quiser disparar uma função
import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

/*
termos mais importantes do Rect
    Componente
    Propriedade
    Estado e imutabilidade (esse último é para garantir performace mesmo que a aplicação contenha muitos dados)

*/

//prmeiro componente que retorna html
function App() {
    //useState retorna um array com duas posições
    //1° = a variavel com seu valor inicial
    //2° = função para atualizarmos esse valor
    const [projects, setProjects] = useState([]);

    //primeiro parametro = qual função quer disparar
    //segundo parametro = quando quer disparar, se quiser que ela seja disparada toda vez que projects tiver alguma coisa alterada seria {projects}, se quiser que fosse disparada apenas uma vez, deixa ele vazio, é um array de dependencias, que funciona só com oq ta dentro do {}
    useEffect(() => {
        //quando o get tiver uma resposta then...
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    //começa com handle aquilo que tem ação do usuário
    async function handleAddProject(){
        //push não cria um novo array com a nova informação, ele altera ela, uma coisa que tem que ser evitada
        //projects.push('Novo Projeto ${Date.now()}');

        //setProjects([ ...projects, 'Novo Projeto ${Date.now()}']);

        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Isabelli"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

/*map = ao inves de só percorrer os projetos, ele percorre mas retornando alguma coisa, o que tá dentro do parenteses que é mais html */
//se quisesse colocar uma imagem: <img width={300} src={backgroundImage}/>
    return (
        <>
            <Header title="Projects"/>
            
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;