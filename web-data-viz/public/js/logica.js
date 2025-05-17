
function cadastrar() {

    var nome = document.getElementById("nome").value;
    var cnpj = document.getElementById("cnpj").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar_senha").value;

    if (!nome || !cnpj || !telefone || !email || !senha || !confirmarSenha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha != confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    //Cadastrar transportadora
    fetch("/usuarios/cadastrar2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: nome,
            cnpjServer: cnpj,
            telefoneserver: telefone,
        }),
    })
        .then((resposta1) => {
            if (!resposta1.ok) {
                throw new Error("Erro ao cadastrar transportadora");
            }

            //Buscar ID da transportadora
            return fetch(`/usuarios/buscar-id-transportadora/${nome}`);
        })
        .then((resposta2) => {
            if (!resposta2.ok) {
                throw new Error("Erro ao buscar ID da transportadora");
            }
            return resposta2.json();
        })
        .then((dados) => {
            const idTransportadora = dados.idtransportadora;

            //Cadastrar usuário com o ID da transportadora
            return fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailServer: email,
                    senhaServer: senha,
                    idTransportadora: idTransportadora
                }),
            });
        })
        .then((resposta3) => {
            if (!resposta3.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "cadastroEndereco.html";
        })
        .catch((erro) => {
            console.error("Erro:", erro);
            alert("Erro no cadastro. Verifique os campos e tente novamente.");
        });
}








function cadastrarEndereco() {

    var logradouroTransportadora = logradouro.value;
    var cepTransportadora = cep.value;
    var estadoTransportadora = estado.value;
    var cidadeTransportadora = cidade.value;
    var bairroTransportadora = bairro.value;
    var numeroTransportadora = numero.value;
    var complementoTransportadora = complemento.value;

  var logradouroTransportadora = logradouro.value;
  var cepTransportadora = cep.value;
  var estadoTransportadora = estado.value;
  var cidadeTransportadora = cidade.value;
  var bairroTransportadora = bairro.value;
  var numeroTransportadora = numero.value;
  var complementoTransportadora = complemento.value;


  // Recuperar ID salvo no localStorage AGORA
  var idTransportadora = localStorage.getItem("idTransportadora");
  
  


    if (logradouroTransportadora == null || cepTransportadora == null || estadoTransportadora == null || cidadeTransportadora == null || bairroTransportadora == null || numeroTransportadora == null || complementoTransportadora == null) {
        alert("preencha todos os campos!")
        return false;
    } else {
        // Enviando o valor da nova input
        fetch("/enderecos/cadastrar", {
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
                bairroT: bairroTransportadora,
                numeroT: numeroTransportadora,
                complementoT: complementoTransportadora
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.display = "block";

                    limparFormulario();
                    finalizarAguardar();
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })


        return false;
    }



    alert("Endereço da transportadora cadastrado com sucesso!")
    window.location.href = "../paginas-iniciais/login.html";
}



  if (!logradouroTransportadora || !cepTransportadora || !estadoTransportadora ||
      !cidadeTransportadora || !bairroTransportadora || !numeroTransportadora ) { // tirar o complemento da verificacao
    alert("Preencha todos os campos!");
    return false;
  }

  fetch("/enderecos/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      logradouroT: logradouroTransportadora,
      cepT: cepTransportadora,
      estadoT: estadoTransportadora,
      cidadeT: cidadeTransportadora,
      bairroT: bairroTransportadora,
      numeroT: numeroTransportadora,
      complementoT: complementoTransportadora,
       // Enviar o ID aqui AGORA
    }),
  })
  .then((resposta1) => {
    if (!resposta1.ok) {
      throw new Error("Erro ao cadastrar transportadora");
    }
    
    return fetch(`/enderecos/pegarIdEndereco/${logradouroTransportadora}/${cepTransportadora}/${estadoTransportadora}/${cidadeTransportadora}/${bairroTransportadora}/${numeroTransportadora}/${complementoTransportadora}`);
  })
  .then((resposta2) => {
    if (!resposta2.ok) {
      throw new Error("Erro ao buscar ID do endereco");
    }
    return resposta2.json();
  })
  .then((dados) => {
    const idEndereco = dados.idendereco;
    console.log(idEndereco)
    
    return fetch("/enderecos/atualizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idT: idTransportadora,
        idE: idEndereco
      }),
    });
  })
  .then((resposta3) => {
    if (!resposta3.ok) {
      throw new Error("Erro ao cadastrar endereco");
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; 
  })
  .catch((erro) => {
    console.error("Erro:", erro);
    alert("Erro no cadastro. Verifique os campos e tente novamente.");
  });

  


