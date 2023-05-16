import '@vue/runtime-core'
import type { SimpleRopeComponent } from './elements/simpleRope'
import type { SimplePlaneComponent } from './elements/simplePlane'
import type { NineSlicePlaneComponent } from './elements/nineSlicePlane'
import type { MeshComponent } from './elements/mesh'
import type { AnimatedSpriteComponent } from './elements/animatedSprite'
import type { TilingSpriteComponent } from './elements/tilingSprite'
import type { TextComponent } from './elements/text'
import type { GraphicsComponent } from './elements/graphics'
import type { ContainerComponent } from './elements/container'
import type { SpriteComponent } from './elements/sprite'
import type { BitmapTextComponent } from './elements/bitmapText'
import type { FilterComponent } from './elements/filter'
import type { BlurFilterComponent } from './elements/blurFilter'
import type { AlphaFilterComponent } from './elements/alphaFilter'
import type { DisplacementFilterComponent } from './elements/displacementFilter'
import type { ColorMatrixFilterComponent } from './elements/colorMatrixFilter'
import type { FXAAFilterComponent } from './elements/FXAAFilter'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Filter: FilterComponent
    PixiFilter: FilterComponent

    BlurFilter: BlurFilterComponent
    PixiBlurFilter: BlurFilterComponent

    AlphaFilter: AlphaFilterComponent
    PixiAlphaFilter: AlphaFilterComponent

    DisplacementFilter: DisplacementFilterComponent
    PixiDisplacementFilter: DisplacementFilterComponent

    ColorMatrixFilter: ColorMatrixFilterComponent
    PixiColorMatrixFilter: ColorMatrixFilterComponent

    FXAAFilter: FXAAFilterComponent
    PixiFXAAFilter: FXAAFilterComponent

    Container: ContainerComponent
    PixiContainer: ContainerComponent

    Sprite: SpriteComponent
    PixiSprite: SpriteComponent

    Graphics: GraphicsComponent
    PixiGraphics: GraphicsComponent

    Text: TextComponent
    PixiText: TextComponent

    BitmapText: BitmapTextComponent
    PixiBitmapText: BitmapTextComponent

    TilingSprite: TilingSpriteComponent
    PixiTilingSprite: TilingSpriteComponent

    AnimatedSprite: AnimatedSpriteComponent
    PixiAnimatedSprite: AnimatedSpriteComponent

    Mesh: MeshComponent
    PixiMesh: MeshComponent

    SimplePlane: SimplePlaneComponent
    PixiSimplePlane: SimplePlaneComponent

    NineSlicePlane: NineSlicePlaneComponent
    PixiNineSlicePlane: NineSlicePlaneComponent

    SimpleRope: SimpleRopeComponent
    PixiSimpleRope: SimpleRopeComponent
  }
}

export type {
  SimplePlaneComponent,
  SimpleRopeComponent,
  NineSlicePlaneComponent,
  MeshComponent,
  AnimatedSpriteComponent,
  TilingSpriteComponent,
  TextComponent,
  GraphicsComponent,
  ContainerComponent,
  SpriteComponent,
  BitmapTextComponent,
  FilterComponent,
  BlurFilterComponent,
  AlphaFilterComponent,
  DisplacementFilterComponent,
  ColorMatrixFilterComponent,
  FXAAFilterComponent,
}
