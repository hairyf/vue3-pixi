import { Sprite } from 'pixi.js'

export class Empty extends Sprite {
  render() {}
  visible = false
  renderable = false
  _vp_empty = true
}
