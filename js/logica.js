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
    } else if (emUso) {
        alert("Email já em uso")
        return;

    
    } else if (senhaConfirmada != senhaTransportadora) {
        alert("Algum campo está incorreto!")
        return;

    } else{
        alert("Transportadora cadastrada com sucesso!")
    }
}