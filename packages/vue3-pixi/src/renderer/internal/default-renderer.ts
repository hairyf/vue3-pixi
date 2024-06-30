import {
  AlphaFilter,
  AnimatedSprite,
  BitmapText,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  DisplacementFilter,
  Graphics,
  Mesh,
  NineSliceSprite,
  NoiseFilter,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'
import { patchProp as defuPatchProp, patchBooleanProp } from '../patchProp'
import { normalizeTexture } from '../utils'
import { setObjectProperty, setPropertyValue, setSkipFirstValue } from './setter'
import type { Renderer, RendererOptions } from './types'

const ContainerRender: RendererOptions = {
  name: 'Container',
  createElement: () => new Container(),
}

const SpriteRender: RendererOptions = {
  name: 'Sprite',
  createElement: props => new Sprite(normalizeTexture(props.texture)),
  remove(node: Sprite) {
    node.destroy()
  },
}

const GraphicsRender: RendererOptions = {
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
}

const TextRender: RendererOptions = {
  name: 'Text',
  createElement: props => new Text({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: Text, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        setSkipFirstValue(el, key, () => setObjectProperty(el, key, prev, next))
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const BitmapTextRender: RendererOptions = {
  name: 'BitmapText',
  createElement: props => new BitmapText({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: BitmapText, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        break
      case 'dirty':
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const TilingSpriteRender: RendererOptions = {
  name: 'TilingSprite',
  createElement: props => new TilingSprite(
    normalizeTexture(props!.texture),
    props.width,
    props.height,
  ),
  patchProp(el: TilingSprite, key, prev, next) {
    switch (key) {
      case 'width':
      case 'height':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'uvRespectAnchor':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const AnimatedSpriteRender: RendererOptions = {
  name: 'AnimatedSprite',
  createElement: (props) => {
    return new AnimatedSprite(
      props.textures.map(normalizeTexture),
      props['auto-update'] || props.autoUpdate,
    )
  },
  patchProp(el: AnimatedSprite, key, prev, next) {
    switch (key) {
      case 'textures':
        setSkipFirstValue(el, key, () => {
          el.textures = next.map(normalizeTexture)
          el.loop && el.gotoAndPlay(0)
        })
        break
      case 'playing':
        const isPlaying = (next === '') || !!next
        setPropertyValue(el, key, () => isPlaying ? el.play() : el.stop())
        break
      case 'gotoAndPlay':
        setPropertyValue(el, key, () => el.gotoAndPlay(next))
        break
      case 'loop':
      case 'updateAnchor':
        patchBooleanProp(el, key, prev, next)
        break
      case 'onComplete':
      case 'onFrameChange':
      case 'onLoop':
        Reflect.set(el, key, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const MeshRender: RendererOptions = {
  name: 'Mesh',
  createElement: props => new Mesh({
    geometry: props.geometry,
    shader: props.shader,
    state: props.state,
    roundPixels: props.roundPixels,
  }),
  patchProp(el: Mesh, key, prev, next) {
    switch (key) {
      case 'geometry':
      case 'shader':
      case 'state':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const NineSliceSpriteRender: RendererOptions = {
  name: 'NineSliceSprite',
  createElement: props => new NineSliceSprite(
    normalizeTexture(props.texture),
  ),
  patchProp(el: NineSliceSprite, key, prev, next) {
    switch (key) {
      case 'roundPixels':
      case 'autoResize':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const SimplePlaneRender: RendererOptions = {
  name: 'SimplePlane',
  createElement: (props) => {
    return new SimplePlane(
      normalizeTexture(props.texture),
      props.width,
      props.height,
    )
  },
}

const SimpleRopeRender: RendererOptions = {
  name: 'SimpleRope',
  createElement: (props) => {
    return new SimpleRope(
      normalizeTexture(props.texture),
      props.points,
    )
  },
  patchProp(el: NineSliceSprite, key, prev, next) {
    switch (key) {
      case 'texture':
      case 'points':
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const BlurFilterRender: RendererOptions = {
  name: 'BlurFilter',
  createElement: props => new BlurFilter(
    props.blur,
    props.quality,
    props.resolution,
  ),
}

const AlphaFilterRender: RendererOptions = {
  name: 'AlphaFilter',
  createElement: props => new AlphaFilter(props.alpha),
}

const DisplacementFilterRender: RendererOptions = {
  name: 'DisplacementFilter',
  createElement: props => new DisplacementFilter(
    props.sprite,
    props.scale,
  ),
  patchProp(el: DisplacementFilter, key, prev, next) {
    switch (key) {
      case 'sprite':
      case 'scale':
        setSkipFirstValue(el, key, () => el.scale = next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

const ColorMatrixFilterRender: RendererOptions = {
  name: 'ColorMatrixFilter',
  createElement: () => new ColorMatrixFilter(),
}

const NoiseFilterRender: RendererOptions = {
  name: 'NoiseFilter',
  createElement: props => new NoiseFilter(
    props.noise,
    props.seed,
  ),
  patchProp(el: NoiseFilter, key, prev, next) {
    switch (key) {
      case 'noise':
      case 'seed':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      default:
        defuPatchProp(el, key, prev, next)
    }
  },
}

export const defaultRenderer: Renderer = [
  ContainerRender,
  SpriteRender,
  GraphicsRender,
  TextRender,
  BitmapTextRender,
  TilingSpriteRender,
  AnimatedSpriteRender,
  MeshRender,
  NineSliceSpriteRender,
  SimplePlaneRender,
  SimpleRopeRender,
  BlurFilterRender,
  AlphaFilterRender,
  DisplacementFilterRender,
  ColorMatrixFilterRender,
  NoiseFilterRender,
]
