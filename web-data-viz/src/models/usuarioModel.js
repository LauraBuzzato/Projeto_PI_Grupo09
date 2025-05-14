var database = require("../database/config")


function cadastrar2(nome, telefone, cnpj) {
    var instrucaoSql = `
        INSERT INTO transportadora (nome, cnpj, telefone, ativo) 
        VALUES ('${nome}', '${cnpj}', '${telefone}', true);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTransportadoraPorNome(nome){
var instrucao = `
        select idtransportadora from transportadora where nome like '${nome}';
    `;
    return database.executar(instrucao);
}




function cadastrar(email, senha, idTransportadora) {
    var instrucaoSql = `
        INSERT INTO usuario (email, senha, administrador, ativo, idTransportadora) 
        VALUES ('${email}', '${senha}', true, true, ${idTransportadora});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    cadastrar,
    cadastrar2,
    buscarTransportadoraPorNome
};