'use strict'

import defer from 'mini-defer'

import store from '/fetchSync/client/store'
import { SyncTypes, SyncIdPrefix } from '/fetchSync/constants'
import { cancelSync } from '/fetchSync/client/store/requests'

export default function createSync (type, name, request, options = {}) {
  let sync = buildSyncObjectForType(type)

  // Assign private properties
  Object.assign(sync, {
    name,
    type,
    request,
    options,
    id: uId(),
    createdOn: Date.now(),
    syncedOn: null,
    response: null
  })

  // Assign public properties
  Object.assign(sync.public, {
    name,
    type,
    id: sync.id,
    createdOn: sync.createdOn,
    syncedOn: sync.syncedOn
  })

  // Assign public methods
  Object.assign(sync.public, {
    getResponse () {
      return sync.response
    },
    cancel () {
      if (!sync.cancelled) {
        sync.cancelled = true
        return store.dispatch(cancelSync(this))
      }
      return Promise.reject(new Error('Sync already cancelled'))
    },
    toString () {
      const nameString = this.name ? ` name='${this.name}'` : ''
      return `[fetchSync type='${this.type}'${nameString}]`
    }
  })

  return sync
}

function buildSyncObjectForType (type) {
  switch (type) {
    case SyncTypes.SYNC:
      return syncInitialObject()
    case SyncTypes.PERIODIC_SYNC:
      return periodicSyncInitialObject()
    default:
      throw new Error(`Unknown sync type '${type}'`)
  }
}

function syncInitialObject () {
  const deferred = defer()
  const sync = {
    promise: deferred.promise,
    public: deferred.promise
  }

  return Object.assign(sync, {
    resolve: deferred.resolve,
    reject: deferred.reject
  })
}

function periodicSyncInitialObject () {
  const sync = {
    __onHandlers: [],
    public: {}
  }

  return Object.assign(sync.public, {
    on (event, handler) {
      sync.__onHandlers.push({ event, handler })
    },
    trigger (event, data) {
      sync.__onHandlers.forEach(({ type, handler }) => {
        if (type === event) {
          handler(data)
        }
      })
    }
  })
}

function uId () {
  const { syncs } = store.getState()
  let name = SyncIdPrefix + Date.now()
  while (name in syncs) name = name + 1
  return name
}
