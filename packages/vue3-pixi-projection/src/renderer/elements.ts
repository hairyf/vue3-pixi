import {
  Camera3d,
  Container2d,
  Container3d,
  Mesh2d,
  Mesh3d2d,
  SimpleMesh2d,
  SimpleMesh3d2d,
  Sprite2d,
  Sprite2s,
  Sprite3d,
  Text2d,
  Text2s,
  Text3d,
  TilingSprite2d,
} from 'pixi-projection'
import type { Renderer } from '@vue-pixi/renderer'
import { normalizeTexture } from '@vue-pixi/renderer'

export const elements: Renderer['elements'] = {
  Container2d: () => new Container2d(),
  Container3d: () => new Container3d(),

  Sprite2d: props => new Sprite2d(normalizeTexture(props.texture)),
  Sprite3d: props => new Sprite3d(normalizeTexture(props.texture)),
  Sprite2s: props => new Sprite2s(normalizeTexture(props.texture)),

  Camera3d: () => new Camera3d().setPlanes,

  Text2d: props => new Text2d(
    props.text,
    props.style,
    props.canvas,
  ),
  Text2s: props => new Text2s(
    props.text,
    props.style,
    props.canvas,
  ),
  Text3d: props => new Text3d(
    props.text,
    props.style,
    props.canvas,
  ),

  TilingSprite2d: props => new TilingSprite2d(
    normalizeTexture(props.texture),
    props.width,
    props.height,
  ),
  Mesh2d: props => new Mesh2d(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),
  Mesh3d2d: props => new Mesh3d2d(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),

  SimpleMesh2d: props => new SimpleMesh2d(normalizeTexture(props.texture)),
  SimpleMesh3d2d: props => new SimpleMesh3d2d(normalizeTexture(props.texture)),
}
