import { G as ensure_array_like, J as attr_style, F as attr, K as stringify, w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let photo_urls = [];
  let featured_image = "";
  const zone_count = 20;
  let columns = 6;
  let rows = 6;
  const generate_grid = (indivisible_zones, divisible_zones, zone_goal) => {
    if (indivisible_zones.length + divisible_zones.length < zone_goal && divisible_zones.length > 0) {
      const pick_index = Math.floor(Math.random() * divisible_zones.length);
      const pick = divisible_zones.splice(pick_index, 1)[0];
      let division_axis;
      let divided_zones = [];
      if (pick.width > pick.height) {
        division_axis = "horizontal";
      } else if (pick.height > pick.width) {
        division_axis = "vertical";
      } else {
        division_axis = ["horizontal", "vertical"][Math.floor(Math.random() * 2)];
      }
      if (division_axis === "horizontal") {
        const half = Math.floor(pick.width / 2);
        const remainder = pick.width - half;
        divided_zones.push({ x: pick.x, y: pick.y, width: half, height: pick.height });
        divided_zones.push({
          x: pick.x + half,
          y: pick.y,
          width: remainder,
          height: pick.height
        });
      } else if (division_axis === "vertical") {
        const half = Math.floor(pick.height / 2);
        const remainder = pick.height - half;
        divided_zones.push({ x: pick.x, y: pick.y, width: pick.width, height: half });
        divided_zones.push({
          x: pick.x,
          y: pick.y + half,
          width: pick.width,
          height: remainder
        });
      }
      for (const each of divided_zones) {
        if (each.width === 1 && each.height === 1) {
          indivisible_zones.push(each);
        } else {
          divisible_zones.push(each);
        }
      }
      return generate_grid(indivisible_zones, divisible_zones, zone_goal);
    } else {
      let zones = indivisible_zones.concat(divisible_zones);
      zones.sort((a, b) => a.y - b.y || a.x - b.x);
      return zones;
    }
  };
  const each_array = ensure_array_like(generate_grid([], [{ x: 0, y: 0, width: columns, height: rows }], zone_count));
  $$payload.out.push(`<section class="overflow-hidden flex flex-col items-center"><div class="relative z-20 w-full">`);
  Header($$payload);
  $$payload.out.push(`<!----></div> <header class="z-10 absolute text-kcyellow text-8xl md:text-[10rem] tracking-wide top-[17rem]">Gallery</header> <section class="xl:grid p-4 md:p-8 gap-4 md:gap-8 relative w-full h-[200vh] bg-white text-white overflow-hidden"${attr_style(` display: grid; grid-template-columns: repeat(${stringify(columns)}, minmax(0, 1fr)); grid-template-rows: repeat(${stringify(rows)}, minmax(0, 1fr)); `)}><section class="z-0 absolute w-full h-full"></section> <!--[-->`);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let each = each_array[index];
    $$payload.out.push(`<button class="border-3 border-kcyellow text-black overflow-hidden"${attr_style(` grid-column-start: ${stringify(each.x + 1)}; grid-column: span ${stringify(each.width)} / span ${stringify(each.width)}; grid-row-start: ${stringify(each.y + 1)}; grid-row: span ${stringify(each.height)} / span ${stringify(each.height)}; `)}><img${attr("id", `image-${stringify(index)}`)} class="object-cover w-full h-full"${attr("src", photo_urls[index])}${attr("alt", photo_urls[index])}/></button>`);
  }
  $$payload.out.push(`<!--]--></section> <h1 class="text-black text-center text-4xl my-4"><button class="cursor-pointer underline">Refresh</button>  
        the page, it's different every time!</h1></section> `);
  Footer($$payload);
  $$payload.out.push(`<!----> <img${attr("src", featured_image)} alt="Featured image" class="fixed z-30 max-w-[80vw] max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-kcyellow object-contain"/> <button class="fixed z-20 top-0 left-0 backdrop-blur-sm w-screen h-screen cursor-default"></button>`);
  pop();
}
export {
  _page as default
};
