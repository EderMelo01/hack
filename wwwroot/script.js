const botoesReacao = document.querySelectorAll('#avaliacao .botao-carinha');
const feedback = document.getElementById('feedback-atendimento');
async function salvar(event) {
    let metrica = {
        7: "Neutro",
        8: "Neutro",
        9: "Promotor",
        10: "Promotor"
    }
    let id = document.querySelectorAll('#avaliacao .selecionado')[0].dataset.valor;
    let avaliacao = {}
    avaliacao["atendimento"] = id;
    avaliacao["descricao"] = document.getElementById("comentario").value;
    botoesReacao.forEach(botao => {
        botao.classList.remove('selecionado');
        botao.classList.remove("desativado")
    });
    avaliacao["metrica"] = metrica["id"] ?? "Detratores"
    await salvarAvaliacao(avaliacao);
}

botoesReacao.forEach(botao => {
    const valor = parseInt(botao.dataset.valor);
    if (valor >= 1 && valor <= 6) {
        botao.classList.add('vermelho');
    } else if (valor === 7 || valor === 8) {
        botao.classList.add('amarelo');
    } else {
        botao.classList.add('verde');
    }
    botao.addEventListener('click', () => {
        botoesReacao.forEach(b => {
            b.classList.add('desativado');
            b.classList.remove('selecionado');
        });

        botao.classList.remove('desativado');
        botao.classList.add('selecionado');
        feedback.style.display = 'block';
    });

});
async function salvarAvaliacao(avaliacao) {
    try {
        let req = await fetch("/app/geral/novaConta", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(avaliacao)
        });
        if (!req.ok) {
            throw new error("Falha no processo " + req.status);
        }
        window.location.reload()

    } catch (error) {
        console.log(error);
    }
}