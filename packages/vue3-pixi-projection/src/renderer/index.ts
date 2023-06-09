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
import type { Renderer, RendererOptions } from 'vue3-pixi'
import { normalizeTexture, setSkipFirstValue } from 'vue3-pixi'
import { isUndefined } from '@antfu/utils'
import { patchProp } from './patchProp'

const Container2dRenderer: RendererOptions = {
  name: 'Container2d',
  createElement: () => new Container2d(),
  patchProp,
}
const Container3dRenderer: RendererOptions = {
  name: 'Container3d',
  createElement: () => new Container3d(),
  patchProp,
}

const Sprite2dRenderer: RendererOptions = {
  name: 'Sprite2d',
  createElement: props => new Sprite2d(normalizeTexture(props.texture)),
  patchProp,
}
const Sprite3dRenderer: RendererOptions = {
  name: 'Sprite3d',
  createElement: props => new Sprite3d(normalizeTexture(props.texture)),
  patchProp,
}

const Sprite2sRenderer: RendererOptions = {
  name: 'Sprite2s',
  createElement: props => new Sprite2s(normalizeTexture(props.texture)),
  patchProp,
}

const Camera3dRenderer: RendererOptions = {
  name: 'Camera3d',
  createElement: (props) => {
    const camera = new Camera3d()
    if (!isUndefined(props.focus)) {
      camera.setPlanes(
        props.focus,
        props.near,
        props.far,
        props.orthographic,
      )
    }
    return camera
  },
  patchProp: (el, key, prevValue, nextValue) => {
    const planeKeys = ['focus', 'near', 'far', 'orthographic']
    function setPlanes(config: any) {
      el.setPlanes(
        config.focus || el._focus,
        config.near || el.near,
        config.far || el.far,
        config.orthographic || el._orthographic,
      )
    }
    if (planeKeys.includes(key))
      return setSkipFirstValue(el, key, () => setPlanes({ [key]: nextValue }))
    patchProp(el, key, prevValue, nextValue)
  },
}

const Text2dRenderer: RendererOptions = {
  name: 'Text2d',
  createElement: props => new Text2d(
    props.text,
    props.style,
    props.canvas,
  ),
  patchProp,
}

const Text2sRenderer: RendererOptions = {
  name: 'Text2s',
  createElement: props => new Text2s(
    props.text,
    props.style,
    props.canvas,
  ),
  patchProp,
}

const Text3dRenderer: RendererOptions = {
  name: 'Text3d',
  createElement: props => new Text3d(
    props.text,
    props.style,
    props.canvas,
  ),
  patchProp,
}

const TilingSprite2dRenderer: RendererOptions = {
  name: 'TilingSprite2d',
  createElement: props => new TilingSprite2d(
    normalizeTexture(props.texture),
    props.width,
    props.height,
  ),
  patchProp,
}

const Mesh2dRenderer: RendererOptions = {
  name: 'Mesh2d',
  createElement: props => new Mesh2d(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),
  patchProp,
}

const Mesh3d2dRenderer: RendererOptions = {
  name: 'Mesh3d2d',
  createElement: props => new Mesh3d2d(
    props.geometry,
    props.shader,
    props.state,
    props.drawMode,
  ),
  patchProp,
}

const SimpleMesh2dRenderer: RendererOptions = {
  name: 'SimpleMesh2d',
  createElement: props => new SimpleMesh2d(normalizeTexture(props.texture)),
  patchProp,
}

const SimpleMesh3d2dRenderer: RendererOptions = {
  name: 'SimpleMesh3d2d',
  createElement: props => new SimpleMesh3d2d(normalizeTexture(props.texture)),
  patchProp,
}

export const ProjectionRenderer: Renderer = [
  Container2dRenderer,
  Container3dRenderer,
  Sprite2dRenderer,
  Sprite3dRenderer,
  Sprite2sRenderer,
  Camera3dRenderer,
  Text2dRenderer,
  Text2sRenderer,
  Text3dRenderer,
  TilingSprite2dRenderer,
  Mesh2dRenderer,
  Mesh3d2dRenderer,
  SimpleMesh2dRenderer,
  SimpleMesh3d2dRenderer,
]
