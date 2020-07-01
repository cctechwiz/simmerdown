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

  const data = await Api.testLoggedIn();
  console.log(data);

  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');

  const request = UrlParser.getRequest();
  const parsedUrl = UrlParser.getRoutableUrl(request);
  const page = routes[parsedUrl] ? routes[parsedUrl] : Error404;

  header.innerHTML = await Header.render();
  await Header.after_render();

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);