var express = require("express");
var router = express.Router();

var clienteNaoCadastradoController = require("../controllers/clienteNaoCadastradoController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de clienteNaoCadastradoController.js
router.post("/cadastrar", function (req, res) {
    clienteNaoCadastradoController.cadastrar(req, res);
});

module.exports = router;