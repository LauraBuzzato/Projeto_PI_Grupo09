var express = require("express");
var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

router.get("/buscarCliente/:idTransportadora", function (req, res) {
    pedidoController.buscarCliente(req, res);
})

router.get("/buscarVeiculo/:idCliente", function (req, res) {
    pedidoController.buscarVeiculo(req, res);
})

router.get("/buscarDadosPedido/:idCliente/:idVeiculo", function (req, res) {
    pedidoController.buscarDadosPedido(req, res);
})


module.exports = router;