import { w as attr, x as attr_class, y as attr_style } from "./index.js";
import { l as escape_html } from "./context.js";
function ResponsiveButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const text = props.text ?? props.init_text ?? "";
    const busyText = props.busyText ?? props.clicked_text ?? "...";
    props.onClick ?? props.on_click;
    const canSend = props.canSend ?? props.can_send ?? true;
    const color = props.color ?? "#fed450";
    const textColor = props.textColor ?? "#231f20";
    const className = props.className ?? "";
    $$renderer2.push(`<button${attr("disabled", !canSend, true)}${attr_class("rb relative w-full mt-8 overflow-hidden border-3 text-2xl " + className, "svelte-ydgbfy")}${attr_style("--rb-accent:" + color + "; --rb-text:" + textColor)}${attr(
      "data-active",
      // On mobile (and some desktop browsers), click can leave the element focused,
      // which effectively "sticks" the hover/focus styling. Clear it so we return
      // to the regular state immediately after clicking.
      "false"
    )}${attr("data-busy", !canSend ? "true" : "false")}><span class="rb_label svelte-ydgbfy"><span class="rb_labelInner svelte-ydgbfy"${attr_style("transform: translateY(" + (canSend ? "0%" : "-50%") + ");")}><span class="rb_line svelte-ydgbfy">${escape_html(text)}</span> <span class="rb_line svelte-ydgbfy">${escape_html(busyText)}</span></span></span></button>`);
  });
}
export {
  ResponsiveButton as R
};
