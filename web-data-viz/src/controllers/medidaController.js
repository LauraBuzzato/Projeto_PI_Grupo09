var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idSensor = req.params.idSensorVar;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensorVar;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function totalDeAlertas(req, res) {
    var idpedido = req.params.idpedido

    medidaModel.totalDeAlertas(idpedido)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDadosRosquinha(req, res){
    const idPedido = req.params.idPedido

    medidaModel.buscarDadosRosquinha(idPedido)
    .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao contar status:", erro);
            res.status(500).send("Erro ao contar status.");
        });
}

function buscarDadosBarra(req, res){
    const idPedido = req.params.idPedido

    medidaModel.buscarDadosBarra(idPedido)
    .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao contar status:", erro);
            res.status(500).send("Erro ao contar status.");
        });
}

function vMensalBarra(req, res){
    const idTransportadora = req.params.idTransportadora

    medidaModel.vMensalBarra(idTransportadora)
    .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao contar status:", erro);
            res.status(500).send("Erro ao contar status.");
        });
}

function vMensalRosquinha(req, res){
    const idTransportadora = req.params.idTransportadora

    medidaModel.vMensalRosquinha(idTransportadora)
    .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao contar status:", erro);
            res.status(500).send("Erro ao contar status.");
        });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    totalDeAlertas,
    buscarDadosRosquinha,
    buscarDadosBarra,
    vMensalRosquinha,
    vMensalBarra

}