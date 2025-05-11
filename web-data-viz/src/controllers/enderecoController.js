var enderecoModel = require("../models/enderecoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var logradouro = req.body.logradouroT;
    var cep = req.body.cepT;
    var estado = req.body.estadoT;
    var cidade = req.body.cidadeT;
    var bairro = req.body.bairroT;
    var numero = req.body.numeroT;
    var complemento = req.body.complementoT;

    // Faça as validações dos valores
    if (logradouro == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo enderecoModel.js
        enderecoModel.cadastrar(logradouro, cep, estado, cidade, bairro, numero, complemento)
          
    }
}

module.exports = {
    cadastrar
}