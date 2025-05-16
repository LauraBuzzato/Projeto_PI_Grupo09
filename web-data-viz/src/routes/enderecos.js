var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de enderecoController.js
router.post("/cadastrar", function (req, res) {
    enderecoController.cadastrar(req, res);
});

router.get("/pegarIdEndereco/:logradouro/:cep/:estado/:cidade/:bairro/:numero/:complemento", function (req, res) {
    enderecoController.pegarIdEndereco(req, res);
});

router.post("/atualizar", function (req, res) {
    enderecoController.atualizar(req, res);
})

module.exports = router;