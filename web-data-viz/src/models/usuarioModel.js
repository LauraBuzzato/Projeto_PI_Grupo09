var database = require("../database/config")


function cadastrar2(nome, telefone, cnpj) {
    var instrucaoSql = `
        INSERT INTO transportadora (nome, cnpj, telefone, ativo) 
        VALUES ('${nome}', '${cnpj}', '${telefone}', true);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTransportadoraPorNome(nome) {
    var instrucao = `
        select idtransportadora from transportadora where nome like '${nome}';
    `;
    return database.executar(instrucao);
}




function cadastrar(email, senha, idTransportadora) {
    var instrucaoSql = `
        INSERT INTO usuario (email, senha, administrador, ativo, idTransportadora) 
        VALUES ('${email}', '${senha}', true, true, ${idTransportadora});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, idTransportadora, ativo, administrador FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarIdParaCadastro(idUsuario) {
    var instrucaoSql = `
SELECT idtransportadora from usuario where idusuario like '${idUsuario}';
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirNovoUsuario(nome, email, senha, idTransportadora) {
    var instrucaoSql = `
INSERT INTO usuario (nome, email, senha, administrador, ativo, idTransportadora)
VALUES ('${nome}', '${email}', '${senha}', false, true, ${idTransportadora});
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function procurarNovoUsuario(idTransportadora) {
    var instrucaoSql = `
SELECT idUsuario as userid, nome, email, senha, ativo FROM usuario WHERE idTransportadora = '${idTransportadora}' and administrador like false;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerUsuario(iduser) {
    var instrucaoSql = `
delete from usuario where idUsuario = ${iduser};
`

    return database.executar(instrucaoSql)
}

function editarEmail(iduser, email) {
    var instrucaoSql = `
 update usuario
 set email = '${email}'
 where idUsuario = ${iduser}
  and administrador = false;
`
    return database.executar(instrucaoSql)
}

function editarSenha(iduser, senha) {
    var instrucaoSql = `
 update usuario
 set senha = '${senha}'
 where idUsuario = ${iduser}
 and administrador = false;
`
    return database.executar(instrucaoSql)
}

module.exports = {
    cadastrar,
    cadastrar2,
    buscarTransportadoraPorNome,
    autenticar,
    buscarIdParaCadastro,
    inserirNovoUsuario,
    procurarNovoUsuario,
    removerUsuario,
    editarEmail,
    editarSenha
};