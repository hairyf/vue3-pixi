import type { App, AppContext } from 'vue-demi'

export function inheritParent(app: App<any>, appContext?: AppContext) {
  const parent = appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    Object.assign(app._context, parent._context)

    app._context.components = { ...app._context.components };
    app._context.directives = { ...app._context.directives };
    // Keep provides as a prototype chain so inject() still works
    app._context.provides = Object.create(app._context.provides);
  }
}
