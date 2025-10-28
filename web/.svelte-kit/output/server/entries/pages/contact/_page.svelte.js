import { F as attr, z as escape_html, w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { R as ResponsiveButton } from "../../../chunks/ResponsiveButton.js";
import axios from "axios";
function ResponsiveInput($$payload, $$props) {
  push();
  let { value, text } = $$props;
  $$payload.out.push(`<div class="relative border-b-3 border-kcyellow text-3xl"><input class="outline-none relative z-10" type="text"${attr(
    "value",
    // animates text when typing and cursor not inside input
    value
  )}/> <h1 class="first-name absolute top-0 left-0">${escape_html(text)}</h1></div>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  let first_name = "";
  let last_name = "";
  let email = "";
  let message = "";
  let can_send = true;
  const send_message = (event) => {
    event.preventDefault();
    if (!can_send) return;
    can_send = false;
    try {
      const response = axios({
        method: "POST",
        url: "/api/message",
        headers: { "Content-Type": "application/json" },
        data: { first_name, last_name, contact: email, message }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setTimeout(
      () => {
        can_send = true;
      },
      2e3
    );
  };
  Header($$payload);
  $$payload.out.push(`<!----> <section class="w-full min-h-screen flex flex-col"><div class="relative w-full h-[30vh] flex flex-col items-center justify-center"><header class="text-white text-4xl">CONTACT US</header> <img class="absolute -z-10 top-0 left-0 w-full h-full object-cover" src="/contactus/contact.jpg" alt="Contact Us Cover"/></div> <form class="flex flex-col w-full md:w-[80%] xl:w-[65%] mx-auto my-16 px-12"><div class="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full mt-12 text-2xl">`);
  ResponsiveInput($$payload, { value: first_name, text: "First Name" });
  $$payload.out.push(`<!----> `);
  ResponsiveInput($$payload, { value: last_name, text: "Last Name" });
  $$payload.out.push(`<!----> `);
  ResponsiveInput($$payload, { value: email, text: "Email *" });
  $$payload.out.push(`<!----></div> <div class="w-full mt-8 text-2xl"><h1 class="mb-1">Message *</h1> <textarea class="p-4 text-2xl w-full border-3 border-kcyellow resize-y overflow-hidden outline-none"${attr("rows", 10)}></textarea></div> `);
  ResponsiveButton($$payload, {
    init_text: "Send",
    clicked_text: "Sent!",
    on_click: send_message,
    can_send
  });
  $$payload.out.push(`<!----></form></section> `);
  Footer($$payload);
  $$payload.out.push(`<!---->`);
  pop();
}
export {
  _page as default
};
