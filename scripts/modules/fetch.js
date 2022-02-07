import Modal from "./modal.js";
import Value from "./value.js";

export default class Fetch {
    constructor(input, resultArea) {
        this.input = input;
        this.resultArea = document.querySelectorAll(resultArea);
    }

    // Coloca os dados dentro do modal...
    putOnScreen(json) {
        this.resultArea.forEach((item, index) => {
            item.innerText = this.results(json)[index];
        });
    }

    // Transforma o objeto em matriz...
    results(json) {
        return [
            json.cep,
            json.logradouro,
            json.bairro,
            json.localidade,
            json.uf,
            json.ddd,
        ];
    }

    // Verifica se o CEP existe e toma a decisão...
    checker(json) {
        if (!Object.keys(json).includes("erro")) {
            new Modal('[data-button="stop"]', '[data-modal="area"]').init();
            this.putOnScreen(json);
            this.input.value = "";
        } else {
            new Value().wrongValue("💀 CEP não encontrado!");
            this.input.value = "";
        }
    }

    // Faz a requisição dos dados...
    fetch() {
        fetch(`https://viacep.com.br/ws/${this.input.value}/json/`)
            .then((response) => response.json())
            .then((json) => {
                this.checker(json);
            });
    }

    // Inicializa a classe...
    init() {
        this.fetch();
        return this;
    }
}
