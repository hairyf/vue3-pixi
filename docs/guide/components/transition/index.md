# Transition

vue3-pixi provides out-of-the-box transition effects. You can use the `Transition` component on any element, which inherits from Vue's `<BaseTransition>`.

The usage of `PTransition` is similar to [Vue Transition](https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks) (but does not include CSS modes). The component can wrap any element, and the transition effect is triggered when the `v-if` condition of the element becomes `true|false`. It can also be encapsulated as a standalone transition component.

> It is important to note that the default Transition component cannot be overridden, so the exported component name is `PTransition|PixiTransition`.

## Usage

Translation: Pixi.js does not provide a built-in tweening engine, but you can use third-party tweening engines like `GSAP` or `Tween.js` to achieve tween animations.

<demo src="./demo/basic.vue" :width="400" :expand="false" />

## Properties Mode

Unlike the Vue Transition, you can achieve transition effects by setting different properties:

<demo src="./demo/properties-basic.vue" :width="400" />


## Ease

By default, all transition effects are linear. You can customize the transition easing by using custom cubic-bezier curves.

<demo src="./demo/properties-ease-presets.vue" :width="400" />

## Ease Presets

The following transitions are available via the `TransitionPresets` constant.

- [`linear`](https://cubic-bezier.com/#0,0,1,1)
- [`easeInSine`](https://cubic-bezier.com/#.12,0,.39,0)
- [`easeOutSine`](https://cubic-bezier.com/#.61,1,.88,1)
- [`easeInOutSine`](https://cubic-bezier.com/#.37,0,.63,1)
- [`easeInQuad`](https://cubic-bezier.com/#.11,0,.5,0)
- [`easeOutQuad`](https://cubic-bezier.com/#.5,1,.89,1)
- [`easeInOutQuad`](https://cubic-bezier.com/#.45,0,.55,1)
- [`easeInCubic`](https://cubic-bezier.com/#.32,0,.67,0)
- [`easeOutCubic`](https://cubic-bezier.com/#.33,1,.68,1)
- [`easeInOutCubic`](https://cubic-bezier.com/#.65,0,.35,1)
- [`easeInQuart`](https://cubic-bezier.com/#.5,0,.75,0)
- [`easeOutQuart`](https://cubic-bezier.com/#.25,1,.5,1)
- [`easeInOutQuart`](https://cubic-bezier.com/#.76,0,.24,1)
- [`easeInQuint`](https://cubic-bezier.com/#.64,0,.78,0)
- [`easeOutQuint`](https://cubic-bezier.com/#.22,1,.36,1)
- [`easeInOutQuint`](https://cubic-bezier.com/#.83,0,.17,1)
- [`easeInExpo`](https://cubic-bezier.com/#.7,0,.84,0)
- [`easeOutExpo`](https://cubic-bezier.com/#.16,1,.3,1)
- [`easeInOutExpo`](https://cubic-bezier.com/#.87,0,.13,1)
- [`easeInCirc`](https://cubic-bezier.com/#.55,0,1,.45)
- [`easeOutCirc`](https://cubic-bezier.com/#0,.55,.45,1)
- [`easeInOutCirc`](https://cubic-bezier.com/#.85,0,.15,1)
- [`easeInBack`](https://cubic-bezier.com/#.36,0,.66,-.56)
- [`easeOutBack`](https://cubic-bezier.com/#.34,1.56,.64,1)
- [`easeInOutBack`](https://cubic-bezier.com/#.68,-.6,.32,1.6)

For more complex transitions, a custom function can be provided.

<demo src="./demo/properties-sase-custom.vue" :width="400" />

## Ticker

You can also control the transition effects by setting enter and level to functions:

<demo src="./demo/ticker.vue" :width="400" />