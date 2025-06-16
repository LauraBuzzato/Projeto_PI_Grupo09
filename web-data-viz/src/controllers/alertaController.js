var alertaModel = require("../models/alertaModel");

function buscarDadosAlerta(req, res) {
    var idpedido = req.params.idpedido

    alertaModel.buscarDadosAlerta(idpedido)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarKPI2(req, res) {
    var idPedido = req.params.idPedido

    alertaModel.buscarKPI2(idPedido)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAlertasAtivos(req, res) {
    var idTransportadora = req.params.idTransportadora;

    alertaModel.buscarAlertasAtivos(idTransportadora)
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar alertas ativos:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function valorDaTemperatura(req, res) {
    var idpedido = req.params.idpedido

    alertaModel.valorDaTemperatura(idpedido)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function mensalKPI(req, res) {
    var idTransportadora = req.params.idTransportadora

    alertaModel.mensalKPI(idTransportadora)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarDadosAlerta,
    buscarAlertasAtivos,
    valorDaTemperatura,
    buscarKPI2,
    mensalKPI
};