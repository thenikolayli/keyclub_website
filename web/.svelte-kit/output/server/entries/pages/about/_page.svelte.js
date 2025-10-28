import "clsx";
import { w as pop, u as push } from "../../../chunks/index.js";
import { H as Header, I as Icon, F as Footer } from "../../../chunks/Footer.js";
import { R as ResponsiveButton } from "../../../chunks/ResponsiveButton.js";
function _page($$payload, $$props) {
  push();
  let can_send = true;
  Header($$payload);
  $$payload.out.push(`<!----> <section class="w-full h-fit text-white"><div class="w-full h-[75vh] flex flex-col items-center justify-center text-center"><header class="intro-text text-black text-7xl">MEET THE OFFICERS</header></div> <section class="space-y-[14rem] py-[10rem] w-[80%] md:w-fit mx-auto overflow-hidden"><div class="relative cards h-fit w-full md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/lex.png" alt="Lex Padua"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">President</h1> <h1 class="cards-info text-3xl mt-2">Lex Padua</h1> <h1 class="cards-info text-lg flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">alexmariepadua19@gmail.com</span></h1></div></div> <div class="relative cards h-fit w-full md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/clarrise.png" alt="Clarrise Song"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Vice President</h1> <h1 class="cards-info text-3xl mt-2">Clarrise Song</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">clarissesong18@gmail.com</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/annabelle.png" alt="Annabelle Ho"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Treasurer</h1> <h1 class="cards-info text-3xl mt-2">Annabelle Ho</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">annabelle.zt.ho@gmail.com</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/ravindu.png" alt="Ravindu Marasinghe"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Secretary</h1> <h1 class="cards-info text-3xl mt-2">Ravindu Marasinghe</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">ravindu2008@icloud.com</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/allyson.png" alt="Allyson Chun"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Editor</h1> <h1 class="cards-info text-3xl mt-2">Allyson Chun</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">allysonhw96@gmail.com</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/ellie.png" alt="Ellie Nguyen"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Editor</h1> <h1 class="cards-info text-3xl mt-2">Ellie Nguyen</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">ellienguyen882@gmail.com</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/nikolay.png" alt="Nikolay Li"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold] pr-1">Webmaster</h1> <h1 class="cards-info text-3xl mt-2">Nikolay Li</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">youdontneed@my.email</span></h1></div></div> <div class="relative cards h-fit w-full md:w-fit md:flex"><img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10" src="/about/killian.png" alt="Killian Bates"/> <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"><div class="h-4 w-full"></div> <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Secretary</h1> <h1 class="cards-info text-3xl mt-2">Killian Bates</h1> <h1 class="cards-info text-xl flex items-center text-gray-400">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">killianj1010@outlook.com</span></h1></div></div></section></section> <section class="w-full min-h-screen p-8 flex items-center flex-col text-center"><header class="text-6xl sm:text-7xl mb-4">FACULTY ADVISORS</header> <div class="grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1"><div class="flex flex-col h-full w-full items-center justify-center"><img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full" src="/about/mrcain.png" alt="Mr. Cain"/> <h1 class="font-[century-gothic-bold] text-5xl mt-4">Alfred Cain</h1> <h1 class="text-2xl flex items-center text-gray-600">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">acain@everettsd.org</span></h1></div> <div class="flex flex-col h-full w-full items-center justify-center"><img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full" src="/about/mrsvaught.jpeg" alt="Mrs. Vaught"/> <h1 class="font-[century-gothic-bold] text-5xl mt-4">Rachel Vaught</h1> <h1 class="text-2xl flex items-center text-gray-600">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">rvaught@everettsd.org</span></h1></div></div></section> <section class="w-full min-h-screen p-8 flex items-center flex-col text-center"><header class="text-6xl sm:text-7xl mb-4">KIWANIS ADVISORS</header> <div class="grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1"><div class="flex flex-col h-full w-full items-center justify-center"><img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full" src="/about/mrsteckler.png" alt="Mr. Cain"/> <h1 class="font-[century-gothic-bold] text-5xl mt-4">John Steckler</h1> <h1 class="text-2xl flex items-center text-gray-600">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">johnsteckler@comcast.net</span></h1></div> <div class="flex flex-col h-full w-full items-center justify-center"><img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full" src="/about/mrssteckler.png" alt="Mrs. Vaught"/> <h1 class="font-[century-gothic-bold] text-5xl mt-4">Lisa Steckler</h1> <h1 class="text-2xl flex items-center text-gray-600">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">stecklerlisa@gmail.com</span></h1></div></div></section> <section class="w-full min-h-screen p-8 flex items-center flex-col text-center"><header class="text-6xl sm:text-7xl mb-4">D21 LIEUTENANT GOVERNOR</header> <div class="w-[90%] sm:w-[50%] lg:w-[35%] xl:w-[30%] flex-1 flex flex-col items-center justify-center"><img class="object-cover border-kcyellow border-16 h-[90%] aspect-[3/4] w-full" src="/about/maeve.jpg" alt="Maeve"/> <h1 class="font-[century-gothic-bold] text-5xl mt-4">Maeve Hershlip</h1> <h1 class="text-2xl flex items-center text-gray-600">`);
  Icon($$payload, { icon: "fe:mail" });
  $$payload.out.push(`<!----><span class="ml-2">ltg21@pnwkeyclub.org</span></h1></div></section> <section class="w-full h-screen p-8 flex items-center flex-col text-white"><header class="text-4xl sm:text-7xl text-black text-center">OUR PREFERRED PARTNERS AND CHARITIES</header> <div class="border-16 border-kcyellow mt-8 w-full h-[80%] md:h-[70%] md:aspect-[1.2] lg:w-auto lg:aspect-[1.7] flex overflow-hidden"><div class="partner relative w-full h-full flex-none"><div class="absolute p-8 h-full z-10"><img class="h-[20%] object-contain" src="/about/thirstproject_logo.png" alt="Logo"/> <h1 class="text-md sm:text-xl mt-8 sm:leading-10">Thirst Project hopes to educate the next generation by arming students with
                    information
                    about how they can be a part of social change,
                    make a difference and encourage others to join in the effort. <a class="float-right text-black bg-white mt-4 p-4 text-xl" href="https://thirstproject.org/" target="_blank">Learn More</a></h1></div> <img class="object-cover z-0 w-full h-full" src="/about/thirstproject.png" alt="Thirst Project"/></div> <div class="partner relative w-full h-full flex-none"><div class="absolute p-8 h-full z-10"><img class="h-[20%] object-contain" src="/about/unicef_logo.png" alt="Logo"/> <h1 class="text-md md:text-xl mt-8 sm:leading-6">UNICEF is the only organization of the United Nations dedicated exclusively to
                    children.
                    Working with other United Nations bodies, governments and non-governmental
                    organizations,
                    UNICEF helps to provide for children’s needs in more than 150 developing countries
                    through community-based services in primary health care,
                    basic education and safe water and sanitation. <a class="float-right text-black bg-white mt-4 p-4 text-xl" href="https://www.unicef.org/" target="_blank">Learn More</a></h1></div> <img class="object-cover z-0 w-full h-full" src="/about/unicef.jpg" alt="Unicef"/></div> <div class="partner relative w-full h-full flex-none"><div class="absolute p-8 h-full z-10"><img class="h-[20%] object-contain" src="/about/erikaslighthouse_logo.png" alt="Logo"/> <h1 class="text-md md:text-xl mt-8 sm:leading-6">The mission of Erika's Lighthouse is to make sure no young person feels alone in
                    their depression.
                    This nonprofit organization encourages good mental health and strives to break down
                    the stigma surrounding mental health issues.
                    Erika's Lighthouse is dedicated to creating a community of empathy and education and
                    has resources and programs for students and educators, grades 4-12. <a class="float-right text-black bg-white mt-4 p-4 text-xl" href="https://erikaslighthouse.org/" target="_blank">Learn More</a></h1></div> <img class="object-cover brightness-[.2] z-0 w-full h-full" src="/about/erikaslighthouse.jpeg" alt="Erika's Lighthouse"/></div> <div class="partner relative w-full h-full flex-none"><div class="absolute p-8 h-full z-10"><img class="h-[20%] object-contain" src="/about/schoolhouse_logo.png" alt="Logo"/> <h1 class="text-md md:text-xl mt-8 sm:leading-6">Want to make an impact and have fun while doing it? Looking for a service project
                    that you can complete from the comfort of your bedroom?
                    Key Club has partnered with Schoolhouse to bring free tutoring to thousands of
                    learners across the world.
                    If you're interested in learning something new, or you're interested in becoming a
                    tutor yourself, sign up today! <a class="float-right text-black bg-white mt-4 p-4 text-xl" href="https://schoolhouse.world/key-club" target="_blank">Learn More</a></h1></div> <img class="object-cover brightness-[1.2] z-0 w-full h-full" src="/about/schoolhouse.png" alt="schoolhouse"/></div> <div class="partner relative w-full h-full flex-none"><div class="absolute p-8 h-full z-10"><img class="h-[20%] object-contain" src="/about/collegewise_logo.png" alt="Logo"/> <h1 class="text-md md:text-xl mt-8 sm:leading-6">Collegewise helps identify the college that’s right for you, assists with the
                    application process,
                    and provides tutoring for ACT/SAT exams. While a paid subscription is available for
                    those who wish to access it,
                    every Key Club member has access to a suite of Collegewise resources on the Runway
                    platform as a member benefit. <a class="float-right text-black bg-white mt-4 p-4 text-xl" href="https://collegewise.com/" target="_blank">Learn More</a></h1></div> <img class="object-cover z-0 w-full h-full" src="/about/collegewise.jpg" alt="Collegewise"/></div></div> <div class="flex text-black gap-8 mt-4"><button>`);
  Icon($$payload, { icon: "solar:arrow-left-outline", class: "size-[4rem]" });
  $$payload.out.push(`<!----></button> <button>`);
  Icon($$payload, { icon: "solar:arrow-right-outline", class: "size-[4rem]" });
  $$payload.out.push(`<!----></button></div></section> <section class="w-full h-screen grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"><div class="w-full h-full flex flex-col items-center justify-center p-8"><header class="text-4xl md:text-7xl">OUR KIWANIS</header> <h1 class="text-3xl md:text-2xl mt-8 text-left">JHS Key Club is sponsored by the Kiwanis of Mill Creek.
            Kiwanis is an international community of clubs in which is dedicated to serving the
            community and the lives of the children around it.</h1></div> <img class="w-full h-full object-cover" src="/about/kiwanis.jpg" alt="Mill Creek Kiwanis"/></section> <section class="w-full p-8 my-[4rem] text-center"><header class="text-4xl sm:text-7xl">MORE WEBSITES</header> <h1 class="mt-4 mb-8 text-3xl text-left">Check out our international and district websites to learn more or catch up with the buzz!</h1> <div class="flex flex-col md:flex-row mx-auto text-4xl space-x-8">`);
  ResponsiveButton($$payload, {
    init_text: "Key Club",
    clicked_text: "...",
    on_click: () => window.open("https://keyclub.org/", "_blank"),
    can_send
  });
  $$payload.out.push(`<!----> `);
  ResponsiveButton($$payload, {
    init_text: "PNW Key Club",
    clicked_text: "...",
    on_click: () => window.open("https://pnwkeyclub.org/", "_blank"),
    can_send
  });
  $$payload.out.push(`<!----></div></section> `);
  Footer($$payload);
  $$payload.out.push(`<!---->`);
  pop();
}
export {
  _page as default
};
