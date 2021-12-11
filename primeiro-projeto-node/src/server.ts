// arquivos de código sempre dentro do src
// não deixar nenhum código despradonizado

import express from 'express';
import routes from './routes';

const app = express();

// routes se torna um mildware
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});

// eslint-disable-next-line max-len
// toda vez que tem que colocar no terminal "yarn tsc" para que possa converter o código para javascript
// eslint-disable-next-line max-len
// ts-node-dev: faz dois papeis ao mesmo tempo, ele converte o cod para javascript e faz o papel do nodemon - que faz a atualização de modo automática
