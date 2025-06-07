var usuarioModel = require("../models/usuarioModel");

function cadastrar2(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telefoneserver;

    if (!nome) {
        res.status(400).send("O nome está indefinido!");
    } else if (!cnpj) {
        res.status(400).send("O CNPJ está indefinido!");
    } else if (!telefone) {
        res.status(400).send("O telefone está indefinido!");
    } else {
        usuarioModel.cadastrar2(nome, telefone, cnpj)
            .then(resultado => {
                res.json({ idTransportadora: resultado.insertId }); // retorna o ID da transportadora
            })
            .catch(erro => {
                console.error("Erro ao cadastrar transportadora:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarIdTransportadora(req, res) {
    const nome = req.params.nome;

    usuarioModel.buscarTransportadoraPorNome(nome)
        .then(resultado => {
            if (resultado.length === 0) {
                res.status(404).send("Transportadora não encontrada!");
            } else {
                res.json(resultado[0]); // Retorna o objeto com idtransportadora
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar transportadora:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}



function cadastrar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idTransportadora = req.body.idTransportadora;

    if (!email || !senha || !idTransportadora) {
        res.status(400).send("Campos obrigatórios não foram preenchidos!");
    } else {
        usuarioModel.cadastrar(email, senha, idTransportadora)
            .then(resultadoCadastro => {
                res.json({ idUsuario: resultadoCadastro.insertId });
            })
            .catch(erro => {
                console.error("Erro ao cadastrar usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            administrador: resultadoAutenticar[0].administrador,
                            idTransportadora: resultadoAutenticar[0].idTransportadora
                        })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarIdParaCadastro(req, res){
var idUsuario = req.body.idUsuarioServer;

usuarioModel.buscarIdParaCadastro(idUsuario)
.then(resultado => {
if (resultado.length === 0) {
res.status(404).send("Transportadora não encontrada!");
} else {
res.json(resultado[0]); // Retorna o objeto com idtransportadora
}
})
.catch(erro => {
console.error("Erro ao buscar transportadora:", erro);
res.status(500).json(erro.sqlMessage);
});
}

function inserirNovoUsuario(req, res) {
var email = req.body.emailFuncionarioServer
var senha = req.body.senhaFuncionarioServer
var idTransportadora = req.body.idTransportadoraServer
var nome = req.body.nomeFuncionarioServer

if (!email || !senha || !idTransportadora || !nome) {
res.status(400).send("Dados obrigatórios faltando")
return
}

usuarioModel.inserirNovoUsuario(nome, email, senha, idTransportadora)
.then(function (resultado) {
res.status(201).json({
mensagem: "Usuário cadastrado com sucesso!",
resultado: resultado
})
})
.catch(function (erro) {
console.error("Erro ao cadastrar usuário:", erro)
res.status(500).json(erro.sqlMessage)
})
}

function procurarNovoUsuario(req, res) {
var idTransportadora = req.params.idTransportadora;

usuarioModel.procurarNovoUsuario(idTransportadora)
.then(function (resultado) {
if (resultado.length === 0) {
res.status(404).send("Nenhum usuário encontrado");
} else {
res.json(resultado);
}
})
.catch(function (erro) {
console.error("Erro ao procurar usuário:", erro);
res.status(500).json(erro.sqlMessage);
});
}

function removerUsuario(req,res){
var iduser = req.params.idusuario
console.log('controller', iduser)
usuarioModel.removerUsuario(iduser)
.then(function(resultado){
res.json(resultado)
})
}

function editandoemail(req, res){
    var iduser = req.params.idusuario
    var email = req.params.emailp
    usuarioModel.editarEmail(iduser,email)
    .then(function(resultado){
        res.json(resultado)
    })
}

function editandosenha(req, res){
var iduser = req.params.idusuario
var senha = req.params.senhap
usuarioModel.editarSenha(iduser,senha)
.then(function(resultado){
    res.json(resultado)
})
}

module.exports = {
cadastrar,
cadastrar2,
buscarIdTransportadora,
autenticar,
buscarIdParaCadastro,
inserirNovoUsuario,
procurarNovoUsuario,
removerUsuario,
editandoemail,
editandosenha
}
