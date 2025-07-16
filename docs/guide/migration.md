帮我编写 vue3-pixi 的 pixi.js v8 迁移指南，主要有几下几点：

​重大的变更

1. 所有元素直接加载 texture 路径都失效，除此之外，Loader 组件不在使用，所有资源转而使用 Assets 和 AssetsBundle 组件进行加载资源。

旧的：
<Loader :resources="{flowerTop: '/...'}">
  <sprite texture="flowerTop" />
</Loader>
or
<sprite texture="/..." />

新的：
<assets alias="myAlias" entry="/assets/metal_slug.png">
  <sprite texture="myAlias" />
</assets>
<assets-bundle id="myBundleId" :entry="[{alias: 'myAsset', src: 'path/to/asset'}]">
  <!-- ... -->
</assets-bundle>
而直接加载路径则会导致错误：
<sprite texture="/..." /> <!-- error -->

2. 所有元素 render 事件名称替换为 effect，而 render 事件则作用于 pixi.js 原生属性（@https://pixijs.com/8.x/guides/components/scene-objects?_highlight=onrender#using-onrender ）且参数添加元素实例（`@render="(element, renderer)=> {...}"`）

旧的：
<graphics @render="graphics => {...}"/>

新的：
<graphics @effect​="graphics => {...}"/>
<container @render="container => container.rotation += 0.01" />

3. onTick 参数变化：

旧的：
onTick(delta => {})

新的：
onTick(({ deltaTime }) => {})
