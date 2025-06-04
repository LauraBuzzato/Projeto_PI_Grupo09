var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

router.post("/cadastrar", function (req, res) {
    veiculoController.cadastrarVeiculo(req, res);
})

router.get("/atualizar", function (req, res) {
    veiculoController.puxandoVeiculos(req, res);
})

router.get("/buscarVeiculos/:idCliente/:idTransportadora", function (req, res) {
    veiculoController.buscarVeiculos(req, res);
})


module.exports = router;