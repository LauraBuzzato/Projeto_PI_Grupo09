var clienteModel = require("../models/clienteNaoCadastradoModel");

function cadastrar2(req, res) {
    var cep = req.body.cepCliente;
    var logradouro = req.body.logradouroCliente;
    var numero = req.body.numeroCliente;
    var complemento = req.body.complementoCliente;
    var bairro = req.body.bairroCliente;
    var cidade = req.body.cidadeCliente;
    var estado = req.body.estadoCliente;

    if (!cep) {
        res.status(400).send("O cep está indefinido!");
    } else if (!logradouro) {
        res.status(400).send("O logradouro está indefinido!");
    } else if (!numero) {
        res.status(400).send("O numero está indefinido!");
    } else if (!complemento) {
        res.status(400).send("O complemento está indefinido!");
    } else if (!bairro) {
        res.status(400).send("O bairro está indefinido!");
    }else if (!cidade) {
        res.status(400).send("A cidade está indefinido!");
    }else if (!estado) {
        res.status(400).send("O estado está indefinido!");
    } else {
        clienteModel.cadastrar2(cep, logradouro, numero, complemento, bairro, cidade, estado)
            .then(resultado => {
                res.json({ idEndereco: resultado.insertId }); 
            })
            .catch(erro => {
                console.error("Erro ao cadastrar transportadora:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarIdEndereco(req, res) {
    const cep = req.params.cep
    const logradouro = req.params.logradouro
    const numero = req.params.numero;

    clienteModel.buscarIdEndereco(cep, logradouro, numero)
        .then(resultado => {
            if (resultado.length === 0) {
                res.status(404).send("Transportadora não encontrada!");
            } else {
                res.json(resultado[0]); // Retorna o objeto com idendereco
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar transportadora:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeCliente;
    var CNPJ = req.body.documendoCliente;
    var telefone = req.body.TelefoneCliente;
    var idEndereco = req.params.idEndereco
    

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (CNPJ == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (idEndereco == undefined) {
        res.status(400).send("Erro idEndereco undefined!");
    } else {
        clienteModel.cadastrar(nome, CNPJ, telefone, idEndereco)
            .then(resultadoCadastro => {
                res.json({ idEndereco: resultadoCadastro.insertId });
            })
            .catch(erro => {
                console.error("Erro ao cadastrar usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        
          
    }
}

module.exports = {
    cadastrar2,
    buscarIdEndereco,
    cadastrar
}