var database = require("../database/config")

function cadastrar2(cep, logradouro, numero, complemento, bairro, cidade, estado) {
    var instrucaoSql = `
        INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, estado) 
        VALUES ('${cep}', '${logradouro}', '${numero}', '${complemento}', '${bairro}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEnderecoPorNome(cep, logradouro, numero){
var instrucaoSql = `
        select idendereco from endereco where cep = '${cep}' and logradouro = '${logradouro}' and numero = '${numero}';
    `;
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, CNPJ, telefone, idEndereco) {
    
    
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