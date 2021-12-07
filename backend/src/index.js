//express controla rotas
const { response } = require('express');
const express = require('express'); 
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4')

//com isso a aplicação está criada
const app = express();

//permite qualquer tipo de acesso ao backend
app.use(cors());
//use é quando vai usar algum tipo de função que todas as rotas vão ter que passar por elas
app.use(express.json());

/*
toda vez que usa get é uma rota, precisa sempre usar esse "response", pq é ele que dá a resposta pro front end
pode retornar um arquivo pra download, um texto, um json, um arquivo em tela...

send = retorna um texto
- return response.send('Hello World');

estrutura json (response.json) = retorna um array ou um objeto

response = contém as informações disponiveis para conseguir retornar respostas para o usuário
request = quem guarda as informações da requisição que o usuario quer fazer (qual rota ele tá acessando, os paramentros que ele ta enviando para essa rota, um cadastro com email, senha, nome...)
*/

/*
    Métodos HTTP: (o que tá dentro do app.)
GET: buscar informações do back end (toda vez que ta criando uma rota que tem o intuito de retornar algumas informações pro usuário) - não é toda rota que retorna alguma coisa, quando quer deletar, algo do back end nao obrigatoriamente retorna alguma coisa, entao não se usa GET

POST: criar uma informação no back end

PUT/PATCH: alterar uma informação no backend
(PUT é usado quando quer atualizar um recurso por completo - PATCH é quando quer atualizar alguma coisa específica)

DELETE: quando quer apagar alguma informação
*/

/*
    Tipos de parâmetro:
(parâmetros: formas do front end (do insomnia ou do cliente) que tá requisitando as rotas de aplicação conseguir algum tipo de informação)

Query Params: Filtros e paginação (quando vai fazer uma listagem) --> usados principalmente com parametros GET
Route Params: Identificar recursos (na hora de Atualizar ou Deletar) --> são os :id, pq precisa dizer qual é o recurso que quer deletar/atualizar
Request Body: Utilizado basicamente para o resto --> conteudo na hora de criar ou editar um recurso (na hora de pegar as informações que foram colocadas por um usuário) (as informações chegam na gente por .json)
*/

/*
    Middleware:

Insterceptador de requisições
    pode interromper totalmente as requisições
    alterar dados da requisição

Age enquanto as requisições estão chegando e ele pode mudar dados da requisição antes que os dados cheguem ao cliente 

Usa ele quando quer que um trecho de código seja disparado de forma automática em uma ou mais rotas da aplicação

Middleware pode servir para validação também, ver se o dado que o cliente tá mandando tá correto
*/

//variavel chamada projects que é um array vazio
//armazena na memoria da aplicação, entao enquanto ela estiver sendo executada as informações contidas nessa variavel estarao disponiveis para todo projeto, se a aplicação fechar/reiniciar ela volta a ser um array vazio 
const projects = [];

//por ter request,response quer dizer que é middleware, e assim todas as funções também são (como get, put...)
//isso pq elas interceptam a requisição, elas pegam dados delas e podem retornar um resultado a ela
//logRequest vai ser disparado de forma automática em todas as requisições e mostrar qual rota tá sendo utilizada
function logRequest(request, response, next){
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

//vai ser usada para validar se esse id que ta sendo mandado pro projeto tanto na rota de atualização quanto na rota de deleção é um id válido
//para saber se ele é válido, na biblioteca uuiv4, tem o isUuid, que retorna se tem um id válido ou não
function validateProjectId(request, response, next){
    const { id } = request.params; 

    //toda vez que não é um middleware return next mas sim um response, é um que interrompe totalmente a requisição, caso ele não valide esse id
    //esse return response retorna um resultado para o usuário, então tudo a partir daí, não é executado
    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid Project ID'});
    }

    return next();
}

/*se quiser que mostre o que está acontecendo de só um tipo de requisição, como o get, por exemplo, tira a linha de baixo (app...) e coloca "app.get('/projects', logRequest, (request, response)..."
Assim só aparece quando faz uma nova atualização no get */
app.use(logRequest);
app.use('/projects/:id', validateProjectId);

/*isso que vem depois da barra é o recurso que o usuario quer acessar
get mostra alguma informação, listar algo*/
app.get('/projects', (request, response) => {
    const { title } = request.query;
    //pode ser no lugar de {} só query

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;
    
    return response.json(results);
})

//para criar um projeto
//nagevador nao testa essa rota (só testa get)
app.post('/projects', (request, response) => {
    const {title,owner} = request.body;
    //pode ser no lugar de {} só body --> desestrulação 
    
    const project = { id: uuid(), title, owner }; 

    projects.push(project);
    
    return response.json(project);
})

/*quer atualizar um projeto (não todos) - identifica qual a partir de um ID
http://localhost:3333/projects/2 => tem ID 2
*/
app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    //pode ser no lugar de {} só params --> desestruturação 
    const {title,owner} = request.body;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0) {
        return response.status(400).json({error: 'Project Not Found'})
    }

    const project = {
        id,
        title,
        owner, 
    };

    projects[projectIndex] = project;
    
    return response.json(project)
})

//para deletar também é algum projeto especifico não tudo
app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0) {
        return response.status(400).json({error: 'Project Not Found'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send()
})

//Toda vez que o servidor inicializa aparece isso
app.listen(3333, () => {
    console.log('🚀 Back end started"');
});

