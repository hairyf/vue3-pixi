---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue3 Pixi"
  text: "Vue Renderer"
  tagline: "Developing Pixi applications using Vue3."
  image: /logo.svg
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/hairyf/vue3-pixi

features:
  - title: Vue Features
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#41b883" d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6 3.22-5.6Z"/><path fill="#41b883" d="m2 3.925 14 24.15 14-24.15h-5.6L16 18.415 7.53 3.925Z"/><path fill="#35495e" d="M7.53 3.925 16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6Z"/></svg>
    details: Create PixiJS objects through Vue renderer, supporting all Vue features.
  - title: Transition
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m-6-6 6 6 6-6M6 9l6-6 6 6"/></svg>
    details: Provides transition effects for PixiJS objects.
  - title: All Built-in Objects
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 16-9 5-9-5m18-4-9 5-9-5m9-8-9 5 9 5 9-5z"/></svg>
    details: Supports all PixiJS objects, including Filter, Container, Sprite, Graphics, Text, and more.
  - title: Texture Path Conversion
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18c-4.51 2-5-2-7-2"/></svg>
    details: Specify texture paths in templates and they load automatically.
  - title: All Events
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"/></svg>
    details: Supports all events emitted by PixiJS objects.
  - title: Type Strong
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.4 6.4 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5 5 0 0 0-.717-.26 5.5 5.5 0 0 0-.752-.18 4 4 0 0 0-.74-.067c-.726 0-1.29.182-1.69.547-.4.364-.6.893-.6 1.587 0 .666.2 1.18.6 1.54.4.362.964.543 1.69.543a4 4 0 0 0 .74-.067c.25-.045.497-.1.741-.17.245-.07.48-.153.706-.249a3 3 0 0 0 .615-.33V17.1a5.3 5.3 0 0 1-1.306.34c-.473.074-1.015.111-1.627.111-.736 0-1.408-.1-2.017-.3a4.44 4.44 0 0 1-1.576-.9 4 4 0 0 1-1.027-1.463c-.243-.577-.365-1.233-.365-1.966 0-.718.122-1.363.365-1.934a4.1 4.1 0 0 1 1.027-1.468 4.5 4.5 0 0 1 1.576-.934c.609-.217 1.28-.326 2.017-.326zM7.544 4.219h4.186c.626 0 1.16.074 1.6.223.44.148.793.357 1.058.627.265.27.455.59.57.962.116.37.173.78.173 1.225 0 .554-.12 1.06-.358 1.518a3.2 3.2 0 0 1-1.028 1.16l2.13 4.078h-2.388l-1.823-3.593H9.27v3.593h-1.73V4.22zm1.727 1.352v2.97H11.1c.263 0 .51-.02.74-.062a1.68 1.68 0 0 0 .618-.223c.177-.108.316-.256.418-.443.101-.187.152-.425.152-.713 0-.28-.051-.513-.152-.697a1.2 1.2 0 0 0-.418-.432 1.8 1.8 0 0 0-.618-.218 4 4 0 0 0-.74-.056H9.271z"/></svg>
    details: Written in TypeScript, with full TS docs.
  - title: Interactive Demos
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 3 14 9-14 9z"/></svg>
    details: Documentation includes interactive demos for every feature.
  - title: No Bundler Required
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9"/></svg>
    details: Usable via CDN, without any bundlers.
---
