var pedidoModel = require("../models/pedidoModel");


function buscarCliente(req, res) {
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarCliente(idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar clientes:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarClienteFinalizado(req, res) {
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarClienteFinalizado(idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar clientes:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarVeiculo(req, res) {
    const idCliente = req.params.idCliente
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarVeiculo(idCliente, idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar veiculos:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarDadosPedido(req, res) {
    const idVeiculo = req.params.idVeiculo
    const idCliente = req.params.idCliente

    pedidoModel.buscarDadosPedido(idCliente, idVeiculo)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados do pedido:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarPedidoConcluido(req, res) {
    const idCliente = req.params.idCliente
    const idTransportadora = req.params.idTransportadora

    pedidoModel.buscarPedidoConcluido(idCliente, idTransportadora)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar veiculos:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarDadosPedidoConcluido(req, res) {
    const idPedido = req.params.idPedido

    pedidoModel.buscarDadosPedidoConcluido(idPedido)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar dados do pedido:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function verificarVeiculoStatus(req, res) {
    const veiculoPedido = req.params.veiculoDoPedido

    pedidoModel.verificarVeiculoStatus(veiculoPedido)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao buscar status do veiculo", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function cadastrarPedido(req, res) {
    var qtd1 = req.body.qtd1Server;
    var qtd2 = req.body.qtd2Server;
    var medicamento2 = req.body.medicamento2Server;
    var medicamento1 = req.body.medicamento1Server;
    var selectCliente = req.body.selectClienteServer;
    var dataDoPedido = req.body.dataDoPedidoServer;
    var dataEntregaPrevista = req.body.dataEntregaPrevistaServer;
    var veiculoDoPedido = req.body.veiculoDoPedidoServer;

    // Faça as validações dos valores
    if (qtd1 == undefined) {
        res.status(400).send("Qtd1 está undefined!");
    } else if (qtd2 == undefined) {
        res.status(400).send("Qtd2 está undefined!");
    } else if (medicamento2 == undefined) {
        res.status(400).send("medicamento2 undefined!");
    } else if (medicamento1 == undefined) {
        res.status(400).send("medicamento1 undefined!");
    } else if (selectCliente == undefined) {
        res.status(400).send("selectCliente undefined!");
    } else if (dataEntregaPrevista == undefined) {
        res.status(400).send("dataEntregaPrevista undefined!");
    } else if (veiculoDoPedido == undefined) {
        res.status(400).send("veiculoDoPedido undefined!");
    } else {

        pedidoModel.cadastrarPedido(qtd1, qtd2, medicamento2, medicamento1, selectCliente, dataDoPedido,
           dataEntregaPrevista, veiculoDoPedido)
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

function concluirPedido(req,res){
    var idPedido = req.params.idPedidoVar
 

    pedidoModel.concluirPedido(idPedido)
    .then((resultado) => {
        res.json(resultado)
    })

}


module.exports = {
    buscarCliente,
    buscarVeiculo,
    buscarDadosPedido,
    buscarClienteFinalizado,
    buscarPedidoConcluido,
    buscarDadosPedidoConcluido,
    cadastrarPedido,
    verificarVeiculoStatus,
    concluirPedido
}