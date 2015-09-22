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
