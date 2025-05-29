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

function buscarClienteFinalizado(req, res) {
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarClienteFinalizado(idTransportadora)
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
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarVeiculo(idCliente, idTransportadora)
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

function buscarPedidoConcluido(req, res){
    const idCliente = req.params.idCliente
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarPedidoConcluido(idCliente, idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar veiculos:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarDadosPedidoConcluido(req, res){
    const idPedido = req.params.idPedido

    pedidoModel.buscarDadosPedidoConcluido(idPedido)
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
    buscarDadosPedido,
    buscarClienteFinalizado,
    buscarPedidoConcluido,
    buscarDadosPedidoConcluido
}