var database = require("../database/config")

function cadastrandoVeiculo(tipo, placa, ano, modelo, idTransportadora) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", tipo, placa, ano, modelo, idTransportadora);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO veiculo (idtransportadora, tipo, placa, modelo, ano, ativo) VALUES ('${idTransportadora}','${tipo}', '${placa}', 
        '${modelo}', '${ano}', true);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(idTransportadora) {
    var instrucaoSql = `
        SELECT tipo,placa,ano,modelo,idveiculo FROM veiculo where idtransportadora = ${idTransportadora};
    `;
    return database.executar(instrucaoSql);
}

function buscarVeiculos(idCliente, idTransportadora) {
    var instrucao = `
        select placa, tipo, v.idveiculo from veiculo v
        inner join pedido p on v.idveiculo = p.idveiculo
        where idtransportadora = ${idTransportadora} and idcliente = ${idCliente};
    `;
    return database.executar(instrucao);
}


module.exports = {
    cadastrandoVeiculo,
    listar,
    buscarVeiculos
};