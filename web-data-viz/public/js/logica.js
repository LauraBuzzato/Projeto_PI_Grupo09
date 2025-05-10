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
            // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        logradouroT: logradouroTransportadora,
        cepT: cepTransportadora,
        estadoT: estadoTransportadora,
        cidadeT: cidadeTransportadora,
        bairroT: bairroTransportadorabairroTransportadora,
        numeroT: numeroTransportadora,
        complementoT: complementoTransportadora,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            console.log("listaEmpresasCadastradas")
            console.log(listaEmpresasCadastradas[0].codigo_ativacao)
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }
</script>

        alert("Endereço da transportadora cadastrado com sucesso!")
        window.location.href = "../paginas-iniciais/login.html";
    }

}