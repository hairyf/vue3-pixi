Translation:

# Application

Creates a [Application](https://pixijs.download/release/docs/PIXI.Application.html).

Creates a Pixi application where all Pixi elements and composite functions need to be inside the application to work properly.

<demo src="./demo/basic.vue" :app="false" />

## Getting Instance Externally

You can obtain the Application instance by binding a ref externally, but it is generally recommended to use `useApplication` internally.

<demo src="./demo/render.vue" :app="false" />