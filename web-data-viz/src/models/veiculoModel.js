var database = require("../database/config")

function cadastrar(tipo, placa, ano, modelo, fkTransportadora) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO veiculo (tipo, placa, ano, modelo, idtransportadora) VALUES ('${tipo}', '${placa}', 
        '${ano}','${modelo}', '${fkTransportadora}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(fkTransportadora) {
    var instrucaoSql = `
        SELECT tipo,placa,ano,modelo,idveiculo FROM veiculo where idtransportadora = ${fkTransportadora};
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
    cadastrar,
    listar,
    buscarVeiculos
};