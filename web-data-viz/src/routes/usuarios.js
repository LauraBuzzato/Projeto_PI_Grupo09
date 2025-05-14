var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar2", function (req, res) {
    usuarioController.cadastrar2(req, res);
});

router.get("/buscar-id-transportadora/:nome", function (req, res) {
    usuarioController.buscarIdTransportadora(req, res);
});


router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})



module.exports = router;