import type { DefaultTheme } from 'vitepress'
import unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { compilerOptions } from '../../packages/core'
import { mdPlugin } from './plugin'

const themeConfig: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    // { text: 'Home', link: '/' },
    {
      text: 'Docs',
      items: [
        { text: 'Quick Start', link: '/guide/quick-start' },
        { text: 'Usage', link: '/guide/usage' },
        // { text: 'Nuxtjs', link: '/guide/nuxtjs' },
        { text: 'Migration v7', link: '/guide/migration' },
        { text: 'API Reference', link: '/guide/api-reference/renderer' },
        { text: 'Elements', link: '/guide/elements/animated-sprite' },
        { text: 'Components', link: '/guide/components/application' },
        { text: 'Composition API', link: '/guide/composition-api/on-tick' },
      ],
    },
    {
      text: 'Examples',
      items: [
        { text: 'Animated Sprite', link: '/examples/animated-sprite/animation' },
        { text: 'App', link: '/examples/app/transparent-background' },
        { text: 'Container', link: '/examples/container/blend-modes_comparison' },
        { text: 'Assets', link: '/examples/assets/async' },
        { text: 'Dom Container', link: '/examples/dom-container/html_text-area' },
        { text: 'Events', link: '/examples/events/buttons' },
        { text: 'Filters', link: '/examples/filters/blur' },
        { text: 'Graphics', link: '/examples/graphics/basic_shapes' },
        { text: 'Gsap', link: '/examples/gsap/animation_basic' },
        { text: 'Mesh', link: '/examples/mesh/custom_color_attributes' },
        { text: 'Misc', link: '/examples/misc/physics_aabb' },
        { text: 'Nine Slice Sprite', link: '/examples/nine-slice-sprite/basic' },
        { text: 'Offscreen Canvas', link: '/examples/offscreen-canvas/basic' },
        { text: 'Particle Container', link: '/examples/particle-container/basic' },
        { text: 'Rendering', link: '/examples/rendering/render_group' },
        { text: 'Sprite', link: '/examples/sprite/gif_animation_loading' },
        { text: 'Text', link: '/examples/text/bitmap_split_text' },
        { text: 'Three', link: '/examples/three/basic_integration' },
        { text: 'Tiling Sprite', link: '/examples/tiling-sprite/transform_animation' },
      ],
    },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Usage', link: '/guide/usage' },
          // { text: 'Nuxtjs', link: '/guide/nuxtjs' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Renderer',
            link: '/guide/api-reference/renderer',
          },
          {
            text: 'Props',
            link: '/guide/api-reference/props',
          },

          {
            text: 'Events',
            link: '/guide/api-reference/events',
          },
        ],
      },
      {
        text: 'Elements',
        items: [
          { text: 'AnimatedSprite', link: '/guide/elements/animated-sprite' },
          { text: 'BitmapText', link: '/guide/elements/bitmap-text' },
          { text: 'Container', link: '/guide/elements/container' },
          { text: 'Graphics', link: '/guide/elements/graphics' },
          { text: 'Mesh', link: '/guide/elements/mesh' },
          // { text: 'NineSlicePlane', link: '/guide/elements/nine-slice-plane' },
          // { text: 'ParticleContainer', link: '/guide/elements/particle-container' },
          // { text: 'SimplePlane', link: '/guide/elements/simple-plane' },
          { text: 'MeshRope', link: '/guide/elements/mesh-rope' },
          { text: 'Sprite', link: '/guide/elements/sprite' },
          { text: 'Text', link: '/guide/elements/text' },
          { text: 'TilingSprite', link: '/guide/elements/tiling-sprite' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Application', link: '/guide/components/application' },
          { text: 'Transition', link: '/guide/components/transition' },
          { text: 'Assets', link: '/guide/components/assets' },
          { text: 'External', link: '/guide/components/external' },
        ],
      },
      {
        text: 'Composition API',
        items: [
          { text: 'onTick', link: '/guide/composition-api/on-tick' },
          { text: 'useApplication', link: '/guide/composition-api/use-application' },
          { text: 'useRenderer', link: '/guide/composition-api/use-renderer' },
          { text: 'useStage', link: '/guide/composition-api/use-stage' },
          { text: 'useScreen', link: '/guide/composition-api/use-screen' },
          { text: 'useTrack', link: '/guide/composition-api/use-track' },
        ],
      },
    ],
    '/examples/': [
      {
        text: 'Animated Sprite',
        collapsed: true,
        items: [
          { text: 'Animation', link: '/examples/animated-sprite/animation' },
          { text: 'Particles', link: '/examples/animated-sprite/particles' },
          { text: 'Spritesheet', link: '/examples/animated-sprite/spritesheet' },
        ],
      },
      {
        text: 'App',
        collapsed: true,
        items: [
          { text: 'Transparent Background', link: '/examples/app/transparent-background' },
        ],
      },
      {
        text: 'Container',
        collapsed: true,
        items: [
          { text: 'Blend modes / Comparison', link: '/examples/container/blend-modes_comparison' },
          { text: 'Cache as texture / Optimization', link: '/examples/container/cache-as-texture_optimization' },
          { text: 'Inverse Mask', link: '/examples/container/inverse-mask' },
          { text: 'Mask Filters Blur', link: '/examples/container/mask_filters_blur' },
          { text: 'Tinting', link: '/examples/container/tinting' },
          { text: 'Transform / Origin', link: '/examples/container/transform_origin' },
          { text: 'Transform / Pivot / Basic', link: '/examples/container/transform_pivot_basic' },
        ],
      },
      {
        text: 'Assets',
        collapsed: true,
        items: [
          { text: 'Async', link: '/examples/assets/async' },
          { text: 'Background Loading', link: '/examples/assets/background-loading' },
          { text: 'Manifest Bundles', link: '/examples/assets/manifest_bundles' },
          { text: 'Multi Loading', link: '/examples/assets/multi-loading' },
        ],
      },
      {
        text: 'Dom Container',
        collapsed: true,
        items: [
          { text: 'HTML Text Area', link: '/examples/dom-container/html_text-area' },
        ],
      },
      {
        text: 'Events',
        collapsed: true,
        items: [
          { text: 'Buttons', link: '/examples/events/buttons' },
          { text: 'Click', link: '/examples/events/click' },
          { text: 'Custom Hitarea', link: '/examples/events/custom-hitarea' },
          { text: 'Custom Pointer', link: '/examples/events/custom-pointer' },
          { text: 'Dragging', link: '/examples/events/dragging' },
          { text: 'Move', link: '/examples/events/move' },
          { text: 'Order', link: '/examples/events/order' },
          { text: 'Slider', link: '/examples/events/slider' },
        ],
      },
      {
        text: 'Filters',
        collapsed: true,
        items: [
          { text: 'Blur', link: '/examples/filters/blur' },
          { text: 'Color Matrix', link: '/examples/filters/color-matrix' },
          { text: 'Custom shader / Glsl', link: '/examples/filters/custom-shader_glsl' },
          { text: 'Custom / Interactive / Blending', link: '/examples/filters/custom_interactive_blending' },
          { text: 'Displacement', link: '/examples/filters/displacement' },
          { text: 'Displacement / Interactive', link: '/examples/filters/displacement_interactive' },
        ],
      },
      {
        text: 'Graphics',
        collapsed: true,
        items: [
          { text: 'Basic Shapes', link: '/examples/graphics/basic_shapes' },
          { text: 'Curves / Arcs / Holes / Textures', link: '/examples/graphics/curves_arcs_holes_textures' },
          { text: 'Dynamic', link: '/examples/graphics/dynamic' },
          { text: 'Fill / Stroke / Gradient', link: '/examples/graphics/fill_stroke_gradient' },
          { text: 'Mask / Animation', link: '/examples/graphics/mask_animation' },
          { text: 'Pixel Line / Antialiasing', link: '/examples/graphics/pixel-line_antialiasing' },
          { text: 'SVG File', link: '/examples/graphics/svg_file' },
          { text: 'SVG String / Parsing', link: '/examples/graphics/svg_string-parsing' },
          { text: 'Texture Fill', link: '/examples/graphics/texture-fill' },
        ],
      },
      {
        text: 'Gsap',
        collapsed: true,
        items: [
          { text: 'Animation / Basic', link: '/examples/gsap/animation_basic' },
          { text: 'Animation / Confetti', link: '/examples/gsap/animation_confetti' },
          { text: 'Animation / Keyframe', link: '/examples/gsap/animation_keyframe' },
          { text: 'Animation / Physics / Particles', link: '/examples/gsap/animation_physics_particles' },
          { text: 'Animation / Timeline', link: '/examples/gsap/animation_timeline' },
          { text: 'Interaction / Inertia', link: '/examples/gsap/interaction_inertia' },
          { text: 'Interaction / MoveTo', link: '/examples/gsap/interaction_moveto' },
          { text: 'Physics', link: '/examples/gsap/physics' },
        ],
      },
      {
        text: 'Mesh',
        collapsed: true,
        items: [
          { text: 'Custom / Color / Attributes', link: '/examples/mesh/custom_color_attributes' },
          { text: 'Custom / Instanced / Geometry', link: '/examples/mesh/custom_instanced_geometry' },
          { text: 'Custom / Shader / Geometry', link: '/examples/mesh/custom_shader_geometry' },
          { text: 'Custom / Texture / Uv', link: '/examples/mesh/custom_texture_uv' },
          { text: 'Mouse Trail', link: '/examples/mesh/mouse_trail' },
          { text: 'Multipass / Shader / Effects', link: '/examples/mesh/multipass_shader_effects' },
          { text: 'Perspective / 3d', link: '/examples/mesh/perspective_3d' },
          { text: 'Plane', link: '/examples/mesh/plane' },
          { text: 'Rope / Texture / Vertices', link: '/examples/mesh/rope_texture_vertices' },
          { text: 'Rope / Textured', link: '/examples/mesh/rope_textured' },
          { text: 'Shader Toy', link: '/examples/mesh/shader_toy' },
          { text: 'Shared Geometry', link: '/examples/mesh/shared_geometry' },
          { text: 'Shared Shader', link: '/examples/mesh/shared_shader' },
        ],
      },
      {
        text: 'Misc',
        collapsed: true,
        items: [
          { text: 'Physics / Aabb', link: '/examples/misc/physics_aabb' },
          { text: 'Screen Shot', link: '/examples/misc/screen_shot' },
          { text: 'Slots', link: '/examples/misc/slots' },
          { text: 'Spinners', link: '/examples/misc/spinners' },
          { text: 'Star Warp', link: '/examples/misc/star_warp' },
        ],
      },
      {
        text: 'Nine Slice Sprite',
        collapsed: true,
        items: [
          { text: 'Basic', link: '/examples/nine-slice-sprite/basic' },
          { text: 'Transform / Anchor', link: '/examples/nine-slice-sprite/transform_anchor' },
        ],
      },
      {
        text: 'Offscreen Canvas',
        collapsed: true,
        items: [
          { text: 'Basic', link: '/examples/offscreen-canvas/basic' },
        ],
      },
      {
        text: 'Particle Container',
        collapsed: true,
        items: [
          { text: 'Basic', link: '/examples/particle-container/basic' },
        ],
      },
      {
        text: 'Rendering',
        collapsed: true,
        items: [
          { text: 'Render Group', link: '/examples/rendering/render_group' },
          { text: 'Render Layer', link: '/examples/rendering/render_layer' },
          { text: 'Render Texture / Basic', link: '/examples/rendering/render_texture_basic' },
          { text: 'Render Texture / Buffer', link: '/examples/rendering/render_texture_buffer' },
          { text: 'Render Texture / Scratch Card', link: '/examples/rendering/render_texture_scratch_card' },
        ],
      },
      {
        text: 'Sprite',
        collapsed: true,
        items: [
          { text: 'Gif / Animation / Loading', link: '/examples/sprite/gif_animation_loading' },
          { text: 'Mask / Animation', link: '/examples/sprite/mask_animation' },
          { text: 'Svg', link: '/examples/sprite/svg' },
          { text: 'Svg / Custom Data', link: '/examples/sprite/svg_custom_data' },
          { text: 'Texture Swap', link: '/examples/sprite/texture_swap' },
          { text: 'Transform / Rotation', link: '/examples/sprite/transform_rotation' },
          { text: 'Video / Texture', link: '/examples/sprite/video_texture' },
        ],
      },
      {
        text: 'Text',
        collapsed: true,
        items: [
          { text: 'Bitmap / Split Text', link: '/examples/text/bitmap_split_text' },
          { text: 'Bitmap / Web Font / Loading', link: '/examples/text/bitmap_webfont_loading' },
          { text: 'Bitmap / Word Wrap / Break Words', link: '/examples/text/bitmap_word_wrap_break_words' },
          { text: 'Bitmap / Xml', link: '/examples/text/bitmap_xml' },
          { text: 'Fill / Gradient', link: '/examples/text/fill_gradient' },
          { text: 'Filters / Cartoon', link: '/examples/text/filters_cartoon' },
          { text: 'Texture Style / Scale Mode', link: '/examples/text/texture_style_scale_mode' },
          { text: 'Trim / Bounds', link: '/examples/text/trim_bounds' },
          { text: 'Web Font / Google', link: '/examples/text/webfont_google' },
        ],
      },
      {
        text: 'Three',
        collapsed: true,
        items: [
          { text: 'Basic Integration', link: '/examples/three/basic_integration' },
        ],
      },
      {
        text: 'Tiling Sprite',
        collapsed: true,
        items: [
          { text: 'Transform / Animation', link: '/examples/tiling-sprite/transform_animation' },
        ],
      },
    ],
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/hairyf/vue3-pixi' },
  ],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Pixi',
  description: 'Vue Renderer for PixiJS',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: 'Hairyf' }],
  ],

  themeConfig,

  markdown: {
    config: md => md.use(mdPlugin),
  },
  vite: {
    plugins: [unocss() as any],
    ssr: { noExternal: ['naive-ui', 'gsap'] },
    resolve: {
      // alias: [
      //   {
      //     find: /^.*\/VPSwitchAppearance\.vue$/,
      //     replacement: fileURLToPath(new URL('./theme/components/VPSwitchAppearance/index.vue', import.meta.url)),
      //   },
      // ],
    },
  },

  vue: {
    template: { compilerOptions },
  },
})
