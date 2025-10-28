import { x as head } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  let { children } = $$props;
  head($$payload);
  children?.($$payload);
  $$payload.out.push(`<!---->`);
}
export {
  _layout as default
};
