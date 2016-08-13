
import chroma from 'chroma-js'

const negate = (color) => {
  const rgb = chroma(color).rgb()
  const neg = rgb.map((val, i) => 255 - val)
  return chroma(neg).hex()
}

const getColor = (base, {
  multiplier = 1,
  lightness,
  saturation,
}) => {
  const neg = negate(base)
  if (multiplier === 1) {
    return neg
  }

  const isDark = chroma.contrast(neg, '#000') < chroma.contrast(neg, '#fff')
  const isDull = chroma(neg).hsl()[1] < .5

  return chroma(neg)
    // .saturate(isDull ? multiplier * saturation : 0)
    // .desaturate(isDull ? 0 : multiplier * saturation)
    .saturate(isDull ? saturation : 0)
    .desaturate(isDull ? 0 : saturation)
    .darken(isDark ? 0 : multiplier * lightness)
    .brighten(isDark ? multiplier * lightness : 0)
    .hex()
}

const resolveColor = base => options => (color, multiplier = 9 / 8) => {
  color = color || getColor(base, {
    ...options,
    multiplier
  })
  const contrast = chroma.contrast(base, color)
  if (contrast > options.minContrast) {
    return color
  }

  const [ h, s, l ] = chroma(color).hsl()

  if ((s === 0 || s === 1) && (l === 0 || l === 1)) {
    console.log('maxed out', color, h, s, l)
    return color
  }

  color = getColor(base, {
    options,
    multiplier
  })
  return resolveColor(base)(options)(color, multiplier + 1/8)

}

const hello = (base, options = {}) => {
  const {
    saturation = 0,    // s shift amount
    lightness = 0.125, // l shift amount
    minContrast = 3    // min contrast
  } = options
  const [ h, s, l ] = chroma(base).hsl()
  const luminance = chroma(base).luminance()
  const cont = {
    white: chroma.contrast(base, '#fff'),
    black: chroma.contrast(base, '#000')
  }
  const isDark = cont.white > cont.black
  const isDull = s < .5

  const color = resolveColor(base)({
    saturation,
    lightness,
    minContrast
  })()

  let maxed = false

  const result = {
    base: chroma(base).hex(),
    h: isNaN(h) ? 0 : h,
    s,
    l,
    luminance,
    dark: isDark,
    light: !isDark,
    cont,

    contrast: chroma.contrast(base, color),

    color
  }

  return result
}

export default hello

