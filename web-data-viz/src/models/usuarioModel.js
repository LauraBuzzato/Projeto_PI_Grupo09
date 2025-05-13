var database = require("../database/config")


function cadastrar2(nome,cnpj,telefone) {
   
    
    
    var instrucaoSql = `
        insert into transportadora (nome, cnpj, telefone, ativo) values ('${nome}', '${cnpj}', '${telefone}', true);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

     
}
function buscarTransportadoraPorNome(nome){
var instrucao = `
        select idtransportadora from transportadora where nome like '${nome}';
    `;
    return database.executar(instrucao);
}




function cadastrar(email, senha) {
   
    
    var instrucaoSql = `
        insert into usuario (email, senha, administrador, ativo, idTransportadora) values ('${email}', '${senha}', true, true, '${idTransportadora}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

     var instrucaoSql2 = `
        INSERT INTO transportadora (cnpj, telefone,) VALUES ( '${cnpj}', '${telefone}' );
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);
}



module.exports = {
    cadastrar,
    cadastrar2,
    buscarTransportadoraPorNome
};