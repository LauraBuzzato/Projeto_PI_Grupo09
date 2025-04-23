function verificarPedidoJa(){
    var qtd1 = Number(qtd_med1.value)
    var qtd2 = Number(qtd_med2.value)
    var medicamento2 = med2.value


        if((qtd2 > 0 && medicamento2 == '') || qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '') ){

            if(qtd2 > 0 && medicamento2 == ''){
                alert('Não possível inserir a quantidade do segundo medicamento sem inserir o seu tipo.')
            }
            if (qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '') ){
                alert('Insira uma quantidade de medicamentos válida.')
            }
 
        }else {
            alert('Cadastro realizado com sucesso!')
        }

}

function verificarPedidoNao(){
    var qtd1 = Number(qtd_med1.value)
    var qtd2 = Number(qtd_med2.value)
    var medicamento2 = med2.value
    var telefoneCli = clienteTel.value
    var cnpjCliente = docCliente.value
    var cepCLi = cepCliente.value
    var num = Number(numeroCliente.value)
    var sigla = estadoCliente.value

    if((qtd2 > 0 && medicamento2 == '') || qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '') || cnpjCliente != 18 
        || cepCLi != 9 || num <= 0 || sigla.length != 2  || telefoneCli.length != 9 || telefoneCli.length != 11){

        if(qtd2 > 0 && medicamento2 == ''){
            alert('Não possível inserir a quantidade do segundo medicamento sem inserir o seu tipo.')
        }
        if (qtd1 <= 0 || (qtd2 <= 0 && medicamento2 != '') ){
            alert('Insira uma quantidade de medicamentos válida.')
        }
        if (cnpjCliente != 18){
            alert('Insira um CNPJ válido.')
        }       
    
        if (cepCLi != 9){
            alert('Insira um CEP válido.')
        }
    
        if(num <= 0){
            alert('Insira um número do endereço válido.')
        }
    
        if (sigla.length != 2){
            alert('Insira uma sigla de estado válida.')
        }
        if(telefoneCli.length != 9 || telefoneCli.length != 11){
            alert('Insira um número de telefone válido')
        }
    }else {
    alert('Cadastro realizado com sucesso!')
}

}


function verificarVeiculo(){
    var tipoVec = tipo.value
    var placaVec = placa.value 
    var anoVec = ano.value 

    if(placaVec.length > 7 || placaVec.length < 5 || anoVec.length != 4 || (placaVec.length != 7 && tipoVec == 'carro' )){

        if(placaVec.length > 7 || placaVec.length < 5 || (placaVec.length != 7 && tipoVec == 'carro' )){
            alert('Insira uma placa válida')
        }

        if(anoVec.length != 4){
            alert('Insira um ano válido')
        }
    }else {
        alert('Veículo cadastrado com sucesso!')
    }
 

}