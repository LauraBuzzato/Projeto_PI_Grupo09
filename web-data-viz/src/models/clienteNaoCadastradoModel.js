var database = require("../database/config")

function cadastrar2(cep, logradouro, numero, complemento, bairro, cidade, estado) {
    var instrucaoSql = `
        INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, estado) 
        VALUES ('${cep}', '${logradouro}', '${numero}', '${complemento}', '${bairro}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarIdEndereco(cep, logradouro, numero){
var instrucaoSql = `
        select idendereco from endereco where cep = '${cep}' and logradouro = '${logradouro}' and numero = '${numero}';
    `;
    return database.executar(instrucaoSql);
}


function cadastrar(nome, CNPJ, telefone, idEndereco, idTransportadora) {
    
    var instrucaoSql = `
        INSERT INTO cliente (idendereco ,nome, CNPJ, telefone, idtransportadora) VALUES ('${idEndereco}','${nome}', '${CNPJ}', '${telefone}', '${idTransportadora}');
        `;
   
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar2,
    buscarIdEndereco,
    cadastrar
};