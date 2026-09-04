async function entrarComoProfessor() {
    const email = prompt("E-mail do professor:");
    if (!email) return;
    const senha = prompt("Senha:");
    if (!senha) return;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        alert("Login inválido: " + error.message);
        return;
    }

    ativarModoProfessor();
}

async function sairDoModoProfessor() {
    await supabase.auth.signOut();
    window.location.reload();
}