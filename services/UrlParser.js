'use strict';

const UrlParser = {
  getRequest : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split('/');

    let request = {
      resource  : r[1],
      id        : r[2],
      //verb      : r[3]
    };

    return request;
  },

  getRoutableUrl : (request) => {
    let url = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '');// + (request.verb ? '/' + request.verb : '');
    return url;
  }
};

export default UrlParser;
