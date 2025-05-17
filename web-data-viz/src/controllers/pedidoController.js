var pedidoModel = require("../models/pedidoModel");


function buscarCliente(req, res) {
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarCliente(idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar clientes:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarVeiculo(req, res){
    const idCliente = req.params.idCliente

    pedidoModel.buscarVeiculo(idCliente)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar veiculos:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarDadosPedido(req, res){
    const idVeiculo = req.params.idVeiculo
    const idCliente = req.params.idCliente

    pedidoModel.buscarDadosPedido(idCliente, idVeiculo)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados do pedido:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

module.exports = {
    buscarCliente,
    buscarVeiculo,
    buscarDadosPedido
}