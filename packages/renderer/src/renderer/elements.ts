import { normalizeTexture } from './utils'
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
  SimpleMesh,
  SimplePlane,
  SimpleRope,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'

export type PixiCustomElement = (props: (VNodeProps & { [key: string]: any })) => any

export const elements: Record<string, PixiCustomElement> = {
  Container: () => new Container(),
  Sprite: props => new Sprite(normalizeTexture(props!.texture)),
  SimpleMesh: () => new SimpleMesh(),
  Graphics: props => new Graphics(props?.geometry),
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
  AnimatedSprite: props => new AnimatedSprite(
    props.textures,
    props.autoUpdate,
  ),
  Mesh: props => new Mesh(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),
  NineSlicePlane: props => new NineSlicePlane(
    normalizeTexture(props.texture),
  ),
  SimplePlane: props => new SimplePlane(
    normalizeTexture(props.texture),
    props.verticesX,
    props.verticesY,
  ),
  SimpleRope: props => new SimpleRope(
    normalizeTexture(props.texture),
    props.points,
    props.textureScale,
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

