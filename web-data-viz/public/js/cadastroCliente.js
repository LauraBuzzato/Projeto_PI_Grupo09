function cadastrar() {
        var nomeDoCliente =  document.getElementById("nomeCliente").value
        var documendoDoCliente = docCliente.value
        var TelefoneDoCliente =document.getElementById("clienteTel").value
        var cepDoCliente =document.getElementById("cepCliente").value
        var logradouroDoCliente =document.getElementById("logradouroCliente").value
        var numeroDoCliente =document.getElementById("numeroCliente").value
        var complementoDoCliente =document.getElementById("complementoCliente").value
        var bairroDoCliente =document.getElementById("bairroCliente").value
        var cidadeDoCliente =document.getElementById("cidadeCliente").value
        var estadoDoCliente =document.getElementById("estadoCliente").value


        if (nomeDoCliente == null || documendoDoCliente == null || TelefoneDoCliente == null || cepDoCliente == null || logradouroDoCliente == null || numeroDoCliente == null || complementoDoCliente == null || bairroDoCliente == null || cidadeDoCliente == null || estadoDoCliente == null) {
            alert("preencha todos os campos!")
            return ;
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
            return fetch(`/usuarios/buscar-id-endereco/${cep},${logradouro},${numero}`);
        })
        .then((resposta2) => {
            if (!resposta2.ok) {
                throw new Error("Erro ao buscar ID do Endereço");
            }
            return resposta2.json();
        })
        .then((dados) => {
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