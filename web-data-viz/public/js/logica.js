function cadastrar() {
    nomeTransportadora = nome.value;
    cnpjTransportadora = cnpj.value;
    telefoneTransportadora = telefone.value;
    emailTransportadora = email.value;
    senhaTransportadora = senha.value;
    senhaConfirmada = confirmar_senha.value;



    /*email já utilizado */
    emailUtilizados = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com", "email4@gmail.com"];
    

    var emUso = false;
    for(var i = 0; i<= emailUtilizados.length; i++){
        if (emailTransportadora == emailUtilizados[i]) {
            emUso = true;
        }
    }
    if(nomeTransportadora == null || cnpjTransportadora == null ||telefoneTransportadora == null == emailTransportadora || senhaTransportadora == null||senhaConfirmada == null){
        alert("preencha todos os campos!")
        return false;
    } else if (emUso) {
        alert("Esse email já está sendo utilizado!")
        return false;

    
    } else if (senhaConfirmada != senhaTransportadora) {
        alert("Algum campo está incorreto!")
        return false;

    } else{
        alert("Transportadora cadastrada com sucesso!")
        window.location.href = "cadastroEndereco.html";
    }
}

function cadastrarEndereco(){
    logradouroTransportadora = logradouro.value;
    cepTransportadora = cep.value;
    estadoTransportadora = estado.value;
    cidadeTransportadora = cidade.value;
    bairroTransportadora = bairro.value;
    numeroTransportadora = numero.value;
    complementoTransportadora = complemento.value;


    if(logradouroTransportadora == null || cepTransportadora == null || estadoTransportadora == null || cidadeTransportadora == null || bairroTransportadora == null || numeroTransportadora == null || complementoTransportadora == null ){
        alert("preencha todos os campos!")
        return false;
    } else {
        alert("Endereço da transportadora cadastrado com sucesso!")
        window.location.href = "../paginas-iniciais/login.html";
    }

}