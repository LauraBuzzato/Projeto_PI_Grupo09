function login(){
    emailUsuario = email.value
    senhaUsuario = senha.value
    

        var emailVar = email.value;
        var senhaVar = senha.value;

        if (emailVar == "" || senhaVar == "") {
            alert ('Mensagem de erro para todos os campos em branco');
            return false;
        }
        

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)

                    
                       window.location.href = "simulador_financeiro.html";
                 

                });
                

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

  

}
