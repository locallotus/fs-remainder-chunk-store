# fs-remainder-chunk-store

implement a [chunk store](https://github.com/mafintosh/abstract-chunk-store)
over a single file descriptor with sloppy byte boundary streaming and remainders

This module is useful for streaming append-only non-chunked data into a chunk
store and resuming where the stream left off.

# example

``` js
var Store = require('fs-remainder-chunk-store')

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
```

# api

``` js
var Store = require('fs-remainder-chunk-store')
```

## var store = Store(size, path)
## var store = Store(size, opts)

Create a store with chunks `size` bytes long at `opts.path`.

## store.on('open', function (size, rem) {})

When the underlying file descriptor is opened, `'open'` fires with the size of
the file `size` and `rem`, a buffer of left-over contents from the end of the
file that doesn't align to the chunk length.

## store.get(i, opts={}, cb)

Get the chunk at index `i` as `cb(err, buf)`.

## store.put(i, buf, opts={}, cb)

Put the chunk in `buf` at chunk offset `i`.

## store.getBytes(i, j, opts={}, cb)

Read data from the file at byte offset `i` through `j` as `cb(err, buf)`.

## store.putBytes(i, buf, opts={}, cb)

Put the chunk in `buf` at byte offset `i`.

## var w = store.createWriteStream(opts)

Create a writable stream `w` that puts bytes directly into the file starting at
`opts.start` or `0`.

## store.destroy()

Close the underlying file descriptor.

# install

```
npm install fs-remainder-chunk-store
```

# license

MIT
