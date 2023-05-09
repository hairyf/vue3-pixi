import '@vue/runtime-core'
import type { PixiSimpleRopeComponent } from './elements/simpleRope'
import type { PixiSimplePlaneComponent } from './elements/simplePlane'
import type { PixiNineSlicePlaneComponent } from './elements/nineSlicePlane'
import type { PixiMeshComponent } from './elements/mesh'
import type { PixiAnimatedSpriteComponent } from './elements/animatedSprite'
import type { PixiTilingSpriteComponent } from './elements/tilingSprite'
import type { PixiTextComponent } from './elements/text'
import type { PixiGraphicsComponent } from './elements/graphics'
import type { PixiContainerComponent } from './elements/container'
import type { PixiSpriteComponent } from './elements/sprite'
import type { PixiBitmapTextComponent } from './elements/bitmapText'
import type { PixiFilterComponent } from './elements/filter'
import type { PixiBlurFilterComponent } from './elements/blurFilter'
import type { PixiAlphaFilterComponent } from './elements/alphaFilter'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Filter: PixiFilterComponent
    PixiFilter: PixiFilterComponent

    BlurFilter: PixiBlurFilterComponent
    PixiBlurFilter: PixiBlurFilterComponent

    AlphaFilter: PixiAlphaFilterComponent
    PixiAlphaFilter: PixiAlphaFilterComponent

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
