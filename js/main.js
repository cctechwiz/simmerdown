var words = ['dad', 'mom', 'henley', 'adalyn'];

function filterListWithSearch(search) {
  let listItems = list.getElementsByTagName('li');
  for ( let i = 0; i < listItems.length; i++) {
    let li = listItems[i];
    if (li.innerText.indexOf(search) > -1 ) {
      li.style.display = "";
    }
    else {
      li.style.display = "none";
    }
  }
}

window.addEventListener("load", () => {

  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");
  const outputDiv = document.getElementById("output");
  const list = document.getElementById("list");

  searchForm.addEventListener("submit", (e) => {
    if(searchBox.value == "") {
      return;
    }

    e.preventDefault();

    alert(searchBox.value);
  });

  searchBox.addEventListener("keyup", (e) => {
    outputDiv.innerText = searchBox.value;

    filterListWithSearch(searchBox.value);
  });

  words.forEach( (item, index, array) => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item))
    list.appendChild(li);
  });

});