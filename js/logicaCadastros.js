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

    if (placaVec.length > 7 || placaVec.length < 5 || (placaVec.length != 7 && tipoVec == 'carro')) {
        alert('Insira uma placa válida')
        return;
    } else if (anoVec.length != 4) {
        alert('Insira um ano válido')
        return;
    } else {
        alert('Veículo cadastrado com sucesso!')
    }


}