# svg.pathmod.js

A plugin for the [svgdotjs.github.io](https://svgdotjs.github.io/) library to modify SVG paths.
The core of this plugin is based on [simplify-js](https://github.com/mourner/simplify-js) (c) 2017, Vladimir Agafonkin

# Get Started

```sh
npm install svg.pathmod.js
```

# Usage

If you don't see image below look at this page on https://janmisker.github.io/svg.pathmod.js/, because inline SVG might be disabled.

Quickest to just show it. First image is a path with **133 points**, for example drawn by user. Second image is the simplified version of that path.

```javascript
var svg = SVG().addTo('#drawing').size(100,100)
var path = svg.path(....) // create a path
```
<svg width="100" height="100">
  <path fill="none" stroke-width="3" stroke="#FF0000" d="M13 29L13 28L13 27L15 25L16 24L17 22L18 21L19 21L19 20L20 20L20 19L21 19L21 19L22 18L22 17L22 17L23 17L23 17L24 17L25 17L25 16L26 16L27 16L28 16L29 16L30 16L31 16L32 16L32 16L33 16L34 16L34 16L35 16L35 17L35 18L36 18L37 19L37 20L38 21L38 22L39 24L39 26L40 27L40 29L40 33L40 35L40 37L40 39L40 42L40 44L40 46L39 48L38 50L38 52L37 54L37 55L36 58L36 59L35 62L34 63L34 64L34 66L34 67L34 67L34 67L34 68L34 68L34 68L35 68L36 68L38 68L38 68L40 68L41 68L42 68L43 68L44 68L45 68L46 68L47 68L47 67L48 67L48 66L49 65L50 63L51 62L52 61L53 59L54 58L55 57L55 56L56 54L57 54L57 53L58 52L58 52L58 51L59 50L60 50L60 49L60 48L61 47L62 47L62 46L63 46L63 46L63 45L64 45L64 45L64 45L64 44L64 44L65 44L65 44L65 44L65 44L65 44L66 44L66 44L66 43L66 43L67 43L67 43L67 43L67 43L68 43L68 43L68 43L68 42L68 42L69 42L69 42L69 42 "></path>
</svg>

```javascript
path.simplify(1, true)
```

<svg width="100" height="100">
  <path fill="none" stroke-width="3" stroke="#FF0000" d="M13 29L13 27L22 17L35 16L35 18L37 19L40 27L40 46L34 63L34 68L47 68L58 51L60 50L60 48L64 44L69 42 "></path>
</svg>

The simplified version has only **16 points**, making it much more lightweight, and it also looks better. There are of course parameters, for example using a tolerance of 5 and not employing the radial distance algorithm this is the result:

```javascript
path.simplify(5, false)
```
<svg width="100" height="100">
  <path fill="none" stroke-width="3" stroke="#FF0000" d="M13 29L25 17L38 22L35 68L47 68L69 42 "></path>
</svg>
This results in a path consisting of just 6 points. Of course it depends on your use case what is an acceptable simplification. 

## Destructive modification
Do note that the path is modified in place, if you need to keep hold of the existing path make sure to clone it first.

# Licence

svg.pathmod.js is licensed under the terms of the MIT License.

## Dependencies
This module requires svg.js >= v3.0.12
