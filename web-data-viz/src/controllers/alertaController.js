var alertaModel = require("../models/alertaModel");

function buscarDadosAlerta(req, res) {
    const idpedido = req.params.idpedido

    alertaModel.buscarDadosAlerta(idpedido)
        .then(resultado => {
            if (resultado.length === 0) {
                res.status(404).send("Dados do Alerta não encontrados!");
            } else {
                res.json(resultado[0]); 
            }
        })
         .catch(erro => {
            console.error("Erro ao buscar dados alerta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarDadosAlerta
}