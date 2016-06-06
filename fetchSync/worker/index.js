'use strict'

/* global self:false, fetch:false, __DEV__:false */

import IDBStore from 'idb-wrapper'
import serialiseRequest from 'serialise-request'
import serialiseResponse from 'serialise-response'

import Channel from '/fetchSync/worker/Channel'
import { SyncTypes } from '/fetchSync/constants'
import { Requests, Responses } from '/fetchSync/actionTypes'

const store = new IDBStore({
  dbVersion: 1,
  keyPath: 'id',
  storeName: __DEV__
    ? '$$syncs_' + Date.now()
    : '$$syncs'
})

const channel = new Channel(self, {
  [Requests.OPEN_COMMS]: (event) => {
    channel.setDefaultPort(event.ports[0])
    return Promise.resolve()
  },
  [Requests.REGISTER_SYNC]: ({ data }) => {
    return registerSync(data.sync)
      .then(() => addSync(data.sync))
  },
  [Requests.CANCEL_SYNC]: ({ data }) => {
    return new Promise(store.remove.bind(store, data.id))
  },
  [Requests.CANCEL_ALL]: () => {
    return new Promise(store.getAll.bind(store))
      .then((syncs) => new Promise(
        store.removeBatch.bind(store, syncs.map((sync) => sync.id))
      ))
  }
})

function registerSync (sync) {
  if (!self.registration[sync.type]) {
    return Promise.reject(new Error(`Background '${sync.type}' not supported`))
  }

  const tag = sync.type === SyncTypes.PERIODIC_SYNC
    ? { ...sync.options, tag: sync.id }
    : sync.id

  return self
    .registration[sync.type]
    .register(tag)
}

function addSync (sync) {
  return new Promise(store.put.bind(store, sync))
    .catch((err) => {
      if (!/key already exists/i.test(err.message)) {
        throw err
      }
    })
}

function syncEvent (event) {
  event.waitUntil(
    new Promise(store.get.bind(store, event.tag))
      .then((sync) => {
        if (!sync) {
          event.registration && event.registration.unregister()
          return
        }

        const id = sync.id
        const lastChance = event.lastChance
        const request = serialiseRequest.deserialise(sync.request)

        return fetch(request)
          .then(serialiseResponse)
          .then((response) => {
            const syncedOn = Date.now()
            store.put({ ...sync, response, syncedOn })
            channel.postMessage({
              type: Responses.SUCCESS,
              data: { id, lastChance, response }
            })
          })
          .catch((err) => {
            store.remove(id)
            channel.postMessage({
              type: Responses.FAILURE,
              data: { error: err.message }
            })
          })
      })
  )
}

// The 'sync' and 'periodicSync' events fire when connectivity
// is restored or already available to the UA.
self.addEventListener(SyncTypes.SYNC, syncEvent)
self.addEventListener(SyncTypes.PERIODIC_SYNC, syncEvent)

// The 'activate' event is fired when the service worker becomes operational.
// For example, after a refresh after install, or after all pages using
// the older version of the worker have closed after upgrade of the worker.
self.addEventListener('activate', function activateEvent (event) {
  event.waitUntil(self.clients.claim())
})

// The 'install' event is fired when the service worker has been installed.
// This does not mean that the service worker is operating, as the UA will wait
// for all pages to close that are using older versions of the worker.
self.addEventListener('install', function installEvent (event) {
  event.waitUntil(self.skipWaiting())
})
