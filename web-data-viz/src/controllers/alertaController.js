var alertaModel = require("../models/alertaModel");

function buscarDadosAlerta(req, res) {
    const idpedido = req.params.idpedido

    alertaModel.buscarDadosAlerta(idpedido)
        .then(resultado => {
         
                res.json(resultado); 
            
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarDadosAlerta
}