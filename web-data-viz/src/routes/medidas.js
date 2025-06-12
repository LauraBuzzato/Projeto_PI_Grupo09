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

router.get("/buscarDadosRosquinha/:idPedido", function (req, res){
    medidaController.buscarDadosRosquinha(req, res);  
});

router.get("/vMensalRosquinha/:idTransportadora", function (req, res){
    medidaController.vMensalRosquinha(req, res);  
});

router.get("/buscarDadosBarra/:idPedido", function (req, res){
    medidaController.buscarDadosBarra(req, res);  
});

router.get("/vMensalBarra/:idTransportadora", function (req, res){
    medidaController.vMensalBarra(req, res);  
});

module.exports = router;