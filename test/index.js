
import test from 'ava'
import Color from 'color'
import bikeshed from '@jxnblk/bikeshed'

import hello from '../lib'
import nextHello from '../src'

let result = hello({
  color: '#f00'
})

const nextResult = nextHello('#f00', {})
console.log(result)
console.log(nextResult)

test('returns an object', t => {
  t.is(typeof result, 'object')
})

test('result.light is a boolean', t => {
  t.is(typeof result.light, 'boolean')
})

test('result.dark is a boolean', t => {
  t.is(typeof result.dark, 'boolean')
})

test('result.color is a color', t => {
  t.notThrows(() => {
    Color(result.color)
  })
})

test('result.contrast is a number', t => {
  t.is(typeof result.contrast, 'number')
})

test('result.adjusted is a number', t => {
  t.is(typeof result.adjusted, 'number')
})


const n = Array.from({ length: Math.pow(2, 8) }, (a, i) => i)

test(`should pass contrast (Testing ${n.length} random colors)`, t => {
  t.plan(n.length)

  n.forEach((i) => {
    const hex = bikeshed()
    // console.log(hex)

    result = hello({
      color: hex,
      lightness: .25,
      contrast: 3
    })

    t.is(result.contrast >= 3, true, hex, result.contrast)
  })
})


