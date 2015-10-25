'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = complementary;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function complementary(options) {

  options = options || {};

  options = Object.assign({
    color: '#999',
    saturation: 0,
    lightness: 0.125,
    contrast: 2
  }, options);

  var base = (0, _color2['default'])(options.color);
  var hsl = base.hsl();
  var saturate = hsl.s < 50;
  var light = base.light();
  var dark = base.dark();

  var contrast = 0;
  var swapped = false;
  var maxed = false;
  var adjusted = 0;

  var lighten = !light ? options.lightness : 0;
  var darken = !dark ? options.lightness : 0;

  function getColor(factor) {
    factor = factor || 1;
    return base.clone().negate().saturate(saturate ? options.saturation : 0).desaturate(!saturate ? options.saturation : 0).lighten(factor * lighten).darken(factor * darken).hexString();
  }

  function resolveColor(_x, _x2) {
    var _again = true;

    _function: while (_again) {
      var color = _x,
          factor = _x2;
      _again = false;

      factor = factor || 1.125;
      color = color || getColor();
      contrast = base.contrast((0, _color2['default'])(color));

      var _Color$hsl = (0, _color2['default'])(color).hsl();

      var lightness = _Color$hsl.l;

      if (!swapped && (lightness < 5 || lightness > 95)) {
        lighten = light ? options.lightness : 0;
        darken = dark ? options.lightness : 0;
        factor = 1.125;
        swapped = true;
      } else if (swapped && (lightness < 10 || lightness > 90)) {
        maxed = true;
        return color;
      }

      if (contrast < options.contrast) {
        adjusted++;
        color = getColor(factor);
        _x = color;
        _x2 = factor + .125;
        _again = true;
        _Color$hsl = lightness = undefined;
        continue _function;
      } else {
        return color;
      }
    }
  }

  var color = resolveColor();

  var obj = Object.assign({
    base: base.hexString(),
    light: light,
    dark: dark,
    color: color,
    contrast: contrast,
    adjusted: adjusted
  }, hsl);

  return obj;
}

module.exports = exports['default'];