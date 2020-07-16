const HtmlBuilder = {
  addChild : (parent, type, content="") => {
    let child = document.createElement(type);
    let text = document.createTextNode(content);
    child.appendChild(text);
    parent.appendChild(child);
    return child;
  },

  addRemoveableInput : (parent, type, content="") => {
    let inputContainer = HtmlBuilder.addChild(parent, "div");
    inputContainer.classList.add("input-container");

    let input = HtmlBuilder.addChild(inputContainer, type);
    if (type == "input") { input.type = "text"; }
    input.value = content;

    let removeBtn = HtmlBuilder.addChild(inputContainer, "button");
    removeBtn.classList.add("fas");
    removeBtn.classList.add("fa-times");
    removeBtn.addEventListener("click", () => {
      parent.removeChild(inputContainer);
    });

    return inputContainer;
  }
};

export default HtmlBuilder;