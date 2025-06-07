var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar2", function (req, res) {
    usuarioController.cadastrar2(req, res);
});

router.get("/buscar-id-transportadora/:nome", function (req, res) {
    usuarioController.buscarIdTransportadora(req, res);
});


router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res){
    usuarioController.autenticar(req, res);
})

router.post("/buscarIdParaCadastro", function (req, res) {
usuarioController.buscarIdParaCadastro(req, res);
});

router.post("/inserirNovoUsuario", function (req, res) {
usuarioController.inserirNovoUsuario(req, res)
})

router.post("/procurarNovoUsuario/:idTransportadora", function (req, res) {
usuarioController.procurarNovoUsuario(req, res)
})

router.delete("/removerusuario/:idusuario", function (req,res){
    usuarioController.removerUsuario(req,res)
})

router.put("/editandoemail/:idusuario/:emailp" , function (req,res){
    usuarioController.editandoemail(req,res)
})

router.put("/editandosenha/:idusuario/:senhap" , function (req,res){
    usuarioController.editandosenha(req,res)
})


module.exports = router;