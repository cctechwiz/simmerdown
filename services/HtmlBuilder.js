const HtmlBuilder = {
  addChild : (parent, type, content="") => {
    let child = document.createElement(type);
    //TODO: Shoudld this be createTextNode or innerHTML so I can add another element here?
    let text = document.createTextNode(content);
    child.appendChild(text);
    parent.appendChild(child);
    return child;
  }
};

export default HtmlBuilder;