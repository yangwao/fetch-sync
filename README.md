# Fetch Sync

> A handy wrapper for the [Background Sync API](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/fetch-sync"><img alt="npm version" src="https://badge.fury.io/js/fetch-sync.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fetch Sync allows you to proxy fetch requests through the Background Sync API so that they are honoured if made when the UA is offline! Hooray!

Check out a [live demo here](https://sdgluck.github.io/fetch-sync/).

## Install

    npm install fetch-sync --save

## Table of Contents

- [Requirements](#requirements)
- [Support](#support)
- __[Features](#features)__
- __[Initialisation](#initialisation)__
- __[Usage](#usage)__
- __[Sync API](#sync-api)__
- [Todo](#todo)
- [Test](#test)
- [Development](#development)
- [Contributing](#contributing)
- [Author & License](author--license)

## Requirements

The library utilises some new technologies so currently only works in some browsers. It definitely works in
[Chrome Canary](https://www.google.co.uk/chrome/browser/canary.html)
with the `experimental-web-platform-features` flag enabled.

The browser must support:

- [Background Sync](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Promise] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Support

Chrome Canary | Chrome | Firefox | IE | Opera | Safari
:------------:|:------:|:-------:|:--:|:-----:|:-----:
✔             |✔      |✘       |✘   |✘     |✘

## Features

- Register a Background Sync operation with one call to `fetchSync()`.

- Shares exactly the same API as `fetch`. Accepts a Request or String, and returns the Promise of a Response.

- Manage sync operations with `fetchSync.{get,getAll,cancel,cancelAll}()`.

- Named sync operations have their response stored within an IndexedDB store.

## Initialise

__Existing Service Worker__

If your application already uses a Service Worker, you can import the Fetch Sync worker using `importScripts`:

    importScripts('node_modules/fetch-sync/dist/fetch-sync.sw.min.js')

And then call `fetchSync.init()` somewhere in your application's initialisation procedure.

__No Service Worker__

Fetch Sync can handle registration if you don't use a SW already...

Either serve the Fetch Sync worker file with a header `"Service-Worker-Allowed : /"`, or to avoid configuring headers,
create a Service Worker script in the root of your project and use the method above for 'Existing Service Worker'.

Then see the example under [Usage](#usage) for the `fetchSync.init()` method.

## Usage

### `fetchSync.init([options]) : Promise`

Initialise fetchSync.

- __options__ {Object} _(optional)_ options object

        options {
          // The URL of the fetchSync worker script.
          workerUrl {String} (required, default: null)

          // The options object to pass to the worker registration function.
          workerOptions {Object} (optional, default: null)

          // Force the worker registration to update the worker script.
          forceUpdate {Boolean} (optional, default: false)
        }

Example:

        // Import client lib...

        // ES6
        import fetchSync from 'fetch-sync'

        // ES5
        var fetchSync = require('fetch-sync')

        // Script, using bundled dist
        <script src="/node_modules/fetch-sync/dist/fetch-sync.min.js"></script>

        // Initialise, passing in worker lib location...

        fetchSync.init({
          workerUrl: 'node_modules/fetch-sync/dist/fetch-sync.sw.js',
          workerOptions: {
            scope: '<website address>' // e.g. 'http://localhost:8000'
          }
        })

### `fetchSync([name, ]request[, options]) : Promise<Response>`

Perform a [`sync`](https://github.com/WICG/BackgroundSync/blob/master/explainer.md#one-off-synchronization) Background Sync operation.

- [__name__] {String} _(optional)_ name of the sync operation
- __request__ {String|Request} URL or an instance of fetch Request
- [__options__] {Object} _(optional)_ [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) object

Returns a Promise that resolves on success of the fetch request.

If called with a `name` the response will be stored and can be retrieved later using `fetchSync.get(<name>)` and then
`sync.getResponse()`. See the [Sync API](#sync-api) for more details.

Examples:

- named GET

        fetchSync('GetMessages', '/messages')

- unnamed POST

        fetchSync('/update-profile', {
          method: 'POST',
          body: { name: '' }
        })

- named with options

        fetchSync('/send-message', {
          body: 'Hello!'
        })

- unnamed with Request

        fetchSync(
          new Request('/messages')
        )

### `fetchSync.get(name) : Promise`

Get a sync by its name.

- __name__ {String} name of the sync operation to get

Returns the Promise that resolves with success of the sync operation.

There are some properties/methods on the returned Promise. See the [Sync API](#sync-api) for more details.

### `fetchSync.getAll() : Array<Promise>`

Get all sync operations.

Returns an array of all sync operations (named and unnamed).

### `fetchSync.cancel(name) : Promise`

Cancel the sync with the given `name`.

- __name__ {String} name of the sync operation to cancel

### `fetchSync.cancelAll() : Promise`

Cancel all syncs, named and unnamed.

## Sync API

### `sync.cancel() : Promise`

Cancels the sync operation.

Returns a Promise of success of the cancellation.

### `sync.getResponse() : Response`

Response retrieved when the operation was completed. Or null if the operation is incomplete.

### `sync.id`

The unique ID of the sync operation. This will be its name if it has one.

### `sync.name`

The name of the sync operation if it has one.

### `sync.createdOn`

The time that the sync operation was created.

### `sync.syncedOn`

The time that the sync operation was completed.

Useful for named syncs that you want to retrieve later on.

## Todo

- [WIP] Add support for periodicSync operations.
(See the outdated [`periodic-sync-support` branch](https://github.com/sdgluck/fetch-sync/tree/periodic-sync-support).)
- Reduce size of client and SW bundles.

## Test

As the library depends on Service Workers and no headless browser has (good enough) support for Service Workers
that would allow tests to be executed within the console, tests are ran through the browser using
[Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).

On running `npm test` an Express server will be started at `localhost:8000`.

Run the tests:

    $ cd fetch-sync
    $ npm test

## Development

The library is bundled by [Webpack](https://github.com/webpack/webpack)
and transpiled by [Babel](https://github.com/babel/babel).

- Install dependencies: `npm install`
- Start Webpack in a console: `npm run watch`
- Start the test server in another: `npm test`
- Navigate to `http://localhost:8000`

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`fetch-sync` was created by [Sam Gluck](https://twitter.com/sdgluck) and is released under the MIT license.
