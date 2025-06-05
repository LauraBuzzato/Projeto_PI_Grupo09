var veiculoModel = require("../models/veiculoModel");

function cadastrarVeiculo(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var tipo = req.body.tipoVecServer;
    var placa = req.body.placaVecServer;
    var ano = req.body.anoVecServer;
    var modelo = req.body.modeloVecServer;
    var idTransportadora = req.body.idTransportadoraVeiculoServer;

    // Faça as validações dos valores
    if (tipo == undefined) {
        res.status(400).send("Tipo de veiculo undefined!");
    } else if (placa == undefined) {
        res.status(400).send("Sua placa está undefined!");
    } else if (idTransportadora == undefined) {
        res.status(400).send("idTranpostadora undefined!");
    } else {

        veiculoModel.cadastrandoVeiculo(tipo, placa, ano, modelo, idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// atualizando o gerenciamento
function puxandoVeiculos(req,res) {

    var idTransportadora = req.body.idTransportadoraServer;
        veiculoModel.listarVeiculos(idTransportadora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar veiculos! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}

function buscarVeiculos(req, res){
    const idTransportadora = req.params.idTransportadora

    veiculoModel.buscarVeiculos(idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar veiculos:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
    }

function veiculoController(req,res){
    var idveiculo = req.params.idveiculo
    console('veiculoid controller', idveiculo) 

}


module.exports = {
    cadastrarVeiculo,
    puxandoVeiculos,
    veiculoController,
    buscarVeiculos
  
}