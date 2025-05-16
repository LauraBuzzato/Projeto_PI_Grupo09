var enderecoModel = require("../models/enderecoModel");


function cadastrar(req, res) {
    var logradouro = req.body.logradouroT;
    var cep = req.body.cepT;
    var estado = req.body.estadoT;
    var cidade = req.body.cidadeT;
    var bairro = req.body.bairroT;
    var numero = req.body.numeroT;
    var complemento = req.body.complementoT;

    if (logradouro == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {
        enderecoModel.cadastrar(logradouro, cep, estado, cidade, bairro, numero, complemento)
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.error("Erro ao cadastrar endereço:", erro);
                res.status(500).send(erro);
            });
    }
}
// arrumar para enviar resposta ok

function pegarIdEndereco(req, res){
    const logradouro = req.params.logradouro
    const cep = req.params.cep
    const estado = req.params.estado
    const cidade = req.params.cidade
    const bairro = req.params.bairro
    const numero = req.params.numero
    const complemento = req.params.complemento

    enderecoModel.pegarIdEndereco(logradouro, cep, estado, cidade, bairro, numero, complemento)
            .then(resultado => {
                if (resultado.length === 0) {
                    res.status(404).send("Endereco não encontrada!");
                } else {
                    res.json(resultado[0]);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar endereco:", erro);
                res.status(500).json(erro.sqlMessage);
            });
}

function atualizar(req, res){
    var idTransportadora = req.body.idT
    var idEndereco = req.body.idE

    if (!idTransportadora || !idEndereco) {
            res.status(400).send("Campos obrigatórios não foram preenchidos!");
        } else {
            enderecoModel.atualizar(idTransportadora, idEndereco)
                .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.error("Erro ao cadastrar endereço:", erro);
                res.status(500).send(erro);
            });
        }
}

module.exports = {
    cadastrar,
    pegarIdEndereco,
    atualizar
}