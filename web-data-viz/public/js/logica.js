
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

    if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
}
const cnpjCerto = cnpj.replace(/\D/g, '');
if (cnpjCerto.length !== 14) {
  alert("CNPJ inválido! Deve conter 14 números.");
  return;
}
const telefoneCerto= telefone.replace(/\D/g, '');
if (telefoneCerto.length < 10 || telefoneLimpo.length > 11) {
    alert("Telefone inválido! Deve conter DDD e número (com ou sem 9).");
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
            localStorage.ID_TRANSPORTADORA = idTransportadora

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
  var idTransportadora = localStorage.ID_TRANSPORTADORA;
   var cepLimpo = cepTransportadora.replace(/\D/g, '');


  if (!logradouroTransportadora || !cepTransportadora || !estadoTransportadora ||
      !cidadeTransportadora || !bairroTransportadora || !numeroTransportadora ) { // tirar o complemento da verificacao
    alert("Preencha todos os campos!");
    return ;
  }


   if (cepLimpo.length !== 8) {
    alert("CEP inválido! Insira um CEP com 8 dígitos.");
    return;
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

  
}

