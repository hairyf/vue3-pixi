const elementNames = [
  'container',
  'sprite',
  'graphics',
  'text',
  'html-text',
  'bitmap-text',
  'bitmap-text-graphics',
  'split-bitmap-text',
  'tiling-sprite',
  'animated-sprite',
  'mesh',
  'mesh-plane',
  'mesh-simple',
  'nine-slice-sprite',
  'mesh-rope',
  'perspective-mesh',
  'render-layer',
  'graphics-context',
  'split-text',
  'filter',
  'blur-filter',
  'blur-filter-pass',
  'alpha-filter',
  'displacement-filter',
  'color-matrix-filter',
  'mask-filter',
  'noise-filter',
  'particle-container',
  'dom-container',
  'render-container',
]

export const compilerOptions = {
  isCustomElement(name: string) {
    let normalizedName = name.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
    if (normalizedName.startsWith('-'))
      normalizedName = normalizedName.slice(1)

    const isPixiElement = elementNames.includes(normalizedName)
    const isPrefixElement = normalizedName.startsWith(compilerOptions.prefix)
      && elementNames.includes(normalizedName.slice(compilerOptions.prefix.length))

    return isPixiElement || isPrefixElement
  },
  prefix: 'pixi-',
}
