
const ctx = document.getElementById('pieChart').getContext('2d');
let metricas = ["Detratores", "Promotores", "Neutros"];
let getId = (id) => document.getElementById(id);
async function getInfos() {
    let valores = [0, 0, 0];
    try {
        let req = await fetch("app/geral/getAvaliacoes");
        if (!req.ok) {
            throw new Error("falha consulta");
        }
        let retorno = await req.json();
        let comprimento = retorno.length
        for (let index = 0; index < 3; index++) {
            valores[index] = retorno.filter((x) => x["metricas"] == metricas[index]).length;
        }
        const detratores = ((valores[0] * 100) / comprimento).toFixed(0);
        const promotores = ((valores[1] * 100) / comprimento).toFixed(0);
        const neutros = ((valores[2] * 100) / comprimento).toFixed(0);
        getId("detratores").textContent = `${detratores}%`;
        getId("promotores").textContent = `${promotores}%`;
        getId("neutros").textContent = `${neutros}%`;

        const nps = promotores - detratores;
        getId("nps").textContent = `${nps}%`;
        listagemItem(retorno);
        geraGrafico(valores)
    } catch (error) {
        console.log(error);
    }
}
function listagemItem(retorno) {
    let pai = document.getElementById("scroll-area");
    retorno.forEach(e => {
        let elemento = document.createElement("div");
        elemento.innerHTML = `
            <div class="scroll-item">
                    <h4>${e["metricas"]}</h4>
                    <p>${e["descricao"]}</p>
            </div>
        `
        pai.appendChild(elemento)
    });
}
function geraGrafico(valores) {
    let pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Detratores", 'Promotores', 'Neutros'],
            datasets: [{
                data: [valores[0], valores[1], valores[2]],
                backgroundColor: [
                    '#FF0000',
                    '#00FF00',
                    '#F7FF00'
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });

}

getInfos();
geraGrafico();
