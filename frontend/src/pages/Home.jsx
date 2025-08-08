import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {onCleanup, onMount} from "solid-js";
import gsap from "gsap";
import {A} from "@solidjs/router"
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import {FaBrandsInstagram, FaBrandsTiktok} from "solid-icons/fa";

export const Home = () => {
    onMount(() => {
        document.title = "Home"

        const timeline = gsap.timeline({
            defaults: {
                ease: "power2.out",
                delay: .5
            }
        })

        const intro1 = SplitText.create(".intro1").words
        const intro2 = SplitText.create(".intro2").words

        timeline.fromTo(intro1, {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7,
        }, 0)

        timeline.fromTo(intro2, {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7
        }, .8)

        timeline.fromTo(".intro3", {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7
        }, 1.6)

        timeline.fromTo(".intro4", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1
        }, 2.6)


        gsap.set(".slide", {
            position: "absolute"
        })

        gsap.to(".slide", {
            y: () => -innerHeight,
            stagger: .5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".slides",
                start: "top top",
                end: () => "+=" + innerHeight * 6,
                scrub: .7   ,
                // markers: true,
                pin: true
            }
        })
    })

    // removes all ST animations to prevent bugs
    onCleanup(() => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    })

    return (
        <>
            <Header/>
            <section class={"w-full h-screen flex flex-col"}>

                <div class={"relative flex-1"}>
                    <img class={"h-full w-full object-cover"} src="/home/cover.jpg" alt="Cover image"/>

                    <div class={"absolute inset-x-0 mx-auto top-[25%] z-10 text-white text-center px-8"}>
                        <h1 class={"intro1 text-3xl"}>
                            we don't make keys...
                        </h1>
                        <h1 class={"intro2 text-3xl"}>
                            we make a
                        </h1>
                        <h1 class={"intro3 text-5xl mt-2"}>
                            difference!
                        </h1>
                        <h1 class={"intro4 text-3xl mt-6"}>
                            Henry M. Jackson High School Key Club
                        </h1>
                    </div>
                </div>
            </section>

            <section class={"w-full h-screen grid grid-cols-1 grid-rows-2"}>
                <video autoplay loop muted class={"w-full h-full object-cover"}>
                    <source src="/home/gif.webm" type="video/webm"/>
                </video>

                <div class={"w-full h-full p-8 flex items-center justify-center overflow-hidden"}>
                    <div class={"text-center flex flex-col items-center justify-center"}>
                        <header class="text-4xl">
                            WHO ARE WE?
                        </header>
                        <h1 class="mt-8 text-xl w-full text-left">
                            Key Club is a student-led volunteering organization. Jackson High School is one of 13
                            schools in Division 21, currently standing as the club with the most members. Key Club
                            is a great opportunity for students to volunteer for their community and simultaneously
                            make new friends within the division with students from other schools.
                        </h1>
                    </div>
                </div>
            </section>

            <section class={"relative slides h-screen text-white bg-kcyellow"}>

                <section class="relative top-0 w-full h-[100vh] bg-kcblack border-3 border-kcyellow z-[11]">
                    <div class={"absolute top-0 left-0 w-full h-full z-10 p-2"}>
                            <header class={"text-3xl h-[5vh]"}>COMMITTEES</header>

                        <h1 class={"text-3xl mt-4"}>
                            Our Key Club has 4 committees
                            <br/> <br/>
                            Committees are a great way to meet new people and gain more volunteer hours.
                            Each committee is run by one or multiple committee chairs and they host their own meetings.
                            <br/> <br/>
                            Member and chair applications are currently closed.
                        </h1>
                    </div>

                    <img class={"absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"}
                         src="/home/committees_cover.jpg" alt="cover"/>
                </section>

                <section class="slide relative top-[107vh] w-full h-[93vh] bg-kcblack border-3 border-kcyellow z-[12]">
                    <div class={"absolute top-0 left-0 w-full h-full z-20 p-2"}>
                        <header class={"text-3xl h-[5vh]"}>SPIRIT</header>

                        <h1 class={"text-3xl mt-4"}>
                            Spirit Co is focused on maintaining the spirit of Key Club!
                            <br/> <br/>
                            We learn chants and prepare members for the
                            annual District Convention (DCON)!
                        </h1>
                    </div>

                    <img class={"absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"}
                         src="/home/spirit_cover.webp" alt="cover"/>
                </section>

                <section class="slide relative top-[114vh] w-full h-[86vh] bg-kcblack border-3 border-kcyellow z-[13]">
                    <div class={"absolute top-0 left-0 w-full h-full z-10 p-2"}>
                        <header class={"text-3xl h-[5vh]"}>SERVICE</header>

                        <h1 class={"text-3xl mt-4"}>
                            Service Co are the standby volunteers of Key Club.
                            <br/> <br/>
                            We help out whenever we can and sign up for events with low volunteers.
                            This committee is great for getting volunteer hours!
                            <br/> <br/>
                            Follow the JHS Key Club Reminds Instagram to
                            receive reminders about events that need volunteers:
                            <A href={"https://instagram.com/jhskeyclubreminds"} class={"flex items-center underline"}>
                                <FaBrandsInstagram/> <span class={"ml-2"}>jhskeyclubreminds</span>
                            </A>
                        </h1>
                    </div>

                    <img class={"absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"}
                         src="/home/service_cover.jpg" alt="cover"/>
                </section>

                <section class="slide relative top-[121vh] w-full h-[79vh] bg-kcblack border-3 border-kcyellow z-[14]">
                    <div class={"absolute top-0 left-0 w-full h-full z-10 p-2"}>
                        <header class={"text-3xl h-[5vh]"}>DECORATION</header>

                        <h1 class={"text-3xl mt-4"}>
                            Decoration Co is the art club of Key Club.
                            <br/> <br/>
                            We create decorations (primarily posters) for events such as the Key Club Banquet and the Eggstravaganza.
                        </h1>
                    </div>

                    <img class={"absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"}
                         src="/home/deco_cover.jpg" alt="cover"/>
                </section>

                <section class="slide relative top-[128vh] w-full h-[72vh] bg-kcblack border-3 border-kcyellow z-[15]">
                    <div class={"absolute top-0 left-0 w-full h-full z-10 p-2"}>
                        <header class={"text-3xl h-[5vh]"}>LEADERSHIP</header>

                        <h1 class={"text-3xl mt-4"}>
                            Leadership Co is the backbone of our Key Club.
                            <br/> <br/>
                            We reach out to our community to create and lead volunteer events.
                            <br/> <br/>
                            <span class={"w-full text-center"}>🚨 NOTE: </span>
                            This committee is only for Sophomores and above. 🚨
                        </h1>
                    </div>

                    <img class={"absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"}
                         src="/home/leadership_cover.webp" alt="cover"/>
                </section>

            </section>

            <section class={"w-full h-screen grid grid-cols-1 grid-rows-2"}>
                <img class={"w-full h-full object-cover"} src="/home/remind.jpg" alt="Remind image"/>

                <div class={"w-full h-full p-8 flex items-center justify-center overflow-hidden"}>
                    <div class={"text-center flex flex-col items-center justify-center"}>
                        <header class="text-4xl">
                            FOLLOW OUR SOCIALS!
                        </header>
                        <ul class="mt-8 text-2xl w-fit mx-auto underline">
                            <li class={"w-fit"}><A class={"flex items-center"} href="https://instagram.com/jhskeyclub21"
                                                   target={"_blank"}><FaBrandsInstagram/><span
                                class={"ml-2"}>jhskeyclub21</span></A></li>
                            <li class={"w-fit"}><A class={"flex items-center"}
                                                   href="https://instagram.com/jhskeyclubreminds"
                                                   target={"_blank"}><FaBrandsInstagram/><span
                                class={"ml-2"}>jhskeyclubreminds</span></A></li>
                            <li class={"w-fit"}><A class={"flex items-center"}
                                                   href="https://www.tiktok.com/@jhskeyclub21"
                                                   target={"_blank"}><FaBrandsTiktok/><span
                                class={"ml-2"}>jhskeyclub21</span></A></li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
}