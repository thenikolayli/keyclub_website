import "clsx";
import { w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { R as ResponsiveButton } from "../../../chunks/ResponsiveButton.js";
function _page($$payload, $$props) {
  push();
  let can_send = true;
  Header($$payload);
  $$payload.out.push(`<!----> <section class="w-full min-h-screen"><div class="relative w-full h-[30vh] flex flex-col items-center justify-center"><header class="text-white text-4xl">DISTRICT PROJECT</header> <img class="absolute -z-10 top-0 left-0 w-full h-full object-cover brightness-50" src="/districtproject/cover.jpg" alt="cover image"/></div> <h1 class="p-4 w-full md:w-1/2 mx-auto text-3xl"><img style="width: 45%; float: right;" src="/districtproject/logo.png" alt="logo"/> In 25-26 year, we’ve partnered with The Ronald McDonald House Charities! <br/><br/> The Ronald McDonald House Charities (RMHC) is a non-profit organization that supports families with
        sick children who need to travel for medical care. It provides a "home-away-from-home" through programs
        like <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-house-programs">Ronald McDonald Houses</a> and <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-family-room-programs">Family Rooms</a> near hospitals. <br/><br/> RMHC's mission is to strengthen families,
        promote healing, and ensure the best health outcomes for children by removing barriers to healthcare. `);
  ResponsiveButton($$payload, {
    init_text: "Visit their website",
    clicked_text: "...",
    on_click: () => window.open("https://rmhc.org/", "_blank"),
    can_send
  });
  $$payload.out.push(`<!----></h1></section> `);
  Footer($$payload);
  $$payload.out.push(`<!---->`);
  pop();
}
export {
  _page as default
};
