const nodemon = require("nodemon")

function verificarPedidoJa() {
    var medicamento1 = med1.value
    var selectCliente = Cliente.value
    var dataEntregaPrevista = entregaPrevista.value
    var veiculoDoPedido = veiculoPedido.value


    if (!selectCliente || !dataEntregaPrevista || !veiculoDoPedido || !medicamento1) {
        alert('Algum campo não preenchido.')
        return
    } else {
        dataEntregaPrevista += ':00'
        var dataEntregaPrevistaReal = dataEntregaPrevista.replace('T', ' ')

        fetch(`/pedidos/verificarVeiculoStatus/${veiculoDoPedido}`)
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro ao verificar se veiculo está em outro pedido.")
                }
                return resposta.json()
            })
            .then((dados) => {

                if (dados.length > 0) {
                    alert('Veiculo está com um pedido em andamento!')

                    return
                } else {


                    fetch("/pedidos/cadastrarPedido", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            medicamento1Server: medicamento1,
                            selectClienteServer: selectCliente,
                            dataEntregaPrevistaServer: dataEntregaPrevistaReal,
                            veiculoDoPedidoServer: veiculoDoPedido
                        }

                        ),
                    })
                        .then((resposta1) => {
                            if (!resposta1.ok) {
                                throw new Error("Erro no cadastro do pedido!");
                            }

                            alert("Cadastro do pedido realizado com sucesso!");

                        })
                        .catch((erro) => {
                            console.error("Erro:", erro);
                        });

                    return false;
                }


            })




    }


}


function cadastrarVeiculo() {
    var tipoVec = tipo.value
    var placaVec = placa.value
    var anoVec = ano.value
    var modeloVec = modelo.value
    var idTransportadora = sessionStorage.ID_TRANSPORTADORA;




    if (placaVec.length > 7 || placaVec.length < 5 || (placaVec.length != 7 && tipoVec == 'carro')) {
        alert('Insira uma placa válida')
        return;
    } else if (anoVec.length != 4) {
        alert('Insira um ano válido')
        return;
    } else {

        if(tipoVec == 'carro'){
            tipoVec = 'Automóvel'
        }else if(tipoVec == 'aereo'){
            tipoVec == 'Aéreo'
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
                idTransportadoraVeiculoServer: idTransportadora,
            }

            ),
        })
            .then((resposta3) => {
                if (!resposta3.ok) {
                    throw new Error("Erro no cadastro!");
                }

                return fetch(`/veiculo/buscarIdVeiculo/${placaVec}`);
            })
            .then((resposta2) => {
                if (!resposta2.ok) {
                    throw new Error("Erro no cadastro!");
                }
                console.log(resposta2)
                return resposta2.json();
            })
            .then((dados1) => {

                console.log(dados1)
                const idVeiculo = dados1.idveiculo

                return fetch("/veiculo/cadastroSensor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idVeiculoServer: idVeiculo
                    }),
                });
            })
            .then((resposta3) => {
                if (!resposta3.ok) {
                    throw new Error("Erro no cadastro!");
                }

                alert("Cadastro realizado com sucesso!");
            })
            .catch((erro) => {
                console.error("Erro:", erro);
            });

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
var iduser = 0
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
                        iduser = funcionarios[i].userid
                        usuariosCadastrados.innerHTML += `
<h4><span class = "Itens">${funcionarios[i].nome}</span> <span class = "Itens">${funcionarios[i].email}</span> <span class = "Itens">${funcionarios[i].senha}</span> <span class = "Itens"><button onclick = "Excluir(${iduser})" class = "botao1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button></span> <span class = "Itens"><button onclick = "Editar(${iduser})" class = "botao2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg></button></span></h4>
<style>
.fotter{
display: block;
margin-top: 12.5rem;
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

function Excluir(iduser) {
    fetch(`/usuarios/removerusuario/${iduser}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",

        },
    })
        .then((res) => {
            if (res.json) {
                buscarTransportadoraDoUsuario()
            }
        })
}

var idAlterar = 0
function Editar(iduser) {
    for (var i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].userid == iduser) {
            idAlterar = funcionarios[i].userid
            nome.value = `${funcionarios[i].nome}`
            email.value = `${funcionarios[i].email}`
            senha.value = `${funcionarios[i].senha}`
            break
        }
    }

}


function editandoFuncionario() {
    console.log('edit', idAlterar)
    var nomeInput = document.getElementById("nome");
    var emailInput = document.getElementById("email");
    var senhaInput = document.getElementById("senha");
    for (var i = 0; i < funcionarios.length; i++) {
        var email = emailInput.value
        var senha = senhaInput.value
        var nome = nomeInput.value
        if (funcionarios[i].userid === idAlterar) {
            if (funcionarios[i].email === email) {
                console.log('não alterou email')
            } else {
                console.log('alterou email')
                fetch(`/usuarios/editandoemail/${idAlterar}/${email}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",

                    },
                })
                    .then((res) => {
                        if (res.json) {
                            buscarTransportadoraDoUsuario()
                        }
                    })
            }
             if (funcionarios[i].senha === senha) {
                console.log('não alterou a senha')
            }else{
                console.log('alterou a senha')
                      fetch(`/usuarios/editandosenha/${idAlterar}/${senha}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",

                    },
                })
                    .then((res) => {
                        if (res.json) {
                            buscarTransportadoraDoUsuario()
                        }
                    })
            }
        }
    }
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



