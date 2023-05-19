import type { Container2dComponent } from './elements/container2d'
import type { Container3dComponent } from './elements/container3d'
import type { Sprite2dComponent } from './elements/sprite2d'
import type { Sprite3dComponent } from './elements/sprite3d'
import type { Sprite2sComponent } from './elements/sprite2s'
import type { Camera3dComponent } from './elements/camera3d'
import type { Text2dComponent } from './elements/text2d'
import type { Text2sComponent } from './elements/text2s'
import type { Text3dComponent } from './elements/text3d'
import type { TilingSprite2dComponent } from './elements/tilingSprite2d'
import type { Mesh2dComponent } from './elements/mesh2d'
import type { Mesh3d2dComponent } from './elements/mesh3d2d'
import type { SimpleMesh2dComponent } from './elements/simpleMesh2d'
import type { SimpleMesh3d2dComponent } from './elements/simpleMesh3d2d'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container2d: Container2dComponent
    PixiContainer2d: Container2dComponent

    Container3d: Container3dComponent
    PixiContainer3d: Container3dComponent

    Sprite2d: Sprite2dComponent
    PixiSprite2d: Sprite2dComponent

    Sprite3d: Sprite3dComponent
    PixiSprite3d: Sprite3dComponent

    Sprite2s: Sprite2sComponent
    PixiSprite2s: Sprite2sComponent

    Camera3d: Camera3dComponent
    PixiCamera3d: Camera3dComponent

    Text2d: Text2dComponent
    PixiText2d: Text2dComponent

    Text2s: Text2sComponent
    PixiText2s: Text2sComponent

    Text3d: Text3dComponent
    PixiText3d: Text3dComponent

    TilingSprite2d: TilingSprite2dComponent
    PixiTilingSprite2d: TilingSprite2dComponent

    Mesh2d: Mesh2dComponent
    PixiMesh2d: Mesh2dComponent

    Mesh3d2d: Mesh3d2dComponent
    PixiMesh3d2d: Mesh3d2dComponent

    SimpleMesh2d: SimpleMesh2dComponent
    PixiSimpleMesh2d: SimpleMesh2dComponent

    SimpleMesh3d2d: SimpleMesh3d2dComponent
    PixiSimpleMesh3d2d: SimpleMesh3d2dComponent
  }
}

export type {
  Container2dComponent,
  Container3dComponent,
  Sprite2dComponent,
  Sprite3dComponent,
  Sprite2sComponent,
  Camera3dComponent,
  Text2dComponent,
  Text2sComponent,
  Text3dComponent,
  TilingSprite2dComponent,
  Mesh2dComponent,
  Mesh3d2dComponent,
  SimpleMesh2dComponent,
  SimpleMesh3d2dComponent,
}
