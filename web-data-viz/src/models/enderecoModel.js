var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(logradouro, cep, estado, cidade, bairro, numero, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", logradouro, cep, estado, cidade, bairro, numero, complemento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO endereco (logradouro, cep, estado, cidade, bairro, numero, complemento) VALUES ('${logradouro}', '${cep}', '${estado}', '${cidade}', '${bairro}', '${numero}', '${complemento}');
    `; //alterar nome da tabela e falta uma ' no bairro
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarIdEndereco(logradouro, cep, estado, cidade, bairro, numero, complemento){
var instrucao = `
        select idendereco from endereco where logradouro like '${logradouro}' and cep like '${cep}' and estado like '${estado}' and cidade like '${cidade}' and bairro like '${bairro}' and numero like '${numero}' and complemento like '${complemento}';
    `;
    return database.executar(instrucao);
}

function atualizar(idTransportadora, idEndereco){
    var instrucaoSql = `
            update transportadora set idendereco = '${idEndereco}'
            where idtransportadora = '${idTransportadora}';
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql)
}

module.exports = {
    cadastrar,
    pegarIdEndereco,
    atualizar
};