import { App, createApp, PropType, render, VNode } from "vue";

interface customProp {
  el: HTMLElement;
  component: any;
  appContext: any;
}

export default function renderComponent({
  el,
  component,
  appContext,
}: customProp) {
  let app:App | undefined = createApp(component)
  Object.assign(app._context, appContext) // must use Object.assign on _context
  app.mount(el)

  return () => {
    // destroy app/component
    app?.unmount()
    app = undefined
  }
}
