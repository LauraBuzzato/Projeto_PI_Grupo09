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
    var anoVec = Number(ano.value) 

    if(placaVec.length > 7){
        alert('Insira uma placa válida')
    }else if(anoVec.length != 4){
        alert('Insira um ano válido')
    }else {
        alert('Veículo cadastrado com sucesso!')
    }
}