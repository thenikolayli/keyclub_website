import "clsx";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { I as ImageHeader } from "../../../chunks/ImageHeader.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Header($$renderer2);
    $$renderer2.push(`<!----> <section class="w-full h-fit min-h-screen flex flex-col items-center bg-stone-200">`);
    ImageHeader($$renderer2, { text: "Events", imageSrc: "/events.jpeg", dim: true });
    $$renderer2.push(`<!----> <div class="h-[100vh] lg:w-[70%] flex flex-col items-center justify-center p-4"><iframe title="" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;ctz=America%2FLos_Angeles&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0&amp;src=ZjIzOGY1NzgyYWIwNjg5M2FhMGQ0MzM3YWNhZjBkZjg5ZDU3YTI4ZDI0NTk1OGMyZGIyNzc0Mjc5OWNlMzgzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F4511E" class="h-full w-full"></iframe></div> <p class="text-kcblack p-8 text-xl">You must add a specific event or the entire calendar to your personal Google Calendar to see the event sign up Google Doc.</p></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
