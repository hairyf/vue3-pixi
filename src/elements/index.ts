import type { PixiSimpleRopeComponent } from './simpleRope'
import type { PixiSimplePlaneComponent } from './simplePlane'
import type { PixiNineSlicePlaneComponent } from './nineSlicePlane'
import type { PixiMeshComponent } from './mesh'
import type { PixiAnimatedSpriteComponent } from './animatedSprite'
import type { PixiTilingSpriteComponent } from './tilingSprite'
import type { PixiTextComponent } from './text'
import type { PixiGraphicsComponent } from './graphics'
import type { PixiContainerComponent } from './container'
import type { PixiSpriteComponent } from './sprite'
import type { PixiBitmapTextComponent } from './bitmapText'

import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: PixiContainerComponent
    PixiContainer: PixiContainerComponent

    Sprite: PixiSpriteComponent
    PixiSprite: PixiSpriteComponent

    Graphics: PixiGraphicsComponent
    PixiGraphics: PixiGraphicsComponent

    Text: PixiTextComponent
    PixiText: PixiTextComponent

    BitmapText: PixiBitmapTextComponent
    PixiBitmapText: PixiBitmapTextComponent

    TilingSprite: PixiTilingSpriteComponent
    PixiTilingSprite: PixiTilingSpriteComponent

    AnimatedSprite: PixiAnimatedSpriteComponent
    PixiAnimatedSprite: PixiAnimatedSpriteComponent

    Mesh: PixiMeshComponent
    PixiMesh: PixiMeshComponent

    SimplePlane: PixiSimplePlaneComponent
    PixiSimplePlane: PixiSimplePlaneComponent

    NineSlicePlane: PixiNineSlicePlaneComponent
    PixiNineSlicePlane: PixiNineSlicePlaneComponent

    SimpleRope: PixiSimpleRopeComponent
    PixiSimpleRope: PixiSimpleRopeComponent
  }
}

export {}
