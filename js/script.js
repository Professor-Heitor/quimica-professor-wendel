// ================================
// QUÍMICA COM PROFESSOR WENDEL
// SCRIPT PRINCIPAL
// ================================


// Mensagem no console para confirmar que o JavaScript carregou

console.log("Site Química com Professor Wendel carregado!");



// Animação simples ao carregar a página

window.addEventListener("load", () => {

    const elementos = document.querySelectorAll("section");

    elementos.forEach((elemento, index) => {

        elemento.style.opacity = "0";

        elemento.style.transform = "translateY(30px)";


        setTimeout(() => {

            elemento.style.transition = "0.8s";

            elemento.style.opacity = "1";

            elemento.style.transform = "translateY(0)";


        }, index * 200);


    });


});


const botaoSerie = document.querySelector(".botao");


if(botaoSerie){

    botaoSerie.addEventListener("click", () => {

        console.log("Aluno escolheu uma série para estudar!");

    });

}




// Mensagem de boas-vindas

function boasVindas(){

    console.log(
        "Bem-vindo ao laboratório virtual do Professor Wendel!"
    );

}


boasVindas();