<template>
  <assets entry="https://pixijs.com/assets/bitmap-font/desyrel.xml" autoload>
    <bitmap-text
      :x="220"
      :y="120"
      :anchor="0.5"
      :style="{ fontFamily: 'Desyrel', fontSize: 48, align: 'center' }"
    >
      the fox jumps over\nthe lazy dog
    </bitmap-text>
  </assets>
</template>
