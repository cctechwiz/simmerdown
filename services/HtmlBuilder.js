const HtmlBuilder = {
  addChild : (parent, type, content) => {
    let child = document.createElement(type);
    let text = document.createTextNode(content);
    child.appendChild(text);
    parent.appendChild(child);
    return child;
  }
};

export default HtmlBuilder;