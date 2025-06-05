var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de clienteNaoCadastradoController.js

router.get("/buscarDadosAlerta/:idpedido", function (req, res){
    alertaController.buscarDadosAlerta(req, res)
})

router.get("/buscarAlertasAtivos/:idTransportadora", function (req, res) {
    alertaController.buscarAlertasAtivos(req, res);
});

module.exports = router;