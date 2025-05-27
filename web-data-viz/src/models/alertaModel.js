var database = require("../database/config")


function  buscarDadosAlerta(idpedido){
var instrucao = `
        select idalerta, duracao, limite, date_format(inicio, '%H:%i:%s') as inicio
        from alerta
        where idAlerta = (select max(idAlerta) from alerta where idpedido = '${idpedido}')
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosAlerta
}