<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'

function onDraw(graphics: GraphicsElement) {
  graphics.svg(`
    <svg height="400" width="450" xmlns="http://www.w3.org/2000/svg">
        <!-- Draw the paths -->
        <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="4"/>
        <path id="lineBC" d="M 250 50 l 150 300" stroke="red" stroke-width="4"/>
        <path id="lineMID" d="M 175 200 l 150 0" stroke="green" stroke-width="4"/>
        <path id="lineAC" d="M 100 350 q 150 -300 300 0" stroke="blue" fill="none" stroke-width="4"/>

        <!-- Mark relevant points -->
        <g stroke="black" stroke-width="3" fill="black">
            <circle id="pointA" cx="100" cy="350" r="4" />
            <circle id="pointB" cx="250" cy="50" r="4" />
            <circle id="pointC" cx="400" cy="350" r="4" />
        </g>
    </svg>
  `)
}
</script>

<template>
  <graphics @effect="onDraw" />
</template>
