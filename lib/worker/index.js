'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  'use strict';

  /* global self:false, require:false, fetch:false, __DEV__:false */

  var _ref3;

  var IDBStore = require('idb-wrapper');
  var serialiseRequest = require('serialise-request');
  var serialiseResponse = require('serialise-response');

  var Channel = require('./Channel');

  var _require = require('../actionTypes');

  var Requests = _require.Requests;
  var Responses = _require.Responses;


  var store = new IDBStore({
    dbVersion: 1,
    keyPath: 'id',
    storeName: __DEV__ ? '$$syncs_' + Date.now() : '$$syncs'
  });

  var channel = new Channel(self, (_ref3 = {}, _defineProperty(_ref3, Requests.OPEN_COMMS, function (event) {
    channel.setDefaultPort(event.ports[0]);
    return Promise.resolve();
  }), _defineProperty(_ref3, Requests.REGISTER_SYNC, function (_ref) {
    var data = _ref.data;

    return registerSync(data.sync).then(function () {
      return addSync(data.sync);
    });
  }), _defineProperty(_ref3, Requests.CANCEL_SYNC, function (_ref2) {
    var data = _ref2.data;

    return new Promise(store.remove.bind(store, data.id));
  }), _defineProperty(_ref3, Requests.CANCEL_ALL, function () {
    return new Promise(store.getAll.bind(store)).then(function (syncs) {
      return new Promise(store.removeBatch.bind(store, syncs.map(function (sync) {
        return sync.id;
      })));
    });
  }), _ref3));

  function registerSync(sync) {
    return self.registration['sync'].register(sync.id);
  }

  function addSync(sync) {
    return new Promise(store.put.bind(store, sync)).catch(function (err) {
      if (!/key already exists/i.test(err.message)) {
        throw err;
      }
    });
  }

  function syncEvent(event) {
    event.waitUntil(new Promise(store.get.bind(store, event.tag)).then(function (sync) {
      if (!sync) {
        event.registration && event.registration.unregister();
        return;
      }

      var id = sync.id;
      var lastChance = event.lastChance;
      var request = serialiseRequest.deserialise(sync.request);

      return fetch(request).then(serialiseResponse).then(function (response) {
        var syncedOn = Date.now();
        store.put(_extends({}, sync, { response: response, syncedOn: syncedOn }));
        channel.postMessage({
          type: Responses.SUCCESS,
          data: { id: id, lastChance: lastChance, response: response }
        });
      }).catch(function (err) {
        store.remove(id);
        channel.postMessage({
          type: Responses.FAILURE,
          data: { error: err.message }
        });
      });
    }));
  }

  // The 'sync' event fires when connectivity is restored or already available to the UA.
  self.addEventListener('sync', syncEvent);

  // The 'activate' event is fired when the service worker becomes operational.
  // For example, after a refresh after install, or after all pages using
  // the older version of the worker have closed after upgrade of the worker.
  self.addEventListener('activate', function activateEvent(event) {
    event.waitUntil(self.clients.claim());
  });

  // The 'install' event is fired when the service worker has been installed.
  // This does not mean that the service worker is operating, as the UA will wait
  // for all pages to close that are using older versions of the worker.
  self.addEventListener('install', function installEvent(event) {
    event.waitUntil(self.skipWaiting());
  });
})();