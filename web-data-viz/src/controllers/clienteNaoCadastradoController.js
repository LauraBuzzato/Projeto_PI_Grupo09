var enderecoModel = require("../models/clienteNaoCadastradoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeCliente;
    var CNPJ = req.body.documendoCliente;
    var telefone = req.body.TelefoneCliente;
    var cep = req.body.cepCliente;
    var logradouro = req.body.logradouroCliente;
    var numero = req.body.numeroCliente;
    var complemento = req.body.complementoCliente;
    var bairro = req.body.bairroCliente;
    var cidade = req.body.cidadeCliente;
    var estado = req.body.estadoCliente;

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
        enderecoModel.cadastrar(nome,CNPJ,telefone,logradouro, cep, estado, cidade, bairro, numero, complemento)
          
    }
}

module.exports = {
    cadastrar
}