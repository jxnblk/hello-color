
import Color from 'color'

export default function complementary (options) {

  options = options || {}

  options = Object.assign({
    color: '#999',
    saturation: 0,
    lightness: 0.125,
    contrast: 2,
  }, options)

  const base = Color(options.color)
  const hsl = base.hsl()
  const saturate = hsl.s < 50
  const light = base.light()
  const dark = base.dark()

  let contrast = 0
  let swapped = false
  let maxed = false
  let adjusted = 0

  let lighten = !light ? options.lightness : 0
  let darken = !dark ? options.lightness : 0

  function getColor (factor) {
    factor = factor || 1
    return base
      .clone()
      .negate()
      .saturate(saturate ? options.saturation : 0)
      .desaturate(!saturate ? options.saturation : 0)
      .lighten(factor * lighten)
      .darken(factor * darken)
      .hexString()
  }

  function resolveColor (color, factor) {
    factor = factor || 1.125
    color = color || getColor()
    contrast = base.contrast(Color(color))

    const { l: lightness } = Color(color).hsl()

    if (!swapped && (lightness < 5 || lightness > 95)) {
      lighten = light ? options.lightness : 0
      darken = dark ? options.lightness : 0
      factor = 1.125
      swapped = true
    } else if (swapped && (lightness < 10 || lightness > 90)) {
      maxed = true
      return color
    }

    if (contrast < options.contrast) {
      adjusted++
      color = getColor(factor)
      return resolveColor(color, factor + .125)
    } else {
      return color
    }
  }

  const color = resolveColor()

  const obj = Object.assign({
    base: base.hexString(),
    light,
    dark,
    color,
    contrast,
    adjusted
  }, hsl)

  return obj

}

