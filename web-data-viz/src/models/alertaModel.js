var database = require("../database/config")


function  buscarDadosAlerta(idpedido){
var instrucao = `
        select idalerta, duracao, limite, date_format(inicio, '%H:%i:%s') as inicio
        from alerta
        where idalerta = (select max(idalerta) from alerta where idpedido = '${idpedido}')
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosAlerta
}