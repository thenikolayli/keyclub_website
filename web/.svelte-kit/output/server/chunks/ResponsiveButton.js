import { z as escape_html, w as pop, u as push } from "./index.js";
import "clsx";
function ResponsiveButton($$payload, $$props) {
  push();
  let { init_text, clicked_text, on_click, can_send } = $$props;
  $$payload.out.push(`<button class="relative w-full p-2 px-8 mt-8 border-3 border-kcyellow overflow-hidden text-2xl text-kcblack"><h1 class="relative z-10">${escape_html(
    // animation
    // if switched to can send, then replay the animation
    init_text
  )}</h1> <h1 class="z-10 absolute inset-x-0 mx-auto">${escape_html(clicked_text)}</h1> <div class="absolute top-0 left-0 z-0 w-full h-full bg-kcyellow"></div></button>`);
  pop();
}
export {
  ResponsiveButton as R
};
