import { AlphaFilter, AnimatedSprite, BlurFilter, ColorMatrixFilter, Container, DisplacementFilter, FXAAFilter, Graphics, Mesh, NineSlicePlane, NoiseFilter, ParticleContainer, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, TilingSprite } from 'pixi.js'
import { normalizeTexture } from 'vue3-pixi'
import type { Renderer } from './types'

export const defaultRenderer: Renderer = [
  {
    name: 'Container',
    createElement: () => new Container(),
  },
  {
    name: 'ParticleContainer',
    createElement: props => new ParticleContainer(
      props['max-size'] || props.maxSize,
      props.properties,
    ),
  },
  {
    name: 'Sprite',
    createElement: props => new Sprite(normalizeTexture(props.texture)),
  },
  {
    name: 'SimpleMesh',
    createElement: props => new SimpleMesh(normalizeTexture(props.texture)),
  },
  {
    name: 'Graphics',
    createElement: props => new Graphics(props.geometry),
  },
  {
    name: 'Text',
    createElement: props => new Text(
      props.text,
      props.style,
      props.canvas,
    ),
  },
  {
    name: 'TilingSprite',
    createElement: props => new TilingSprite(
      normalizeTexture(props!.texture),
      props.width,
      props.height,
    ),
  },
  {
    name: 'AnimatedSprite',
    createElement: (props) => {
      return new AnimatedSprite(
        props.textures.map(normalizeTexture),
        props['auto-update'] || props.autoUpdate,
      )
    },
  },
  {
    name: 'Mesh',
    createElement: props => new Mesh(
      props.geometry,
      props.shader,
      props.state,
      props.drawMode,
    ),
  },
  {
    name: 'NineSlicePlane',
    createElement: props => new NineSlicePlane(
      normalizeTexture(props.texture),
    ),
  },
  {
    name: 'SimplePlane',
    createElement: (props) => {
      return new SimplePlane(
        normalizeTexture(props.texture),
        props.width,
        props.height,
      )
    },
  },
  {
    name: 'SimpleRope',
    createElement: (props) => {
      return new SimpleRope(
        normalizeTexture(props.texture),
        props.points,
      )
    },
  },
  {
    name: 'BlurFilter',
    createElement: props => new BlurFilter(
      props.blur,
      props.quality,
      props.resolution,
    ),
  },
  {
    name: 'AlphaFilter',
    createElement: props => new AlphaFilter(props.alpha),
  },
  {
    name: 'DisplacementFilter',
    createElement: props => new DisplacementFilter(
      props.sprite,
      props.scale,
    ),
  },
  {
    name: 'ColorMatrixFilter',
    createElement: () => new ColorMatrixFilter(),
  },
  {
    name: 'ColorMatrixFilter',
    createElement: props => new NoiseFilter(
      props.noise,
      props.seed,
    ),
  },
  {
    name: 'FXAAFilter',
    createElement: () => new FXAAFilter(),
  },
]
