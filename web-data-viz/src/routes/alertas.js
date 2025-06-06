var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de clienteNaoCadastradoController.js

router.get("/buscar-dados-alerta/:idpedido", function (req, res){
    alertaController.buscarDadosAlerta(req, res)
})

router.get("/buscarAlertasAtivos/:idTransportadora", function (req, res) {
    alertaController.buscarAlertasAtivos(req, res);
});

router.get("/valorDaTemperatura/:idpedido", function (req, res){
    alertaController.valorDaTemperatura(req, res)
})

router.get("/totalDeAlertas/:idpedido", function (req, res){
    alertaController.totalDeAlertas(req, res)
})

module.exports = router;