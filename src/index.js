
import chroma from 'chroma-js'

const negate = (color) => {
  const rgb = chroma(color).rgb()
  const neg = rgb.map((val, i) => 255 - val)
  return chroma(neg).hex()
}

const getColor = (base, {
  multiplier,
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
    .saturate(isDull ? multiplier * saturation : 0)
    .desaturate(isDull ? 0 : multiplier * saturation)
    .darken(isDark ? 0 : multiplier * lightness)
    .brighten(isDark ? multiplier * lightness : 0)
    .hex()
}

const resolveColor = base => options => (color, multiplier = 17 / 16) => {
  color = color || getColor(base, {
    ...options,
    multiplier
  })

  const contrast = chroma.contrast(base, color)

  if (contrast > options.contrast) {
    return color
  }

  const [ h, s, l ] = chroma(color).hsl()

  if ((s === 0 || s === 1) && (l === 0 || l === 1)) {
    return resolveColor(base)(options)(null, -18/16)
  }

  color = getColor(base, {
    ...options,
    multiplier
  })

  const isNegative = multiplier < 0
  const mult = multiplier + (1/16 * (isNegative ? -1 : 1))

  return resolveColor(base)(options)(color, mult)
}

const rotate = base => deg => {
  const [ h, s, l ] = chroma(base).hsl()
  return chroma(h + deg, s, l, 'hsl').hex()
}

const getHues = base => length => {
  const hues = []
  for (let i = 0; i < length; i++) {
    const deg = (360 / (length + 1)) * (i + 1)
    const hex = rotate(base)(deg)
    hues.push(hex)
  }

  return hues
}

const hello = (base, options = {}) => {
  const {
    saturation = 0,    // s shift amount
    lightness = 1 / 16, // l shift amount
    contrast = 3,      // min contrast
    hues = 3
  } = options

  try {
    chroma(base)
  } catch (e) {
    return null
  }

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
    contrast
  })()

  let maxed = false

  const result = {
    base: chroma(base).hex(),
    color,
    contrast: chroma.contrast(base, color),
    dark: isDark,
    scale: chroma.scale([base, color]).colors(8),
    hues: getHues(base)(hues)
  }

  return result
}

export default hello

