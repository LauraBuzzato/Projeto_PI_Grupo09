




function cadastrar2() {
  var nome = nome.value;
  var cnpjVar = cnpj.value;
  var telefoneVar = _telefone.value;
  


  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    cnpjVar == "" ||
    telefoneVar == ""
    
   
  ) {

    alert("Preencha todos os campos");


    return false;
  } else {

  }


  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      cnpjServer: cnpjVar,
      telefoneserver: telefoneVar,

    })
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




function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
 
  var emailVar = email.value;
  var senhaVar = senha.value;
  var confirmar_senhaVar = confirmar_senha.value


  // Verificando se há algum campo em branco
  if (
    emailVar == "" ||
    senhaVar == "" ||
    confirmar_senhaVar == ""
  ) {

    alert("Preencha todos os campos");


    return false;
  } else {

  }


  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      emailServer: emailVar,
      senhaServer: senhaVar,
      confirmar_senhaserver: confirmar_senhaVar,

    })
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





function cadastrarEndereco() {
  var logradouroTransportadora = logradouro.value;
  var cepTransportadora = cep.value;
  var estadoTransportadora = estado.value;
  var cidadeTransportadora = cidade.value;
  var bairroTransportadora = bairro.value;
  var numeroTransportadora = numero.value;
  var complementoTransportadora = complemento.value;


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

