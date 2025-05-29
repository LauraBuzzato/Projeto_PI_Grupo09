var express = require("express");
var router = express.Router();

var clienteNaoCadastradoController = require("../controllers/clienteNaoCadastradoController");

//Recebendo os dados do html Endereço e direcionando para a função cadastrar de clienteNaoCadastradoController.js
router.post("/cadastrar2", function (req, res){
    clienteNaoCadastradoController.cadastrar2(req, res)
})

router.get("/buscar-id-endereco/:cep/:logradouro/:numero", function (req, res){
    clienteNaoCadastradoController.buscarIdEndereco(req, res)
})

router.post("/cadastrar/:idEndereco", function (req, res) {
    clienteNaoCadastradoController.cadastrar(req, res);
});

module.exports = router;