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
    if (emUso) {
        alert("Email já em uso")
    }

    /* Verificação de senha*/
    if (senhaConfirmada != senhaTransportadora) {
        alert("Algum campo está incorreto!")
    }
}