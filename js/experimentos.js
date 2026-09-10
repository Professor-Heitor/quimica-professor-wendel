function curtir(idLikes, idBtn) {
    let span = document.getElementById(idLikes);
    let btn = document.getElementById(idBtn);
    let atual = parseInt(span.innerText);
    
    if (btn.dataset.curtido === "true") {
        span.innerText = atual - 1;
        btn.dataset.curtido = "false";
        btn.style.background = "#2563eb";
    } else {
        span.innerText = atual + 1;
        btn.dataset.curtido = "true";
        btn.style.background = "#dc2626"; // Fica vermelho ao curtir
    }
}

function comentar(idInput, idLista) {
    let input = document.getElementById(idInput);
    let texto = input.value.trim();
    
    if (texto !== "") {
        let lista = document.getElementById(idLista);
        let novoComentario = document.createElement("p");
        novoComentario.style.background = "#333";
        novoComentario.style.padding = "5px 8px";
        novoComentario.style.borderRadius = "4px";
        novoComentario.style.marginTop = "5px";
        novoComentario.style.fontSize = "14px";
        novoComentario.innerText = "💬 " + texto;
        
        lista.appendChild(novoComentario);
        input.value = ""; // Limpa o campo de texto
    }
}