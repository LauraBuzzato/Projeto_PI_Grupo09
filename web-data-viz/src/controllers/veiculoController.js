function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var tipo = req.body.tipoVecServer;
    var placa = req.body.placaVecServer;
    var ano = req.body.anoVecServer;
    var modelo = req.body.modeloVecServer;
    var fkTransportadora = req.body.fkTransportadoraVeiculoServer;

    // Faça as validações dos valores
    if (tipo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (placa == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fkTransportadora == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        usuarioModel.cadastrar(tipo, placa, ano, modelo, fkTransportadora)
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

function atualizar(req,res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkTransportadora = 2
        usuarioModel.listar(fkTransportadora)
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

module.exports = {
    cadastrar,
    atualizar
}