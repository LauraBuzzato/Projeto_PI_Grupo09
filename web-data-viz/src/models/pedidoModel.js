var database = require("../database/config")

function buscarCliente(idTransportadora) {
    var instrucao = `
        select c.idcliente, c.nome from cliente c
        inner join transportadora as t on t.idtransportadora = c.idtransportadora
        where c.idtransportadora = ${idTransportadora};
    `;
    return database.executar(instrucao);
}

function buscarClienteFinalizado(idTransportadora) {
    var instrucao = `
        select c.idcliente, nome from cliente c
        inner join pedido p on c.idcliente=p.idcliente
        inner join veiculo v on p.idveiculo=v.idveiculo
        where v.idtransportadora = ${idTransportadora} and p.concluido = true;
    `;
    return database.executar(instrucao);
}


function buscarVeiculo(idCliente, idTransportadora) {
    var instrucao = `
        select v.idveiculo, placa from veiculo v
        inner join pedido p on v.idveiculo = p.idveiculo
        where v.idtransportadora = ${idTransportadora} and idcliente = ${idCliente} and p.concluido = false;
    `;
    return database.executar(instrucao);
}

function buscarDadosPedido(idCliente, idVeiculo) {
    var instrucao = `
        select c.nome, c.cnpj, concat(e.logradouro,', ', e.numero) endereco, p.data_entrega_prevista, p.tipo_medicamento1, p.idpedido, v.tipo, s.idsensor from cliente c
		inner join endereco e on c.idendereco = e.idendereco
        inner join pedido p on c.idcliente=p.idcliente
        inner join veiculo v on p.idveiculo=v.idveiculo
        inner join sensor s on v.idveiculo=s.idveiculo
        where v.idveiculo = ${idVeiculo} and c.idcliente=${idCliente} and p.concluido = false;
    `;
    return database.executar(instrucao);
}

function buscarPedidoConcluido(idCliente, idTransportadora) {
    var instrucao = `
        select p.idpedido, placa from veiculo v
        inner join pedido p on v.idveiculo = p.idveiculo
        where v.idtransportadora = ${idTransportadora} and idcliente = ${idCliente} and p.concluido = true;
    `;
    return database.executar(instrucao);
}

function buscarDadosPedidoConcluido(idPedido) {
    var instrucao = `
        select c.nome, c.cnpj, concat(e.logradouro,', ', e.numero) endereco, p.data_entrega_prevista, p.data_entrega_real, p.tipo_medicamento1, 
        p.idpedido, v.tipo, s.idsensor, (select  
timestampdiff(second, (select data_hora from leiturasensor where idpedido = ${idPedido} limit 1), 
(select data_hora from leiturasensor where idpedido = ${idPedido} order by data_hora desc limit 1)) / 3600 duracao_em_horas
from leiturasensor
limit 1) as tempo_total, concat(et.logradouro,', ', et.numero) enderecoT from cliente c
		inner join endereco e on c.idendereco = e.idendereco
        inner join pedido p on c.idcliente=p.idcliente
        inner join veiculo v on p.idveiculo=v.idveiculo
        inner join sensor s on v.idveiculo=s.idveiculo
        inner join transportadora t on t.idtransportadora = v.idtransportadora
        inner join endereco et on et.idendereco = t.idendereco
        where p.idpedido = ${idPedido} and p.concluido = true;
    `;
    return database.executar(instrucao);
}
function cadastrarPedido(medicamento1, selectCliente,
    dataEntregaPrevista, veiculoDoPedido) {
    var instrucaoSql = `
            INSERT INTO pedido (tipo_medicamento1, idcliente,data_entrega_prevista, idveiculo) 
            VALUES ('${medicamento1}', '${selectCliente}',
            '${dataEntregaPrevista}','${veiculoDoPedido}');
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarVeiculoStatus(veiculoPedido) {
    var instrucao = `
            select concluido from pedido where idveiculo = ${veiculoPedido} and concluido = 0;
    `;
    return database.executar(instrucao);
}

function concluirPedido(idPedido) {
    var instrucao = `
        UPDATE pedido
            SET concluido = 1
             WHERE idpedido = ${idPedido};
    `
    return database.executar(instrucao)
}
module.exports = {
    buscarCliente,
    buscarVeiculo,
    buscarDadosPedido,
    buscarClienteFinalizado,
    buscarPedidoConcluido,
    buscarDadosPedidoConcluido,
    cadastrarPedido,
    verificarVeiculoStatus,
    concluirPedido
};