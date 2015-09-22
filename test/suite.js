var t = require('tape')
var tests = require('abstract-chunk-store/tests')
var Store = require('../')

var path = require('path')

tests(t, function (n) {
  return new Store(n, {
    path: '/tmp/rem-test-' + Math.random()
  })
})
