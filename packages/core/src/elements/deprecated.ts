import { MeshPlane, MeshRope, NineSliceSprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

const warned = new Set<string>()

function deprecationWarning(oldName: string, newName: string) {
  if (warned.has(oldName))
    return
  warned.add(oldName)
  console.warn(
    `[vue3-pixi] <${oldName}> is deprecated and will be removed in a future version. `
    + `Use <${newName}> instead.`,
  )
}

// <nine-slice-plane> -> <nine-slice-sprite>
renderer.use({
  name: 'NineSlicePlane',
  createElement: (props) => {
    deprecationWarning('nine-slice-plane', 'nine-slice-sprite')
    return new NineSliceSprite({
      ...props,
      texture: normalizeTexture(props.texture),
    })
  },
})

// <simple-plane> -> <mesh-plane>
renderer.use({
  name: 'SimplePlane',
  createElement: (props) => {
    deprecationWarning('simple-plane', 'mesh-plane')
    return new MeshPlane({
      ...props,
      texture: normalizeTexture(props.texture),
    })
  },
})

// <simple-rope> -> <mesh-rope>
renderer.use({
  name: 'SimpleRope',
  createElement: (props) => {
    deprecationWarning('simple-rope', 'mesh-rope')
    return new MeshRope({
      ...props,
      texture: normalizeTexture(props.texture),
    })
  },
})
