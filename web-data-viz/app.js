//var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

const { GoogleGenAI } = require("@google/genai");
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

var app = express();

var indexRouter = require("./src/routes/index");
var enderecosRouter = require("./src/routes/enderecos");

var clienteNaoCadastradoRouter = require("./src/routes/clienteNaoCadastrado");

var veiculoRouter = require("./src/routes/veiculo");
var usuarioRouter = require("./src/routes/usuarios");
var alertaRouter = require("./src/routes/alertas");

// var pedidoRouter = require("./src/routes/pedido")

var pedidosRouter = require("./src/routes/pedidos");
var medidasRouter = require("./src/routes/medidas");


/*var avisosRouter = require("./src/routes/avisos");

var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/enderecos", enderecosRouter);
app.use("/usuarios", usuarioRouter);
app.use("/clienteNaoCadastrado", clienteNaoCadastradoRouter);
app.use("/alertas", alertaRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});


// app.use("/pedido", pedidoRouter)
app.use("/veiculo", veiculoRouter)
app.use("/pedidos", pedidosRouter);
app.use("/medidas", medidasRouter);

/*
app.use("/avisos", avisosRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter); */

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});


// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = await chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Em um paragráfo responda: ${mensagem}`

        });
        const resposta = modeloIA.text;
        const tokens = modeloIA.usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}