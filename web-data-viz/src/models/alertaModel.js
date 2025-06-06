var database = require("../database/config")


function  buscarDadosAlerta(idpedido){
var instrucao = `
        select idalerta, duracao, limite, date_format(inicio, '%H:%i:%s') as inicio
        from alerta
        where idalerta = (select max(idalerta) from alerta where idpedido = '${idpedido}')
    `;
    return database.executar(instrucao);
}


function  buscarKPI2(idPedido){
var instrucao = `
        select idalerta, duracao, limite, date_format(inicio, '%H:%i:%s') as inicio
        from alerta
        where idalerta = (select max(idalerta) from alerta where idpedido = '${idpedido}')
    `;
    return database.executar(instrucao);
}

function buscarAlertasAtivos(idTransportadora) {
    var instrucao = `
        SELECT a.idalerta, a.duracao, a.limite, 
        DATE_FORMAT(a.inicio, '%H:%i:%s') as inicio, p.idpedido, v.placa, c.nome as cliente,
            CASE 
                WHEN a.limite <= 2 THEN 'abaixo do mínimo'
                WHEN a.limite >= 8 THEN 'acima do máximo'
            END as tipo_alerta,
            CASE 
                WHEN ls.valor BETWEEN 1.5 AND 2.5 AND a.limite = 2 THEN 'atencao'
                WHEN ls.valor BETWEEN 7.5 AND 8.5 AND a.limite = 8 THEN 'atencao'
                WHEN ls.valor BETWEEN 2 AND 8 THEN 'normal'
                ELSE 'perigo'
            END as gravidade
        FROM alerta a
        JOIN pedido p ON a.idpedido = p.idpedido
        JOIN veiculo v ON p.idveiculo = v.idveiculo
        JOIN cliente c ON p.idcliente = c.idcliente
        JOIN leiturasensor ls ON p.idpedido = ls.idpedido
        WHERE v.idtransportadora = ${idTransportadora}
        AND ls.data_hora = (SELECT MAX(data_hora) FROM leiturasensor WHERE idpedido = p.idpedido)
        AND p.concluido = false
        AND a.duracao is null
        AND ls.valor NOT BETWEEN 2 AND 8
        ORDER BY a.inicio DESC;
    `;
    return database.executar(instrucao);
}

function valorDaTemperatura(idpedido) {
    var instrucao = `
        SELECT ls.valor AS leitura, s.idsensor AS sensor, p.idpedido AS pedido
        FROM leiturasensor ls
        JOIN sensor s ON ls.idsensor = s.idsensor
        JOIN pedido p ON ls.idpedido = p.idpedido
        WHERE p.idpedido = ${idpedido};`;

    return database.executar(instrucao);
}

module.exports = {
    buscarDadosAlerta,
    buscarAlertasAtivos,
    valorDaTemperatura,
    buscarKPI2
};