import type { VNodeProps } from 'vue-demi'
import {
  AlphaFilter,
  AnimatedSprite,
  BitmapText,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  DisplacementFilter,
  FXAAFilter,
  Graphics,
  Mesh,
  NineSlicePlane,
  NoiseFilter,
  ParticleContainer,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'
import { normalizeTexture } from '../utils'

export type CustomElement = (props: (VNodeProps & { [key: string]: any })) => any

export const elements: Record<string, CustomElement> = {
  Container: () => new Container(),
  ParticleContainer: props => new ParticleContainer(
    props['max-size'] || props.maxSize,
    props.properties,
  ),
  Sprite: props => new Sprite(normalizeTexture(props.texture)),
  SimpleMesh: props => new SimpleMesh(normalizeTexture(props.texture)),
  Graphics: props => new Graphics(props.geometry),
  Text: props => new Text(
    props.text,
    props.style,
    props.canvas,
  ),
  BitmapText: props => new BitmapText(
    props.text,
    props.style,
  ),
  TilingSprite: props => new TilingSprite(
    normalizeTexture(props!.texture),
    props.width,
    props.height,
  ),
  AnimatedSprite: (props) => {
    return new AnimatedSprite(
      props.textures,
      props['auto-update'] || props.autoUpdate,
    )
  },
  Mesh: props => new Mesh(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),
  NineSlicePlane: props => new NineSlicePlane(
    normalizeTexture(props.texture),
  ),
  SimplePlane: (props) => {
    return new SimplePlane(
      normalizeTexture(props.texture),
      props['vertices-x'] || props.verticesX,
      props['vertices-y'] || props.verticesY,
    )
  },
  SimpleRope: props => new SimpleRope(
    normalizeTexture(props.texture),
    props.points,
    props['texture-scale'] || props.textureScale,
  ),
  BlurFilter: props => new BlurFilter(
    props.strength,
    props.quality,
    props.resolution,
    props.kernelSize,
  ),
  AlphaFilter: props => new AlphaFilter(props.alpha),
  DisplacementFilter: props => new DisplacementFilter(
    props.sprite,
    props.scale,
  ),
  ColorMatrixFilter: () => new ColorMatrixFilter(),
  NoiseFilter: props => new NoiseFilter(
    props.noise,
    props.seed,
  ),
  FXAAFilter: () => new FXAAFilter(),
}

