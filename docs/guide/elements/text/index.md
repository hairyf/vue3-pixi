# Text

Creates a [Text](https://pixijs.download/release/docs/PIXI.Text.html)

Renders a line or multiple lines of text to the canvas.

The primary advantage of this class over BitmapText is that you have great control over the style of the text, which you can change at runtime.

The primary disadvantages is that each piece of text has it’s own texture, which can use more memory. When text changes, this texture has to be re-generated and re-uploaded to the GPU, taking up time.

To split a line you can use `\n` in your text string, or, on the style prop, change its `wordWrap` property to true and and give the `wordWrapWidth` property a value.
