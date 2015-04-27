tabletop-clearcoat
==================

Tiny footprint, proxy server for [tabletop](https://github.com/jsoma/tabletop) that caches responses from Google sheet API.

Google imposes rate limits on API calls. Using this proxy server will reduce the number of calls directly hitting Google and thus keeping your application within the bounds of rate limits.

Pretty easy to use
------------------

Just add ```endpoint``` property to [```Tabletop.init()```](https://github.com/jsoma/tabletop#tabletop-initialization) configuration and set it to 'http://your-server-domain-name/sheets'.

```js
// Routing via proxy
Tabletop.init({key: "keytopublicgooglesheet",
              endpoint: 'http://your-server-domain-name/sheets',
              callback: function(a) {
                var jsonPretty = JSON.stringify(a, null, '\t');
                $("#tt").text(jsonPretty);
              },
              simpleSheet: true
            });
```

Setup
-----

1. Download (& unzip) or clone this repo.
2. Run `npm install` to install dependent libraries.
3. Run `npm start` to run the server.
4. Add `endpoint` property on client code as described above.

Default cache time is 1 minute/60000ms. Change this, via environment variable - `TTL`.

eg. `TTL=120000 npm start`

License
-----

[MIT](LICENSE)
