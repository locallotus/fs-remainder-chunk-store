var test = require('tape')
var Store = require('../')

var file = '/tmp/rem-' + Math.random()

test('error after destroy', function (t) {
  t.plan(3)
  var store = Store(5, file)
  store.once('open', function (offset, rem) {
    t.equal(offset, 0)
    t.deepEqual(rem, null)
    var w = store.createWriteStream()
    w.write('abc')
    w.end(function () {
      store.destroy()
      store.getBytes(0, 3, function (err, buf) {
        t.ok(err)
      })
    })
  })
})

test('eat result', function (t) {
  t.plan(2)
  var store = Store(5, file)
  store.once('open', function (offset, rem) {
    t.equal(offset, 3)
    t.deepEqual(rem, new Buffer('abc'))
    var w = store.createWriteStream()
    w.write('abc')
    w.end(function () {
      store.getBytes(0, 3)
    })
  })
})
