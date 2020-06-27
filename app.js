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

  const content = null || document.getElementById('page_container');

  let request = UrlParser.getRequest();
  console.log(request);
  let parsedUrl = UrlParser.getRoutableUrl(request);
  console.log(parsedUrl);
  let page = routes[parsedUrl] ? routes[parsedUrl] : Error404;

  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);