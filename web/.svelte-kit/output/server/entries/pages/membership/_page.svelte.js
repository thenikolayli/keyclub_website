import "clsx";
import { w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  Header($$payload);
  $$payload.out.push(`<!----> <section class="w-full min-h-screen text-center text-2xl"><div class="relative w-full h-[30vh] flex flex-col items-center justify-center"><header class="text-white text-4xl">REGISTRATION IS CLOSED</header> <img class="absolute -z-10 top-0 left-0 w-full h-full object-cover" src="/membership/membership_cover.jpg" alt="Membership Cover"/></div> <section class="p-4 space-y-8 md:space-y-16 w-full my-8 md:text-3xl"><div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"><img class="object-contain w-[80%] mx-auto" src="/membership/members1.png" alt="Members 1"/> <div class="w-full"><header class="text-4xl mb-8">Be a Keyutie</header> <h1 class="text-left"><span class="underline">Get an ASB card!</span> If you don't already have one, go to the
                    ASB office for assistance. <br/><br/> Start your service! <br/><br/> Participate in club events/socials, go to DCMs, and attend club
                    meetings. Requirements are listed below.</h1></div></div> <div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"><img class="md:order-2 object-contain w-[80%] mx-auto" src="/membership/members2.png" alt="Members 2"/> <div class="md:order-1 w-full"><header class="text-4xl mb-8">Pay Dues</header> <h1 class="text-left">The official dues payments are closed. <br/><br/> Check back next year!</h1></div></div> <div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"><img class="object-contain w-[80%] mx-auto" src="/membership/members3.png" alt="Members 3"/> <div class="w-full"><header class="text-4xl mb-8">Stay in the Hive</header> <h1 class="text-left">Complete your annual hour requirement of <span class="underline">25 hours</span>! <br/><br/> Attend <span class="underline">50%</span> of the general meetings. <br/><br/> Attend all events you've signed up for. Give a <span class="underline">24 hour notice</span> if you can't make it to an
                    event.
                    Misbehavior or failure to show up to 3 events without advanced notice gets you suspended
                    from Key Club.</h1></div></div></section></section> `);
  Footer($$payload);
  $$payload.out.push(`<!---->`);
  pop();
}
export {
  _page as default
};
