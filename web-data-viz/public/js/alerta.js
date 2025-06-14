document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    if (!sessionStorage.ID_USUARIO) {
        window.location.href = '../index.html';
        return;
    }

    // Busca a transportadora do usuário
    fetch("/usuarios/buscarIdParaCadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO
        }),
    })
    
    .then(function(res) {
        if (!res.ok) {
            throw new Error('Erro ao buscar transportadora');
        }
        return res.json();
    })
    .then(function(data) {
        var idTransportadora = data.idtransportadora;
        carregarAlertas(idTransportadora);
        
        // Atualiza os alertas a cada 5 segundos
        setInterval(function() {
            carregarAlertas(idTransportadora);
        }, 5000);
    })
    .catch(function(error) {
        console.error('Erro ao buscar transportadora:', error);
        mostrarErro('Erro ao carregar dados da transportadora');
    });
});

function carregarAlertas(idTransportadora) {
    var container = document.getElementById('containerAlertas');
    
    if (!container) {
        console.error('Elemento containerAlertas não encontrado');
        return;
    }

    fetch(`/alertas/buscarAlertasAtivos/${idTransportadora}`)
        .then(function(res) {
            if (!res.ok) {
                throw new Error('Erro ao buscar alertas');
            }
            return res.json();
        })
        .then(function(alertas) {
            console.log(alertas);
            
            if (alertas.length === 0) {
                container.innerHTML = '<div class="alertas"><div class="info">Nenhum alerta ativo no momento</div></div>';
                return;
            }

            container.innerHTML = ''; // Limpa alertas anteriores
            
            for (var i = 0; i < alertas.length; i++) {
                var alerta = alertas[i];
                var divAlerta = document.createElement('div');
                divAlerta.className = 'alertas';
                
                var divConteudo = document.createElement('div');
                divConteudo.className = alerta.gravidade === 'perigo' ? 'perigo' : 'atencao';
                
                var mensagem = '';
                if (alerta.gravidade === 'perigo') {
                    mensagem = `ATENÇÃO!! O VEÍCULO ${alerta.placa} DO CLIENTE 
                              ${alerta.cliente} ESTÁ COM TEMPERATURA 
                              ${alerta.tipo_alerta.toUpperCase()} !!`;
                } else if(alerta.gravidade === 'atencao') {
                    mensagem = `ATENÇÃO!! O VEÍCULO ${alerta.placa} DO CLIENTE 
                              ${alerta.cliente} ESTÁ COM TEMPERATURA PRÓXIMA DO
                              ${alerta.tipo_alerta.toUpperCase()} !!`;
                } 
                
                divConteudo.textContent = mensagem;
                
                divConteudo.onclick = (function(veiculoId, clienteId) {
                    return function() {
                        redirecionarParaDashboard(veiculoId, clienteId);
                    };
                })(alerta.idveiculo, alerta.idcliente);
                
                divAlerta.appendChild(divConteudo);
                container.appendChild(divAlerta);
            }
        })
        .catch(function(error) {
            console.error('Erro ao carregar alertas:', error);
            mostrarErro('Erro ao carregar alertas');
        });
}

function redirecionarParaDashboard(veiculoId, clienteId) {

    window.location.href = `dashboard.html?idveiculo=${veiculoId}&idcliente=${clienteId}`;

}


function mostrarErro(mensagem) {
    var container = document.getElementById('containerAlertas');
    if (container) {
        container.innerHTML = `<div class="alertas"><div class="erro"> ${mensagem} </div></div>`;
    }
}