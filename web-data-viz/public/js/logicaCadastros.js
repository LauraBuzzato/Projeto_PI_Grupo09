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
        alert('Veículo cadastrado com sucesso!')
    }

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


let botao = 0;
let tamanhoFooter = 12.5; 
tamanhoMaximo = 45;

function cadastroFuncionario() {
    nomeFuncionario = nome.value;
    emailFuncionario = email.value;
    senhaFuncionario = senha.value;
   var idUsuario=sessionStorage.idUsuario
}