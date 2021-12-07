//os tres pontinhos brancos é porque precisa instalar um pacote de declaração de tipos, onde tá o autocomplete
import express from 'express'

const app = express();

//criando uma rota
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' })
});

app.listen(3333)