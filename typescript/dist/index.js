//no dist usa a mesma estrutura que usa no src, entao se la tem uma pasta lá do tipo typescript, no dist cria a mesma

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//os tres pontinhos brancos é porque precisa instalar um pacote de declaração de tipos, onde tá o autocomplete
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//criando uma rota
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});
app.listen(3333);
