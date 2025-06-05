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

function listarVeiculos(idTransportadora) {
    var retornoVeiculos = `
        select v.tipo as tipo, v.placa as placa, v.modelo as modelo, v.ano as ano, v.ativo as v_status from veiculo as v
where idtransportadora = ${idTransportadora}
and v.ativo = true;
    `;
    return database.executar(retornoVeiculos);
}

function buscarVeiculos(idTransportadora) {
    var instrucao = `
        select  placa, tipo, v.idveiculo
        from veiculo v
        inner join transportadora as t on v.idtransportadora = t.idtransportadora
        where v.idtransportadora = ${idTransportadora};
    `;
    return database.executar(instrucao);
}


module.exports = {
    cadastrandoVeiculo,
    listarVeiculos,
    buscarVeiculos
};