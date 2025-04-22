function verificarPedido(){
    var documentoCliente = docCliente.value


    if(documentoCliente.length > 12){
        alert('Insira um CNPJ válido')
    }else{
        alert('Pedido Cadastrado com sucesso!')
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