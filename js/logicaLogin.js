function login(){
    emailUsuario = email.value
    senhaUsuario = senha.value


    /*email já utilizado */
    emailCadastrados = ["email1@gmail.com", "email2@gmail.com", "email3@gmail.com", "email4@gmail.com"];

    

 //  var emUso = false;
  //  for(var i = 0; i<= emailUtilizados.length; i++){
  //      if (email == emailUtilizados[i]) {
  //         emUso = true;
 //       }
   // }

    // Simulação de login

    if (senhaUsuario == '123' && emailUsuario == 'email1@gmail.com') {
        alert("Bem vindo!")
        
        
    }else {
        alert("Algum campo está incorreto!")
        return;

    }

}