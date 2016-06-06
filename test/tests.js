'use strict'

var assert = chai.assert
var expect = chai.expect

var startTime = Date.now()

describe('fetchSync', function () {
  this.timeout(2 * 1000)

  before(function () {
    if (!('fetch' in window)) {
      throw new Error('Fetch not supported')
    } else if (!('serviceWorker' in navigator)) {
      throw new Error('Service Workers not supported')
    } else if (!('serviceWorker' in navigator && 'SyncManager' in window)) {
      throw new Error('Background Sync not supported')
    }

    return fetchSync
      .getAll()
      .then((sync) => Promise.all(sync.map((sync) => {
        if (sync.createdOn < startTime) {
          return fetchSync.cancel(sync)
        }
      })))
  })

  describe('#sync', function () {
    it('should throw without a first argument', function () {
      return catchAndMatch(fetchSync.sync, /expecting URL to be/i)
    })

    describe('-> GET with String URL', function () {
      var sync = fetchSync.sync('/get/1')

      it('should return a Promise', function () {
        expect(sync).to.be.an.instanceof(Promise)
      })

      it('should GET /get', function () {
        return sync
          .then(function (response) {
            return response.json()
          })
          .then(function (json) {
            assert.equal(1, json.test)
          })
        })
      })

      describe('-> GET with Request URL', function () {
        var sync = fetchSync.sync(new Request('/get/2'))

        it('should return a Promise', function () {
          expect(sync).to.be.an.instanceof(Promise)
        })

        it('should GET /get', function () {
          return sync
            .then(function (response) {
              return response.json()
            })
            .then(function (json) {
              assert.equal(2, json.test)
            })
        })
      })

      describe('-> GET with name and String URL', function () {
        var sync = fetchSync.sync('MyFirstNamedSync', new Request('/get/3'))

        it('should return a Promise', function () {
          expect(sync).to.be.an.instanceof(Promise)
        })

        it('should GET /get', function () {
          return sync
            .then(function (response) {
              return response.json()
            })
            .then(function (json) {
              assert.equal(3, json.test)
            })
        })
      })

      describe('-> POST with String URL', function () {
        var sync = fetchSync.sync('/post/4', { method: 'POST' })

        it('should return a Promise', function () {
          expect(sync).to.be.an.instanceof(Promise)
        })

        it('should POST /post', function () {
          return sync
            .then(function (response) {
              return response.json()
            })
            .then(function (json) {
              assert.equal(4, json.test)
            })
        })
      })
  })

  // TODO test periodicSync when it becomes available
  xdescribe('#periodicSync', function () {})

  describe('#get', function () {
    fetchSync.sync('MySecondNamedSync', '/get/5')

    it('should retrieve result for named "MySecondNamedSync" operation', function () {
      return fetchSync
        .get('MySecondNamedSync')
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          assert.equal(5, json.test)
        })
    })

    it('should throw an Error when trying to read the response for "MySecondNamedSync" again', function () {
      return fetchSync
        .get('MySecondNamedSync')
        .then(function (response) {
          return response.json()
        })
        .catch(function (err) {
          if (err.message !== 'Already read') {
            throw err
          }
        })
    })
  })

  describe('#cancelAll', function () {
    it('should cancel all sync operations', function () {
      return fetchSync
        .cancelAll()
        .then(fetchSync.getAll)
        .then(function (syncs) {
          assert.equal(0, syncs.length)
        })
    })
  })
})
