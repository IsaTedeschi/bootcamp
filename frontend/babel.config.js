/*
Aqui ficam as configurações relacionadas ao Babel, na maneira que o código javascript é convertido num que o browser entenda 
*/

module.exports = {
    presets: [
        //vai converter o cód de um javascript mais moderno pra um mais antigo, mas baseado no ambiente
        '@babel/preset-env', 
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
};