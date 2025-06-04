function cadastrar() {
        var nomeDoCliente =  document.getElementById("nomeCliente").value
        var documendoDoCliente = document.getElementById("docCliente").value
        var TelefoneDoCliente =document.getElementById("clienteTel").value
        var cepDoCliente =document.getElementById("cepCliente").value
        var logradouroDoCliente =document.getElementById("logradouroCliente").value
        var numeroDoCliente =document.getElementById("numeroCliente").value
        var complementoDoCliente =document.getElementById("complementoCliente").value
        var bairroDoCliente =document.getElementById("bairroCliente").value
        var cidadeDoCliente =document.getElementById("cidadeCliente").value
        var estadoDoCliente =document.getElementById("estadoCliente").value


        if (!nomeDoCliente || !documendoDoCliente || !TelefoneDoCliente || !cepDoCliente || 
            !logradouroDoCliente || !numeroDoCliente  || !complementoDoCliente  || 
            !bairroDoCliente  || !cidadeDoCliente  || !estadoDoCliente ) {
            alert("preencha todos os campos!")
            return ;
        } 
        if(documendoDoCliente.length != 14){
             alert("CNPJ inválido! Deve conter 14 números.");
             return;
        }
        if(cepDoCliente.length != 8){
             alert("CEP inválido! Insira um CEP com 8 dígitos.");
             return;
        }
        if(estadoDoCliente.length != 2){
            alert("Insira apenas a sigla do estado! (2 dígitos)");
            return;
        }
        
            // Enviando o valor da nova input
            fetch("/clienteNaoCadastrado/cadastrar2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    cepCliente: cepDoCliente,
                    logradouroCliente: logradouroDoCliente,
                    numeroCliente: numeroDoCliente,
                    complementoCliente: complementoDoCliente,
                    bairroCliente: bairroDoCliente,
                    cidadeCliente: cidadeDoCliente,
                    estadoCliente: estadoDoCliente
                }),
            })
                .then((resposta1) => {
            if (!resposta1.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }

            //Buscar ID da enderecoCliente
            return fetch(`/clienteNaoCadastrado/buscarIdEndereco/${cepDoCliente}/${logradouroDoCliente}/${numeroDoCliente}`);
        })
        .then((resposta2) => {
            if (!resposta2.ok) {
                throw new Error("Erro ao buscar ID do Endereço");
            }
            return resposta2.json();
        })
        .then((dados) => {
            console.log(dados.idendereco)
            const idEndereco = dados.idendereco;

            //Cadastrar usuário com o ID da transportadora
            return fetch(`/clienteNaoCadastrado/cadastrar/${idEndereco}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeCliente: nomeDoCliente,
                    documendoCliente: documendoDoCliente,
                    TelefoneCliente: TelefoneDoCliente,
                    idEndereco: idEndereco
                }),
            });
        })
        .then((resposta3) => {
            if (!resposta3.ok) {
                throw new Error("Erro ao cadastrar cliente");
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "clienteJaCadastrado.html";
        })
        .catch((erro) => {
            console.error("Erro:", erro);
            alert("Erro no cadastro. Verifique os campos e tente novamente.");
        });
            




    }