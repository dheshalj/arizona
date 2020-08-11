# arizona

[![npm version](https://img.shields.io/npm/v/arizonajs.svg?style=flat-square)](https://www.npmjs.org/package/arizonajs)
[![install size](https://packagephobia.now.sh/badge?p=arizonajs)](https://packagephobia.now.sh/result?p=arizonajs)
[![npm downloads](https://img.shields.io/npm/dm/arizonajs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=arizonajs)

Promise based HTTP client for the browser and node.js

## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


## Installing

Using npm:

```bash
$ npm install arizonajs
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/arizonajs/dist/arizona.min.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/arizonajs@2.6.0/dist/arizona.min.js"></script>
```

## Example

### Nodejs usage


```js
const arizona = require('arizonajs');
```

Performing a `GET` request

```js
const arizona = require('arizonajs');

// Make a request for a user with a given ID
arizona.get('https://api.example.com/users')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
arizona.get('https://api.example.com/user', {
    params: {
      id: 56891
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await arizona.get('https://api.example.com/users?id=2645');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

Performing a `POST` request

```js
arizona.post('https://api.example.com/user/create', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

Performing multiple concurrent requests

```js
arizona.all([arizona.get('/user?id=5867'), arizona.get('/user?id=7555')])
  .then(arizona.spread(function (user1, user2) {
    // Both requests are now complete
  }));
```

### Arizona API

Requests can be made using the CDN by passing the relevant config to `arizona`.

##### arizona(config)

```js
// GET request
arizona({
  method: 'get',
  url: 'http://api.test.com/jsonfile?id=354',
})
  .then(function (response) {
    response.data
  });
```

```js
// POST request
arizona({
  method: 'post',
  url: 'http://api.test.com/jsonfile/create',
  data: {
    firstName: 'Rafe',
    lastName: 'McCawaley'
  }
});
```



##### arizona(url[, config])

```js
// Send a GET request (default method)
arizona('https://api.example.com/user?id=12345');
```

## Using application/x-www-form-urlencoded format

By default, arizona serializes JavaScript objects to `JSON`. To send data in the `application/x-www-form-urlencoded` format instead, you can use one of the following options.

### Browser

In a browser, you can use the [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API as follows:

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
arizona.post('/foo', params);
```

> Note that `URLSearchParams` is not supported by all browsers (see [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)), but there is a [polyfill](https://github.com/WebReflection/url-search-params) available (make sure to polyfill the global environment).

Alternatively, you can encode data using the [`qs`](https://github.com/ljharb/qs) library:

```js
const qs = require('qs');
arizona.post('/foo', qs.stringify({ 'bar': 123 }));
```

Or in another way (ES6),

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
arizona(options);
```

### Node.js

In node.js, you can use the [`querystring`](https://nodejs.org/api/querystring.html) module as follows:

```js
const querystring = require('querystring');
arizona.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

You can also use the [`qs`](https://github.com/ljharb/qs) library.

###### NOTE
The `qs` library is preferable if you need to stringify nested objects, as the `querystring` method has known issues with that use case (https://github.com/nodejs/node-v0.x-archive/issues/1665).

## License

[MIT](LICENSE)
