var test = require('tape')
var Store = require('../')

test('write stream', function (t) {
  t.plan(2)
  var store = Store(5, { path: '/tmp/rem-' + Math.random() })
  var w = store.createWriteStream()
  w.write('abc')
  w.write('def')
  w.end(function () {
    store.get(0, function (err, buf) {
      t.ifError(err)
      t.deepEqual(buf, new Buffer('abcde'))
    })
  })
})
