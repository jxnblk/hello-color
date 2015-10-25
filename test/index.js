
import test from 'ava'
import Color from 'color'
import { padLeft } from 'lodash'

import hello from '../lib'

let result = hello({
  color: '#f00'
})

test('returns an object', t => {
  t.is(typeof result, 'object')
  t.end()
})

test('result.light is a boolean', t => {
  t.is(typeof result.light, 'boolean')
  t.end()
})

test('result.dark is a boolean', t => {
  t.is(typeof result.dark, 'boolean')
  t.end()
})

test('result.color is a color', t => {
  t.doesNotThrow(() => {
    Color(result.color)
  })
  t.end()
})

test('result.contrast is a number', t => {
  t.is(typeof result.contrast, 'number')
  t.end()
})

test('result.adjusted is a number', t => {
  t.is(typeof result.adjusted, 'number')
  t.end()
})


const n = Array.from({ length: Math.pow(16, 4) }, (a, i) => i)

function randomHex () {
  let hex = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + padLeft(hex, 6, 0)
}

test(`should pass contrast (Testing ${n.length} random colors)`, t => {
  t.plan(n.length)

  n.forEach((i) => {
    const hex = randomHex()
    // console.log(hex)

    result = hello({
      color: hex,
      lightness: .25,
      contrast: 3
    })

    t.ok(result.contrast >= 3, hex, result.contrast)
  })
})


