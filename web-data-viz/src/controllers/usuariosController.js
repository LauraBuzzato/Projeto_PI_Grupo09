var usuarioModel = require("../models/usuarioModel");

function cadastrar2(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cnpj=req.body.cnpjServer;
    var telefone = req.body.telefoneserver;
   
     
       
    
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if(cnpj == undefined) {res.status(400).send("Seu telefone está undefined!");}
    else{

    
        

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar2(nome,telefone,cnpj,)
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


function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeTransportadora = req.body.nomeTransportadora;

    if (!nome || !email || !senha || !nomeTransportadora) {
        res.status(400).send("Campos obrigatórios não foram preenchidos!");
    } else {
        // 1. Buscar o idTransportadora baseado no nome
        usuarioModel.buscarTransportadoraPorNome(nomeTransportadora)
            .then(resultado => {
                if (resultado.length === 0) {
                    res.status(404).send("Transportadora não encontrada!");
                } else {
                    const idTransportadora = resultado[0].idtransportadora;

                    // 2. Cadastrar o usuário com o ID da transportadora
                    usuarioModel.cadastrar(nome, email, senha, idTransportadora)
                        .then(resultadoCadastro => {
                            res.json({ idUsuario: resultadoCadastro.insertId });
                        })
                        .catch(erro => {
                            console.error("Erro ao cadastrar usuário:", erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar transportadora:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    cadastrar2,
    
}