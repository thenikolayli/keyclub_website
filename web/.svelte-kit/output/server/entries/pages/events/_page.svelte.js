import "clsx";
import { w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  Header($$payload);
  $$payload.out.push(`<!----> <section class="w-full h-screen min-h-screen flex flex-col items-center"><header class="text-7xl mb-4">EVENTS</header> <div class="h-full w-full lg:w-[70%] flex flex-col items-center justify-center p-4"><iframe title="" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;ctz=America%2FLos_Angeles&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0&amp;src=ZjIzOGY1NzgyYWIwNjg5M2FhMGQ0MzM3YWNhZjBkZjg5ZDU3YTI4ZDI0NTk1OGMyZGIyNzc0Mjc5OWNlMzgzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F4511E" class="h-full w-full"></iframe></div></section> `);
  Footer($$payload);
  $$payload.out.push(`<!---->`);
  pop();
}
export {
  _page as default
};
