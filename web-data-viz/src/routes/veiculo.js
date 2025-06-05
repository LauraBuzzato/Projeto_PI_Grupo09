var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

router.post("/cadastrar", function (req, res) {
    veiculoController.cadastrarVeiculo(req, res);
})

router.post("/atualizar", function (req, res) {
    veiculoController.puxandoVeiculos(req, res);
})

router.put("/removerveiculo/:idveiculo", function (req, res) {
    veiculoController.removerVeiculo(req,res)
})

module.exports = router;