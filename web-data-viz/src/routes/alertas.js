var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de clienteNaoCadastradoController.js

router.get("/buscar-dados-alerta/:idpedido", function (req, res){
    alertaController.buscarDadosAlerta(req, res)
})



module.exports = router;