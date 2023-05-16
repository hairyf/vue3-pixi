declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Filter: import('@vue-pixi/renderer').FilterComponent
    PixiFilter: import('@vue-pixi/renderer').FilterComponent
    BlurFilter: import('@vue-pixi/renderer').BlurFilterComponent
    PixiBlurFilter: import('@vue-pixi/renderer').BlurFilterComponent
    AlphaFilter: import('@vue-pixi/renderer').AlphaFilterComponent
    PixiAlphaFilter: import('@vue-pixi/renderer').AlphaFilterComponent
    DisplacementFilter: import('@vue-pixi/renderer').DisplacementFilterComponent
    PixiDisplacementFilter: import('@vue-pixi/renderer').DisplacementFilterComponent
    ColorMatrixFilter: import('@vue-pixi/renderer').ColorMatrixFilterComponent
    PixiColorMatrixFilter: import('@vue-pixi/renderer').ColorMatrixFilterComponent
    FXAAFilter: import('@vue-pixi/renderer').FXAAFilterComponent
    PixiFXAAFilter: import('@vue-pixi/renderer').FXAAFilterComponent
    Container: import('@vue-pixi/renderer').ContainerComponent
    PixiContainer: import('@vue-pixi/renderer').ContainerComponent
    Sprite: import('@vue-pixi/renderer').SpriteComponent
    PixiSprite: import('@vue-pixi/renderer').SpriteComponent
    Graphics: import('@vue-pixi/renderer').GraphicsComponent
    PixiGraphics: import('@vue-pixi/renderer').GraphicsComponent
    Text: import('@vue-pixi/renderer').TextComponent
    PixiText: import('@vue-pixi/renderer').TextComponent
    BitmapText: import('@vue-pixi/renderer').BitmapTextComponent
    PixiBitmapText: import('@vue-pixi/renderer').BitmapTextComponent
    TilingSprite: import('@vue-pixi/renderer').TilingSpriteComponent
    PixiTilingSprite: import('@vue-pixi/renderer').TilingSpriteComponent
    AnimatedSprite: import('@vue-pixi/renderer').AnimatedSpriteComponent
    PixiAnimatedSprite: import('@vue-pixi/renderer').AnimatedSpriteComponent
    Mesh: import('@vue-pixi/renderer').MeshComponent
    PixiMesh: import('@vue-pixi/renderer').MeshComponent
    SimplePlane: import('@vue-pixi/renderer').SimplePlaneComponent
    PixiSimplePlane: import('@vue-pixi/renderer').SimplePlaneComponent
    NineSlicePlane: import('@vue-pixi/renderer').NineSlicePlaneComponent
    PixiNineSlicePlane: import('@vue-pixi/renderer').NineSlicePlaneComponent
    SimpleRope: import('@vue-pixi/renderer').SimpleRopeComponent
    PixiSimpleRope: import('@vue-pixi/renderer').SimpleRopeComponent
  }
}

export {}