var test = require('tape')
var Store = require('../')

var file = '/tmp/rem-' + Math.random()

test('write first', function (t) {
  t.plan(4)
  var store = Store(5, file)
  store.once('open', function (offset, rem) {
    t.equal(offset, 0)
    t.deepEqual(rem, null)
    var w = store.createWriteStream()
    w.write('abc')
    w.end(function () {
      store.get(0, function (err, buf) {
        t.ifError(err)
        t.deepEqual(buf, new Buffer('abc'))
      })
    })
  })
})

test('write remainder', function (t) {
  t.plan(4)
  var store = Store(5, file)
  store.once('open', function (offset, rem) {
    t.equal(offset, 3)
    t.deepEqual(rem, new Buffer('abc'))
    var w = store.createWriteStream({ start: offset })
    w.write('def')
    w.end(function () {
      store.get(0, function (err, buf) {
        t.ifError(err)
        t.deepEqual(buf, new Buffer('abcde'))
      })
    })
  })
})
