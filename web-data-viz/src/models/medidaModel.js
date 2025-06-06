var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    var instrucaoSql = `select valor as temperatura, DATE_FORMAT(data_hora,'%H:%i:%s') as  momento_grafico from leiturasensor ls
where idsensor = ${idSensor}
ORDER BY idleitura_sensor DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    var instrucaoSql = `select valor as temperatura, DATE_FORMAT(data_hora,'%H:%i:%s') as  momento_grafico from leiturasensor ls
where idsensor = ${idSensor}
ORDER BY idleitura_sensor DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalDeAlertas(idPedido){
    var instrucao = ` 
        select idalerta, duracao, limite, date_format(inicio, '%H:%i:%s') as inicio
        from alerta
        where idpedido = ${idPedido} and duracao is not null;
        `
        return database.executar(instrucao)
}

function buscarDadosRosquinha(idPedido) {
    var instrucaoSql = `
        SELECT
            SUM(CASE WHEN valor > 8 THEN 1 ELSE 0 END) AS acima,
            SUM(CASE WHEN valor < 2 THEN 1 ELSE 0 END) AS abaixo,
            SUM(CASE WHEN valor < 8 and valor > 2 THEN 1 ELSE 0 END) AS dentro
        FROM leiturasensor
        WHERE idpedido = '${idPedido}';
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    totalDeAlertas,
    buscarDadosRosquinha
}