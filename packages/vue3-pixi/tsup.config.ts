import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
  ],
  external: ['vue-demi', 'vue', '@vue/runtime-core'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}
