import "clsx";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { R as ResponsiveButton } from "../../../chunks/ResponsiveButton.js";
import { I as ImageHeader } from "../../../chunks/ImageHeader.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let canSend = true;
    Header($$renderer2);
    $$renderer2.push(`<!----> <section class="w-full min-h-screen text-kcblack bg-stone-200 text-kcblack">`);
    ImageHeader($$renderer2, {
      text: "District Project",
      imageSrc: "/districtproject/cover.jpg",
      dim: true
    });
    $$renderer2.push(`<!----> <p class="p-4 w-full md:w-1/2 mx-auto text-3xl"><img style="width: 45%; float: right;" src="/districtproject/logo.png" alt="logo"/> In 25-26 year, we’ve partnered with The Ronald McDonald House Charities! <br/><br/> The Ronald McDonald House Charities (RMHC) is a non-profit organization that supports families with
        sick children who need to travel for medical care. It provides a "home-away-from-home" through programs
        like <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-house-programs">Ronald McDonald Houses</a> and <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-family-room-programs">Family Rooms</a> near hospitals. <br/><br/> RMHC's mission is to strengthen families,
        promote healing, and ensure the best health outcomes for children by removing barriers to healthcare. `);
    ResponsiveButton($$renderer2, {
      text: "Visit their website",
      busyText: "...",
      onClick: () => window.open("https://rmhc.org/", "_blank"),
      canSend,
      color: "#fed450"
    });
    $$renderer2.push(`<!----></p></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
