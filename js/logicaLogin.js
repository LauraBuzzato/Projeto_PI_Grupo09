function login(){
    email = email.value
    senha = senha.value


    /*email já utilizado */
    emailCadastrados = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com", "email4@gmail.com"];

    // senha pra cada email
    senhaEmail = []

    
    

    var emUso = true;
    for(var i = 0; i<= emailUtilizados.length; i++){
        if (emailTransportadora == emailUtilizados[i]) {
            emUso = true;
        }
    }
    /* Verificação de senha*/
    if (!emUso || senha) {
        alert("Algum campo está incorreto!")
    }

}