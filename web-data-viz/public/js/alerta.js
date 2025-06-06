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
    
    // Verifica se o container existe
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
            container.innerHTML = '';

            if ( alertas.length === 0) {
                container.innerHTML = '<div class="alertas"><div class="info">Nenhum alerta ativo no momento</div></div>';
                return;
            }

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
                } else {
                    mensagem = `ATENÇÃO!! O VEÍCULO ${alerta.placa} DO CLIENTE 
                              ${alerta.cliente} ESTÁ COM TEMPERATURA PRÓXIMA DO
                              ${alerta.tipo_alerta.toUpperCase()} !!`;
                }
                
                divConteudo.textContent = mensagem;
                
                divConteudo.onclick = (function(pedidoId) {
                    return function() {
                        redirecionarParaDashboard(pedidoId);
                    };
                })(alerta.idpedido);
                
                divAlerta.appendChild(divConteudo);
                container.appendChild(divAlerta);
            }
        })
        .catch(function(error) {
            console.error('Erro ao carregar alertas:', error);
            mostrarErro('Erro ao carregar alertas');
        });
}

function redirecionarParaDashboard(pedidoId) {
    window.location.href = `dashboard.html?pedido=${pedidoId}`;
}

function mostrarErro(mensagem) {
    var container = document.getElementById('containerAlertas');
    if (container) {
        container.innerHTML = `<div class="alertas"><div class="erro"> ${mensagem} </div></div>`;
    }
}