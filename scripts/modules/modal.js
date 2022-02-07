export default class Modal {
    constructor(buttonStop, modalArea) {
        this.buttonStop = document.querySelector(buttonStop);
        this.modalArea = document.querySelector(modalArea);
    }

    // Fecha o modal...
    closeModal(e) {
        e.preventDefault();
        this.modalArea.classList.remove("active");
    }

    // Abre o modal...
    openModal() {
        this.modalArea.classList.add("active");
        this.addEvents();
    }

    // Adiciona evento ao botão de fechar...
    addEvents() {
        this.buttonStop.addEventListener("click", this.closeModal);
    }

    // Mantém a referência correta do método...
    bindEvents() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // Inicializa a classe...
    init() {
        this.bindEvents();
        this.openModal();
        return this;
    }
}
