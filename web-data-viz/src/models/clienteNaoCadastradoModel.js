var database = require("../database/config")

function cadastrar2(cep, logradouro, numero, complemento, bairro, cidade, estado) {
    var instrucaoSql = `
        INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, estado) 
        VALUES ('${cep}', '${logradouro}', '${numero}', '${complemento}', ${bairro}, ${cidade}, ${estado});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEnderecoPorNome(cep, logradouro, numero){
var instrucao = `
        select idendereco from endereco where cep like '${cep}' and logradouro like '${logradouro}' and numero like ${numero};
    `;
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome,CNPJ,telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, CNPJ, telefone, logradouro, cep, estado, cidade, bairro, numero, complemento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO cliente (nome, CNPJ, telefone)VALUES ('${nome}', '${CNPJ}', '${telefone}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar2,
    buscarEnderecoPorNome,
    cadastrar
};