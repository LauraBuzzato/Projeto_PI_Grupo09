function login(){
    emailUsuario = email.value
    senhaUsuario = senha.value
    
    if (emailUsuario == "email1@gmail.com" && senhaUsuario === '123') {
        alert("Bem vindo!");
        window.location.href = "../transportadora/cadastroPedido.html";
    } else if (emailUsuario == "email2@gmail.com" && senhaUsuario === '123') {
        alert("Bem vindo!");
        window.location.href = "../funcionario/cadastroPedido.html";
    } else {
        alert("E-mail ou senha incorretos!");
        return false;
    }
    
    return false;

}
