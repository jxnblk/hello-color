
import hello from '../lib'
import { round, padLeft } from 'lodash'

const body = document.body
const x = document.getElementById('x')
const a = document.getElementById('a')
const b = document.getElementById('b')
const m1 = document.getElementById('m1')
const m2 = document.getElementById('m2')
const m3 = document.getElementById('m3')
const m4 = document.getElementById('m4')
const m5 = document.getElementById('m5')
const m6 = document.getElementById('m6')
const m7 = document.getElementById('m7')
const m8 = document.getElementById('m8')
const d = document.getElementById('d')

const timer = 3000

let id

function randomHex () {
  let hex = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + padLeft(hex, 6, 0)
}

function changeColors () {
  clearInterval(id)
  const threshold = 3
  let result = hello({
    color: randomHex(),
    saturation: .25,
    contrast: threshold,
  })

  const {
    base,
    color,
    contrast,
    light,
    adjusted,
    mix
  } = result

  console.log(color, base)

  body.style.color = color
  body.style.backgroundColor = base
  a.style.color = base
  a.style.backgroundColor = color

  m1.style.backgroundColor = mix[0]
  m2.style.backgroundColor = mix[1]
  m3.style.backgroundColor = mix[2]
  m4.style.backgroundColor = mix[3]
  m5.style.backgroundColor = mix[4]
  m6.style.backgroundColor = mix[5]
  m7.style.backgroundColor = mix[6]
  m8.style.backgroundColor = mix[7]

  id = setInterval(changeColors, timer)
}

body.style.fontFamily = '-apple-system, sans-serif'
body.style.textTransform = 'uppercase'
body.style.letterSpacing = '.3em'
body.style.padding = '32px'
body.style.margin = '0'
body.style.minHeight = '100vh'
body.style.display = 'flex'
body.style.alignItems = 'center'
body.style.justifyContent = 'center'
body.style.flexDirection = 'column'
body.style.transition = 'color .8s ease-out, background-color .4s ease-out'

x.style.display = 'flex'
x.style.alignItems = 'center'
x.style.justifyContent = 'center'
x.style.flexWrap = 'wrap'

a.style.transition = 'color .8s ease-out, background-color .4s ease-out'
a.style.padding = '32px'
b.style.padding = '32px'
m1.style.padding = '16px'
m2.style.padding = '16px'
m3.style.padding = '16px'
m4.style.padding = '16px'
m5.style.padding = '16px'
m6.style.padding = '16px'
m7.style.padding = '16px'
m8.style.padding = '16px'
d.style.padding = '32px'
d.style.backgroundColor = 'rgba(0, 0, 0, .5)'

changeColors()

