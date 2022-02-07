import Fetch from "./fetch.js";
import { pattern } from "./regex.js";

export default class Value {
    constructor(buttonStart, input, wrong = '[data-wrong="value"]') {
        this.buttonStart = document.querySelector(buttonStart);
        this.input = document.querySelector(input);
        this.wrong = document.querySelector(wrong);
    }

    // Checa a autenticidade do valor inserido...
    checkValue() {
        this.input.value = this.formatValue();
        return pattern.test(this.input.value);
    }

    // Formata o valor inserido...
    formatValue() {
        return this.input.value.replace(pattern, "$1$2-$3");
    }

    // Insere uma mensagem no formulário dizendo que o valor inserido está incorreto...
    wrongValue(message) {
        this.wrong.classList.add("active");
        this.wrong.innerText = message;
        return this;
    }

    // Toma uma decisão de acordo com a autenticidade do valor inserido...
    validateValue(e) {
        e.preventDefault();
        if (this.checkValue()) {
            new Fetch(this.input, "[data-result]").init();
            this.wrong.classList.remove("active");
        } else {
            this.wrongValue("💀 CEP inválido. Tente novamente!");
            this.input.value = "";
        }
        return this;
    }

    // Adiciona um evento ao botão...
    addEvents() {
        this.buttonStart.addEventListener("click", this.validateValue);
        return this;
    }

    // Mantém a referência correta do método...
    bindEvents() {
        this.validateValue = this.validateValue.bind(this);
        return this;
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.addEvents();
    }
}
