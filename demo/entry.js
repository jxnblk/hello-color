
import hello from '../lib'
import { round, padLeft } from 'lodash'

const body = document.body

const timer = 3000

function randomHex () {
  let hex = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + padLeft(hex, 6, 0)
}

function changeColors () {
  const threshold = 4
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

  console.log(color, base, contrast, mix)

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

  pre.textContent = `${color.toLowerCase()} : ${base.toLowerCase()}`
  cont.textContent = contrast

}

body.style.fontFamily = '-apple-system, sans-serif'
body.style.padding = '32px'
body.style.margin = '0'
body.style.minHeight = '100vh'
body.style.display = 'flex'
body.style.alignItems = 'center'
body.style.justifyContent = 'center'
body.style.flexDirection = 'column'
body.style.transition = 'color .8s ease-out, background-color .4s ease-out'
body.style.cursor = 'pointer'

x.style.fontSize = '2vw'
x.style.textTransform = 'uppercase'
x.style.letterSpacing = '.3em'
x.style.display = 'flex'
x.style.alignItems = 'center'
x.style.justifyContent = 'center'
x.style.flexWrap = 'wrap'

a.style.transition = 'color .8s ease-out, background-color .4s ease-out'
a.style.padding = '32px'
b.style.padding = '32px'
m.style.display = 'flex'
m1.style.padding = '16px'
m2.style.padding = '16px'
m3.style.padding = '16px'
m4.style.padding = '16px'
m5.style.padding = '16px'
m6.style.padding = '16px'
m7.style.padding = '16px'
m8.style.padding = '16px'
pre.style.fontFamily = 'Menlo, monospace'
pre.style.fontSize = '14px'
pre.style.padding = '32px'
cont.style.fontFamily = 'Menlo, monospace'
cont.style.fontSize = '14px'

changeColors()

body.addEventListener('click', changeColors)

pre.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(e.target)
  selection.addRange(range)
})
