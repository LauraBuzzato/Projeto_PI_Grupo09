var express = require("express");
var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

router.get("/buscarCliente/:idTransportadora", function (req, res) {
    pedidoController.buscarCliente(req, res);
})

router.get("/buscarClienteAndamento/:idTransportadora", function (req, res) {
    pedidoController.buscarClienteAndamento(req, res);
})

router.get("/buscarVeiculo/:idCliente/:idTransportadora", function (req, res) {
    pedidoController.buscarVeiculo(req, res);
})

router.get("/buscarDadosPedido/:idCliente/:idVeiculo", function (req, res) {
    pedidoController.buscarDadosPedido(req, res);
})

router.get("/buscarPedidoConcluido/:idCliente/:idTransportadora", function (req, res) {
    pedidoController.buscarPedidoConcluido(req, res);
})

router.get("/buscarDadosPedidoConcluido/:idPedido", function (req, res) {
    pedidoController.buscarDadosPedidoConcluido(req, res);
})

router.get("/buscarClienteFinalizado/:idTransportadora", function (req, res) {
    pedidoController.buscarClienteFinalizado(req, res);
})

router.post("/cadastrarPedido", function (req, res) {
    pedidoController.cadastrarPedido(req, res);
})

router.get("/buscarCliente/:idTransportadora", function (req, res) {
    pedidoController.buscarCliente(req, res);
})

router.get("/verificarVeiculoStatus/:veiculoDoPedido", function (req, res) {
    pedidoController.verificarVeiculoStatus(req, res);
})

router.put("/concluirPedido/:idPedidoVar", function (req, res) {
    pedidoController.concluirPedido(req,res)
})
module.exports = router;