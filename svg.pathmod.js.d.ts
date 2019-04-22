import { Path } from '@svgdotjs/svg.js'

declare module "@svgdotjs/svg.js" {
  interface Path {
    simplify(tolerance: number, highestQuality: boolean): this
  }
}
