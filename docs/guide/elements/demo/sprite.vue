<template>
  <assets entry="/assets/adventurer.png" #="{data}">
    <sprite
      :texture="data"
      :anchor="0.5" :scale="1.2"
      :x="120" :y="120"
    />
  </assets>
</template>
