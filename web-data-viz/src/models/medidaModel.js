const { vMensalRosquinha } = require("../controllers/medidaController");
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

function buscarDadosBarra(idPedido) {
    var instrucaoSql = `
        SELECT idalerta, duracao
        FROM alerta
            WHERE idpedido = '${idPedido}'
            ORDER BY duracao DESC;
    `
    return database.executar(instrucaoSql);
}

function vMensalRosquinha(idTransportadora) {
    var instrucaoSql = `
         SELECT
            SUM(CASE WHEN valor > 8 THEN 1 ELSE 0 END) AS acima,
            SUM(CASE WHEN valor < 2 THEN 1 ELSE 0 END) AS abaixo,
            SUM(CASE WHEN valor < 8 and valor > 2 THEN 1 ELSE 0 END) AS dentro
        FROM leiturasensor AS ls
        INNER JOIN pedido AS p ON p.idpedido = ls.idpedido
        INNER JOIN veiculo AS v ON v.idveiculo = p.idveiculo
        WHERE idtransportadora = ${idTransportadora}
        AND month(data_hora) = (month(current_date()) - 1) ;
    `
    return database.executar(instrucaoSql);
}


function vMensalBarra(idTransportadora) {
    var instrucaoSql = `
            SELECT idalerta, duracao
        FROM alerta AS a
        INNER JOIN pedido AS p ON a.idpedido = p.idpedido
        INNER JOIN veiculo AS v ON v.idveiculo = p.idveiculo
            WHERE idtransportadora = '${idTransportadora}'
            AND month(inicio) = (month(current_date()) - 1)
            ORDER BY duracao DESC;
    `
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    totalDeAlertas,
    buscarDadosBarra,
    buscarDadosRosquinha,
    vMensalBarra,
    vMensalRosquinha
}