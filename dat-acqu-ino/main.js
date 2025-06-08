// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;
let habilitar_insert = true
let contagem = 0

// função para comunicação serial
const serial = async (
    valoresSensorTemperatura
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'aluno',
            password: 'sptech',
            database: 'biologistics',
            port: 3306
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const sensorTemperatura = parseFloat(data);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorTemperatura.push(sensorTemperatura);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(

                'INSERT INTO leiturasensor (idsensor, idpedido, valor) VALUES (1, 9, ?)',
                [sensorTemperatura]


            );

            if (sensorTemperatura > 8) {

                if (habilitar_insert) {
                    await poolBancoDados.execute(
                        'INSERT INTO alerta (idpedido,limite) VALUES (9, 8)'
                    );

                    habilitar_insert = false
                }

                contagem++
            } else if (sensorTemperatura < 2) {

                if (habilitar_insert) {
                    await poolBancoDados.execute(
                        'INSERT INTO alerta (idpedido,limite) VALUES (9, 2)'
                    );

                    habilitar_insert = false
                }

                contagem++
            } else {
                if (!habilitar_insert) {
                    var contagemFinal = contagem * 5
                    var duracaoFinal = ''

                    if (contagemFinal < 10) {
                        duracaoFinalL = `00:00:0${contagemFinal}`
                    } else if (contagemFinal < 60) {
                        duracaoFinal = `00:00:${contagemFinal}`
                    } else if (contagemFinal >= 60 && contagemFinal < 3600) {
                        var minutos = Math.trunc(contagemFinal / 60)
                        var resto = contagemFinal % 60

                        var resultado = `00:`

                        if (minutos < 10) {
                            resultado += `0${minutos}:`
                        } else {
                            resultado += `${minutos}:`
                        }

                        if (resto < 10) {
                            resultado += `0${resto}`
                        } else {
                            resultado += `${resto}`
                        }

                        duracaoFinal = resultado
                    } else if (contagemFinal >= 3600) {
                        var hora = Math.trunc(contagemFinal / 3600)
                        var restoHora = contagemFinal % 3600
                        var resultadoHoras = ``


                        if (hora < 10) {
                            resultadoHoras += `0${hora}:`
                        } else {
                            resultadoHoras += `${hora}:`
                        }


                        if (restoHora >= 60) {
                            var minutosHora = Math.trunc(restoHora / 60)
                            var restoMinutos = restoHora % 60

                            if (minutosHora < 10) {
                                resultadoHoras += `0${minutosHora}:`
                            } else {
                                resultadoHoras += `${minutosHora}:`
                            }
                            if (restoHora < 10) {
                                resultadoHoras += `0${restoMinutos}`
                            } else {
                                resultadoHoras += `${restoMinutos}`
                            }

                        } else {
                            resultadoHoras += `00:`
                            if (restoHora < 10) {
                                resultadoHoras += `0${restoHora}`
                            } else {
                                resultadoHoras += `${restoHora}`
                            }

                        }
                        duracaoFinal = resultadoHoras
                    }

                    await poolBancoDados.execute(
                        `UPDATE alerta SET duracao = ? WHERE idpedido = 9 AND duracao IS NULL`, [duracaoFinal]
                    );

                    habilitar_insert = true
                    contagem = 0
                }
            }

            console.log("valores inseridos no banco: ", sensorTemperatura);

        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorTemperatura
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/temperatura', (_, response) => {
        return response.json(valoresSensorTemperatura);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorTemperatura = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorTemperatura
    );

    // inicia o servidor web
    servidor(
        valoresSensorTemperatura
    );
})();