var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensorVar", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensorVar", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/totalDeAlertas/:idpedido", function (req, res) {
    medidaController.totalDeAlertas(req, res);
})

module.exports = router;