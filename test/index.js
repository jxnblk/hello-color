import test from 'ava'
import chroma from 'chroma-js'
import bikeshed from '@jxnblk/bikeshed'

import hello from '../src'

const result = hello('#f00')

test('returns an object', t => {
  t.is(typeof result, 'object')
})

test('result.dark is a boolean', t => {
  t.is(typeof result.dark, 'boolean')
})

test('result.color is a color', t => {
  t.notThrows(() => {
    chroma(result.color)
  })
})

test('result.contrast is a number', t => {
  t.is(typeof result.contrast, 'number')
})

const colors = Array.from({ length: Math.pow(2, 12) }, (a, i) => i)
  .map(i => {
    const hex = bikeshed()
    return hello(hex, {
      lightness: .25,
      contrast: 3
    })
  })

test(`should pass contrast (Testing ${colors.length} random colors)`, t => {
  t.plan(colors.length)

  colors.forEach(({ contrast }) => {
    t.is(contrast >= 3, true)
  })
})
