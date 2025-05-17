var database = require("../database/config")

function buscarCliente(idTransportadora) {
    var instrucao = `
        select c.idcliente, nome from cliente c
        inner join pedido p on c.idcliente=p.idcliente
        inner join veiculo v on p.idveiculo=v.idveiculo
        where idtransportadora = ${idTransportadora} and p.concluido = false;
    `;
    return database.executar(instrucao);
}


function buscarVeiculo(idCliente) {
    var instrucao = `
        select v.idveiculo, placa from veiculo v
        inner join pedido p on v.idveiculo = p.idveiculo
        where idcliente = ${idCliente} and p.concluido = false;
    `;
    return database.executar(instrucao);
}

function buscarDadosPedido(idCliente, idVeiculo) {
    var instrucao = `
        select c.nome, c.cnpj, concat(e.logradouro,', ', e.numero) endereco, p.data_entrega_prevista, p.tipo_medicamento1, p.quantidade_medicamento1, 
        p.tipo_medicamento2, p.quantidade_medicamento2, p.idpedido, v.tipo, s.idsensor from cliente c
		inner join endereco e on c.idendereco = e.idendereco
        inner join pedido p on c.idcliente=p.idcliente
        inner join veiculo v on p.idveiculo=v.idveiculo
        inner join sensor s on v.idveiculo=s.idveiculo
        where v.idveiculo = ${idVeiculo} and c.idcliente=${idCliente} and p.concluido = false;
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarCliente,
    buscarVeiculo,
    buscarDadosPedido
};