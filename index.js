
import update from 'morphdom'
import h from 'h0'
import bikeshed from '@jxnblk/bikeshed'
import hello from '../src'

const link = h('a')({
  style: {
    color: 'inherit',
    fontWeight: 'bold',
    marginRight: 16
  }
})

const button = h('button')({
  style: {
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 600,
    padding: 8,
    marginRight: 16,
    border: 0,
    borderRadius: 3,
    color: 'inherit',
    backgroundColor: 'rgba(0, 0, 0, .125)',
    WebkitAppearance: 'none',
    appearance: 'none'
  }
})

const pre = h('pre')({
  style: {
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    padding: 16,
  }
})

const label = h('label')({
  style: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px,1px,1px,1px)'
  }
})

const input = h('input')({
  style: {
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
    maxWidth: '100%',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 0,
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none'
  }
})

const Main = ({ style, ...props }) => h('main')({
  ...props,
  style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: 32,
    transitionProperty: 'color, background-color',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '1s, .5s',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    ...style
  }
})

const Title = ({ color, base }) => h('div')({
  style: {
    fontSize: '2vw',
    textTransform: 'uppercase',
    letterSpacing: '.3em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64
  }
})(
  h('h1')({
    style: {
      fontSize: 'calc(2em + 1vw)',
      padding: 32,
      color: base,
      backgroundColor: color,
      transitionProperty: 'color, background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '1s, .5s'
    }
  })('hello'),
  h('h1')({
    style: {
      fontSize: 'calc(2em + 1vw)',
      padding: 32,
    }
  })('color')
)

const ColorRow = ({ color, colors }) => h('div')({
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 64,
    paddingBottom: 64,
    backgroundColor: color
  }
})(
  ...colors.map(color => h('div')({
    style: {
      flex: '1 1 auto',
      padding: 8,
      margin: 16,
      backgroundColor: color,
      transition: 'background-color .5s ease-out'
    }
  })(
    input({
      readonly: true,
      title: 'Click to select color value',
      onclick: e => {
        e.stopPropagation()
        e.target.setSelectionRange(0, e.target.value.length)
      },
      name: color,
      value: color.toLowerCase()
    })()
  ))
)

const Footer = ({ base, color, dark }) => h('footer')({
  style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 14,
    padding: 32,
    color: base,
    backgroundColor: color
  }
})(
  button({
    onclick: e => toggleAutoplay()
  })(timer ? 'Stop' : 'Autoplay'),
  link({
    href: 'https://github.com/jxnblk/hello-color',
  })('GitHub'),
  link({
    href: 'http://jxnblk.com',
  })('Made by Jxnblk')
)

const Root = ({
  color,
  backgroundColor,
  ...props
}) => {
  let level = 'AA Large'
  if (props.contrast > 7) {
    level = 'AA'
  }
  if (props.contrast > 4.5) {
    level = 'AAA'
  }

  const preText = `
    ${Math.round(props.contrast * 100) / 100} contrast
    ${level}
  `.replace(/[\n\s]+/g, ' ').trim()

  return h('div')(
    Main({
      style: {
        color,
        backgroundColor
      },
      onclick: e => render()
    })(
      Title({ color, ...props }),
      label({
        for: 'colors'
      })('Colors'),
      input({
        readonly: true,
        title: 'Click to select color values',
        onclick: e => {
          e.stopPropagation()
          e.target.setSelectionRange(0, e.target.value.length)
        },
        name: 'colors',
        value: `${color.toLowerCase()} : ${backgroundColor.toLowerCase()}`
      })(),
      pre(preText)
    ),
    Footer({ color, ...props }),
    ColorRow({ color, colors: props.scale.slice(0, props.scale.length - 1) }),
    ColorRow({ color, colors: props.hues }),
  )
}

// SVG Data URI image for Twitter card
const getCardImage = ({ color, base }) => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600

  const ctx = canvas.getContext('2d')
  ctx.font = '48px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Hello', 400, 50)

  const img = canvas.toDataURL()

  return img
}

const render = () => {
  const color = params.c ? '#' + params.c : bikeshed()
  const result = hello(color, {
    saturation: 1 / 8,
    contrast: 3,
    hues: 5,
  })
  if (!params.c) {
    history.pushState(null, null, `?c=${color.replace(/#/, '')}`)
  }
  params.c = null
  console.log(
    '%c%s%c%s',
    `padding:4px;color:${result.color};background-color:${result.base}`,
    ' Aa ',
    'color:black',
    ' ' + result.color + ' ' + result.base
  )

  const next = Root({
    backgroundColor: result.base,
    ...result
  })
  const cardimg = getCardImage(result)

  const nextHead = h('head')(
    h('title')(`Hello Color ${color}`),
    h('meta')({
      name: 'viewport',
      content: 'width=device-width,initial-scale=1'
    })(),
    h('style')('*{box-sizing:border-box;}body{margin:0}')
  )

  if (tree) {
    update(tree, next)
    update(head, nextHead)
  } else {
    document.body.appendChild(next)
    document.head.parentNode.replaceChild(nextHead, document.head)
    return {
      tree: next,
      head: nextHead
    }
  }
}

window.addEventListener('popstate', () => {
  const { c } = parseQueryString(window.location.search)
  params.c = c
  render()
})

let timer

const toggleAutoplay = () => {
  if (timer) {
    clearInterval(timer)
  } else {
    timer = setInterval(render, 3000)
    render()
  }
}

const parseQueryString = (str) => {
  return str.replace('?', '').split(/&/)
    .reduce((a, b) => {
      const [ key, value ] = b.split('=')
      a[key] = value
      return a
    }, {})
}

const params = parseQueryString(window.location.search)
const { tree, head } = render()

