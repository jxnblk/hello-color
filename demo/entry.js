
import hello from '../lib'
import { round, padLeft } from 'lodash'

const body = document.body
const x = document.getElementById('x')
const a = document.getElementById('a')
const b = document.getElementById('b')

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
    adjusted
  } = result

  console.log(color, base)

  body.style.color = color
  body.style.backgroundColor = base
  a.style.color = base
  a.style.backgroundColor = color

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

changeColors()

