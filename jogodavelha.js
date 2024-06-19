const board = document.getElementById("board");
const casinhas = document.querySelectorAll(".casinha");
const boxVencedor = document.getElementById("vencedor");
const resetButton = document.getElementById("resetButton");

let jogadas = 0;
let jogoAtivo = true;

casinhas.forEach(casinha => {
  casinha.addEventListener('click', casinhaClick);
});

function casinhaClick() {
    if (this.innerHTML === "" && jogoAtivo) {
        this.innerHTML = jogadas % 2 === 0 ? "X" : "O";
        jogadas++;
        if (jogadas >= 5) {
            verificaGanhador();
        }
    }
}

function verificaGanhador() {
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
        [0, 4, 8], [2, 4, 6]             // diagonais
    ];

    for (let combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (casinhas[a].innerHTML && casinhas[a].innerHTML === casinhas[b].innerHTML && casinhas[a].innerHTML === casinhas[c].innerHTML) {
            jogoAtivo = false;
            boxVencedor.innerHTML = `O '${casinhas[a].innerHTML}' Venceu!`;
            resetButton.style.display = "block";
            return;
        }
    }

    if (jogadas === 9) {
        boxVencedor.innerHTML = "Empate!";
        jogoAtivo = false;
        resetButton.style.display = "block";
    }
}

function resetGame() {
    casinhas.forEach(casinha => {
        casinha.innerHTML = "";
    });
    jogadas = 0;
    jogoAtivo = true;
    boxVencedor.innerHTML = "";
    resetButton.style.display = "none";
}

resetButton.addEventListener('click', resetGame);
