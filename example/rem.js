var Store = require('../')

var store = Store(5, './whatever')
store.once('open', function (offset, rem) {
  var w = store.createWriteStream()
  w.write('abcdefg')
  w.end(function () {
    store.get(0, function (err, buf) {
      console.log('CHUNK ZERO: ' + buf)
    })
  })
})
