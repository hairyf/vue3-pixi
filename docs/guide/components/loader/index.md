# Loader

Preloads the assets (textures, audio, etc) used by your components.
It contains two slots, `fallback` and the default. The default slot will not
render until the Loader has finished.

You can show progress by using the `progress` prop from the `fallback` slot.

<demo src="./demo/basic.vue" />