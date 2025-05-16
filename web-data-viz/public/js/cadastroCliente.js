function cadastrar() {
        var nomeDoCliente = nomeCliente.value
        var documendoDoCliente = docCliente.value
        var TelefoneDoCliente = clienteTel.value
        var cepDoCliente = cepCliente.value
        var logradouroDoCliente = logradouroCliente.value
        var numeroDoCliente = numeroCliente.value
        var complementoDoCliente = complementoCliente.value
        var bairroDoCliente = bairroCliente.value
        var cidadeDoCliente = cidadeCliente.value
        var estadoDoCliente = estadoCliente.value


        if (logradouroTransportadora == null || cepTransportadora == null || estadoTransportadora == null || cidadeTransportadora == null || bairroTransportadora == null || numeroTransportadora == null || complementoTransportadora == null) {
            alert("preencha todos os campos!")
            return false;
        } else {
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
                then((resposta1) => {
            if (!resposta1.ok) {
                throw new Error("Erro ao cadastrar transportadora");
            }

            //Buscar ID da enderecoCliente
            return fetch(`/usuarios/buscar-id-endereco/${nome}`);
        })
        .then((resposta2) => {
            if (!resposta2.ok) {
                throw new Error("Erro ao buscar ID da transportadora");
            }
            return resposta2.json();
        })
        .then((dados) => {
            const idEndereco = dados.idendereco;

            //Cadastrar usuário com o ID da transportadora
            return fetch("/clienteNaoCadastrado/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeCliente: nomeDoCliente,
                    documendoCliente: documendoDoCliente,
                    TelefoneCliente: TelefoneDoCliente,
                    idendereco: idEndereco
                }),
            });
        })
        .then((resposta3) => {
            if (!resposta3.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            alert("Cadastro realizado com sucesso!");
            window.location.href = "clienteJaCadastrado.html";
        })
        .catch((erro) => {
            console.error("Erro:", erro);
            alert("Erro no cadastro. Verifique os campos e tente novamente.");
        });
            
        }



    }