const elementNames = [
  'container',
  'sprite',
  'graphics',
  'text',
  'bitmap-text',
  'tiling-sprite',
  'animated-sprite',
  'mesh',
  'simple-plane',
  'nine-slice-sprite',
  'mesh-rope',

  'filter',
  'blur-filter',
  'alpha-filter',
  'displacement-filter',
  'color-matrix-filter',
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
