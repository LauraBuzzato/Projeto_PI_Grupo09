function verificarPedidoJa() {
    var qtd1 = Number(qtd_med1.value)
    var qtd2 = Number(qtd_med2.value)
    var medicamento2 = med2.value


    if ((qtd2 > 0 && medicamento2 == '') || qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '')) {

        if (qtd2 > 0 && medicamento2 == '') {
            alert('Não possível inserir a quantidade do segundo medicamento sem inserir o seu tipo.')
            return;
        }
        if (qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '')) {
            alert('Insira uma quantidade de medicamentos válida.')
            return;
        }

    } else {
        alert('Cadastro realizado com sucesso!')
    }

}

function verificarVeiculo() {
    var tipoVec = tipo.value
    var placaVec = placa.value
    var anoVec = ano.value
    var modeloVec = modelo.value
    var fkTransportadoraVeiculo

    if (placaVec.length > 7 || placaVec.length < 5 || (placaVec.length != 7 && tipoVec == 'carro')) {
        alert('Insira uma placa válida')
        return;
    } else if (anoVec.length != 4) {
        alert('Insira um ano válido')
        return;
    } else {
       fetch("/veiculo/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipoVecServer: tipoVec,
        placaVecServer: placaVec,
        anoVecServer: anoVec,
        modeloVecServer: modeloVec,
        fkTransportadoraVeiculoServer: fkTransportadoraVeiculo,
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

    


}


var funcionarios = []
function buscarTransportadoraDoUsuario() {
var idUsuario = sessionStorage.ID_USUARIO
fetch("/usuarios/buscarIdParaCadastro", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
idUsuarioServer: idUsuario
}),
})
.then(res => res.json())
.then(data => {
sessionStorage.ID_TRANSPORTADORA = data.idtransportadora;
mostrarFuncionarios();
});
}

let botao = 0;
let tamanhoFooter = 12.5;
tamanhoMaximo = 45;

function mostrarFuncionarios() {
var idTransportadora = sessionStorage.ID_TRANSPORTADORA;

if (!idTransportadora) {
console.error("ID da transportadora não encontrado!");
return;
}

usuariosCadastrados.innerHTML = ``;

fetch(`/usuarios/procurarNovoUsuario/${idTransportadora}`, {
method: "POST"
})
.then(function (resposta) {
console.log("resposta: ", resposta);

if (resposta.ok) {
resposta.json().then(function (dados) {
funcionarios = dados

for (let i = 0; i < funcionarios.length; i++) {
usuariosCadastrados.innerHTML += `
<h4><span class = "Itens">${funcionarios[i].nome}</span> <span class = "Itens">${funcionarios[i].email}</span> <span class = "Itens">${funcionarios[i].senha}</span> <span class = "Itens"><button onclick = "Excluir()" class = "botao1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button></span> <span class = "Itens"><button class = "botao2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg></button></span></h4>
<style>
.fotter{
display: block;
margin-top: ${tamanhoFooter}rem;
}
</style>
`;
}
});
} else {
throw "Houve um erro ao tentar buscar os funcionários!";
}
})
.catch(function (erro) {
console.log(`#ERRO: ${erro}`);
});
}



function cadastroFuncionario() {
nomeFuncionario = nome.value;
emailFuncionario = email.value;
senhaFuncionario = senha.value;
idUsuario = sessionStorage.ID_USUARIO

if (nomeFuncionario == null || emailFuncionario == null || senhaFuncionario == null) {
alert("preencha todos os campos!")
return;
}


fetch("/usuarios/buscarIdParaCadastro", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
idUsuarioServer: idUsuario
}),
})
.then((resposta1) => {
if (!resposta1.ok) {
throw new Error("Erro ao cadastrar cliente");
}
return resposta1.json()
})
.then(function (dados) {
var idTransportadora = dados.idtransportadora


return fetch("/usuarios/inserirNovoUsuario", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
nomeFuncionarioServer: nomeFuncionario,
emailFuncionarioServer: emailFuncionario,
senhaFuncionarioServer: senhaFuncionario,
idTransportadoraServer: idTransportadora
})
})
})
.then(function (resposta2) {
if (!resposta2.ok) {
throw new Error("Erro ao cadastrar funcionário")
}

alert("Funcionário cadastrado com sucesso!")
buscarTransportadoraDoUsuario()

})
.catch(function (erro) {
console.error("Erro:", erro)
alert("Erro no cadastro. Verifique os campos e tente novamente.")
})


}
