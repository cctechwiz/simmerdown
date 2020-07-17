import HtmlBuilder from '../../services/HtmlBuilder.js'

class ModalConfirm {
    constructor(question, trueText, falseText) {
        this.questionText = question || "Are you sure?";
        this.trueText = trueText || "Yes";
        this.falseText = falseText || "No";

        this.modal = undefined;
        this.trueButton = undefined;
        this.falseButton = undefined;
        this.parent = document.body;

        this._createModal();
        this._appendModal();
    }

    confirm() {
        return new Promise((resolve, reject) => {
            const invalidState = !this.modal || !this.trueButton || !this.falseButton;
            if (invalidState) {
                reject("Something went wrong during modal creation");
            }

            this.modal.hidden = false;

            this.trueButton.addEventListener("click", () => {
                resolve(true);
                this._destroy();
            });

            this.falseButton.addEventListener("click", () => {
                resolve(false);
                this._destroy();
            });
        });
    }

    _createModal() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.modal.hidden = true;

        const modalContainer = HtmlBuilder.addChild(this.modal, "div");
        modalContainer.classList.add("modal-container");

        const question = HtmlBuilder.addChild(modalContainer, "div", this.questionText);
        question.classList.add("modal-question");

        const buttonGroup = HtmlBuilder.addChild(modalContainer, "div");
        buttonGroup.classList.add("modal-button-group");

        this.falseButton = HtmlBuilder.addChild(buttonGroup, "button", this.falseText);
        this.falseButton.type = "button";
        this.falseButton.classList.add("modal-button", "button-false");
        
        this.trueButton = HtmlBuilder.addChild(buttonGroup, "button", this.trueText);
        this.trueButton.type = "button";
        this.trueButton.classList.add("modal-button", "button-true");
    }

    _appendModal() {
        this.parent.appendChild(this.modal);
    }

    _destroy() {
        this.parent.removeChild(this.modal);
        delete this;
    }

};

export default ModalConfirm;