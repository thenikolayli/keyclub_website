import { w as attr } from "./index.js";
import { l as escape_html } from "./context.js";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
function ImageHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { text, imageSrc, dim } = $$props;
    gsap.registerPlugin(SplitText);
    $$renderer2.push(`<div class="relative w-full h-[30vh] flex flex-col items-center justify-center"><header class="relative z-10 text-stone-200 text-4xl">${escape_html(text)}</header> `);
    if (dim) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img class="absolute z-0 top-0 left-0 w-full h-full object-cover brightness-50"${attr("src", imageSrc)} alt=""/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img class="absolute z-0 top-0 left-0 w-full h-full object-cover"${attr("src", imageSrc)} alt=""/>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  ImageHeader as I
};
