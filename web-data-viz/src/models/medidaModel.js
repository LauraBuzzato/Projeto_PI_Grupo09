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


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}