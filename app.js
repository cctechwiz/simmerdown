import Header from './views/components/Header.js'

import Home from './views/pages/Home.js'
import NewRecipe from './views/pages/NewRecipe.js'
import Viewrecipe from './views/pages/ViewRecipe.js'
import EditRecipe from './views/pages/EditRecipe.js'
import Error404 from './views/pages/Error404.js'

import Api from './services/Api.js'
import UrlParser from './services/UrlParser.js'

//Note: The URL must start with /#/ (aka Fragment Identifier)
const routes = {
    '/'         : Home
  , '/new'      : NewRecipe
  , '/view/:id' : Viewrecipe
  , '/edit/:id' : EditRecipe
};

const router = async () => {
  console.log('Hello, from app.js router!');

  var touchsupport = ('ontouchstart' in window)
                     || (navigator.maxTouchPoints > 0)
                     || (navigator.msMaxTouchPoints > 0);
  if (!touchsupport){
      document.documentElement.classList.add("non-touch");
  }

  const header = null || document.getElementById('header-container');
  const content = null || document.getElementById('page-container');

  const request = UrlParser.getRequest();
  const parsedUrl = UrlParser.getRoutableUrl(request);
  const page = routes[parsedUrl] ? routes[parsedUrl] : Error404;

  header.innerHTML = await Header.render();
  await Header.after_render();

  const userStatus = await Api.testLoggedIn();
  console.log(userStatus);
  if (!userStatus.user) {
    console.log("User not logged in");
    netlifyIdentity.open();
    return;
  }

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);

netlifyIdentity.on('close', () => {
  console.log("netlifyIdentity close event");
  const user = netlifyIdentity.currentUser();
  if (user) {
    router();
  }
});

netlifyIdentity.on('login', () => {
  console.log("netlifyIdentity login event");
  netlifyIdentity.close();
});

netlifyIdentity.on('logout', () => {
  console.log("netlifyIdentity logout event");
  const content = document.getElementById('page_container');
  content.innerHTML = "";
  netlifyIdentity.close();
});
