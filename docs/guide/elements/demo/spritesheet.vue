<template>
  <assets entry="/assets/adventurer-spritesheet.json">
    <animated-sprite
      :textures="[
        'adventurer-idle-00.png',
        'adventurer-idle-01.png',
        'adventurer-idle-02.png',
      ]"
      playing
      :animation-speed="0.1"
      :anchor="0.5"
      :x="120"
      :y="120"
      :scale="1.4"
    />
  </assets>
</template>
