var express = require("express");
var router = express.Router();

var veiculoController = require("../controllers/veiculoController");

router.post("/cadastrar", function (req, res) {
    veiculoController.cadastrar(req, res);
})

router.get("/atualizar", function (req, res) {
    veiculoController.atualizar(req, res);
})


module.exports = router;