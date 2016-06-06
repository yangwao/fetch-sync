'use strict'

/* global fetch:false, Request:false */

import serialiseRequest from 'serialise-request'

import createSync from '/fetchSync/client/createSync'
import store from '/fetchSync/client/store'
import { registerSync, cancelAllSyncs, openCommsChannel } from '/fetchSync/client/store/requests'
import { SyncTypes } from '/fetchSync/constants'
import { setServiceWorker } from '/fetchSync/client/store/creators'

let hasStartedInit = false
let hasBackgroundSyncSupport = true

function environmentHasSupport () {
  let notSupported = []

  if (!('serviceWorker' in navigator)) {
    notSupported.push('Service Workers')
  }

  if (!('SyncManager' in window)) {
    notSupported.push('Background Sync')
  }

  if (notSupported.length) {
    console.warn(
      `fetchSync: environment does not support ${notSupported.join(', ')}.
      Single sync requests will be forwarded straight to \`fetch\`.
      Periodic sync requests will fail silently!`
    )
  }

  return !notSupported.length
}

function createSyncOperation (type, name, request, options = {}) {
  if (typeof request !== 'string' && !(request instanceof Request)) {
    throw new Error('Expecting URL to be a string or Request')
  } else if (typeof options !== 'object') {
    throw new Error('Expecting options to be an object')
  }

  const realRequest = request instanceof Request
    ? request
    : new Request(request, options)

  return serialiseRequest(realRequest)
    .then((serialisedRequest) => createSync(type, name, serialisedRequest, options))
    .then((sync) => store.dispatch(registerSync(sync)).then(() => sync.public))
}

function resolveSyncArgs (request, options, extra) {
  let realName
  let realRequest = request
  let realOptions = {}

  if (typeof options === 'object' && !(options instanceof Request)) {
    realOptions = options
  }

  if (typeof request === 'string' && (typeof options === 'string' || options instanceof Request)) {
    realRequest = options
    realName = request
    if (typeof extra === 'object') {
      realOptions = extra
    }
  }

  return [realName, realRequest, realOptions]
}

// ---
// Public
// ---

/**
 * Create a 'sync' operation.
 * @param {String|Request} request
 * @param {Object|String} [options]
 * @param {Object} [extra]
 * @returns {Promise}
 */
export default function fetchSync (request, options, extra) {
  const args = resolveSyncArgs(request, options, extra)

  if (!hasBackgroundSyncSupport) {
    return fetch(args[1], args[2])
  }

  return createSyncOperation(SyncTypes.SYNC, ...args)
}

fetchSync.sync = fetchSync

/**
 * Initialise fetchSync.
 * @param {Object} options
 */
fetchSync.init =
function fetchSync_init (options) {
  if (hasStartedInit) {
    throw new Error('fetchSync.init() called multiple times')
  } else if (typeof options !== 'object') {
    throw new Error('Expecting options to be an object')
  } else if (!options.workerUrl) {
    throw new Error('Expecting `workerUrl` in options object')
  }

  if (!environmentHasSupport()) {
    hasBackgroundSyncSupport = false
    return Promise.reject(new Error('Environment not supported'))
  }

  const { commsChannel } = store.getState()

  hasStartedInit = true

  navigator.serviceWorker
    .register(options.workerUrl, options.workerOptions)
    .then((registration) => {
      if (options.forceUpdate) {
        registration.update()
      }
      store.dispatch(setServiceWorker(navigator.serviceWorker.controller))
      store.dispatch(openCommsChannel())
    })
    .catch((err) => {
      console.warn('fetchSync: failed to register the Service Worker')
      throw err
    })

  return commsChannel.promise
}

/**
 * Create a 'periodicSync' operation.
 * @param {String} name
 * @param {String|Request} request
 * @param {Object} [options]
 * @returns {Promise|undefined}
 */
fetchSync.periodicSync =
function fetchSync_periodicSync (name, request, options) {
  if (!hasBackgroundSyncSupport) {
    return
  }

  if (typeof name !== 'string') {
    throw new Error('Expecting name to be a string')
  } else if (typeof request !== 'string' || !(request instanceof Request)) {
    throw new Error('Expecting request to be a string or Request')
  } else if (typeof options !== 'object') {
    throw new Error('Expecting options to be an object')
  }

  return createSyncOperation(SyncTypes.PERIODIC_SYNC, name, request, options)
}

/**
 * Get a sync.
 * @param {String} name
 * @returns {Object|Boolean}
 */
fetchSync.get =
function fetchSync_get (name) {
  const { syncs } = store.getState()
  const ids = Object.keys(syncs)

  for (let i = 0; i < ids.length; i++) {
    const sync = syncs[ids[i]]
    if (sync.name === name) {
      return sync.public
    }
  }

  return false
}

/**
 * Get all named syncs.
 * @returns {Array}
 */
fetchSync.getAll =
function fetchSync_getNames () {
  const { syncs } = store.getState()
  return Object.keys(syncs)
    .filter((sync) => !!sync.name)
}

/**
 * Cancel a sync.
 * @param {Object|String} sync
 * @returns {Promise}
 */
fetchSync.cancel =
function fetchSync_cancel (sync) {
  return fetchSync
    .get(typeof sync === 'object' ? sync.name : sync)
    .then((sync) => sync.cancel())
}

/**
 * Cancel all syncs.
 * @returns {Promise}
 */
fetchSync.cancelAll =
function fetchSync_cancelAll () {
  return store.dispatch(cancelAllSyncs())
}

Object.keys(fetchSync)
  .forEach((methodName) => {
    if (['init', 'register'].indexOf(methodName) === -1) {
      const method = fetchSync[methodName]
      Object.defineProperty(fetchSync, methodName, {
        enumerable: true,
        value: (...args) => {
          if (!hasStartedInit) {
            throw new Error('Initialise fetchSync first by calling fetchSync.init(<options>)')
          }
          const { commsChannel } = store.getState()
          return commsChannel.promise
            .then(() => method(...args))
        }
      })
    }
  })
