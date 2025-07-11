import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";

import lex_png from "../assets/about/lex.png";
import clarrise_png from "../assets/about/clarrise.png";
import annabelle_png from "../assets/about/annabelle.png";
import ravindu_png from "../assets/about/ravindu.png";
import allyson_png from "../assets/about/allyson.png";
import ellie_png from "../assets/about/ellie.png";
import nikolay_png from "../assets/about/nikolay.png";
import killian_png from "../assets/about/killian.png";

import mrcain from "../assets/about/mrcain.png";
import mrsvaught from "../assets/about/mrsvaught.jpeg";
import mrsteckler from "../assets/about/mrsteckler.png";
import mrssteckler from "../assets/about/mrssteckler.png";
import maeve from "../assets/about/maeve.jpg";
import kiwanis from "../assets/about/kiwanis.jpg";

import thirstproject from "../assets/about/thirstproject.png";
import thirstproject_logo from "../assets/about/thirstproject_logo.png";
import unicef from "../assets/about/unicef.jpg";
import unicef_logo from "../assets/about/unicef_logo.png";
import erikaslighthouse from "../assets/about/erikaslighthouse.jpeg";
import erikaslighthouse_logo from "../assets/about/erikaslighthouse_logo.png";
import schoolhouse from "../assets/about/schoolhouse.png";
import schoolhouse_logo from "../assets/about/schoolhouse_logo.png";
import collegewise from "../assets/about/collegewise.jpg";
import collegewise_logo from "../assets/about/collegewise_logo.png";

import {horizontalLoop} from "../../utils/HorizontalLoop.js"

import {Match, onMount, Switch} from "solid-js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {FiArrowLeft, FiArrowRight, FiArrowUp} from "solid-icons/fi";

gsap.registerPlugin(ScrollTrigger)
export const About = () => {
    let loop
    const partner_change = {duration: .8, ease: "power2.out"}
    onMount(() => {
        document.title = "About"

        gsap.to(".section-1", {
            backgroundColor: "#231f20",
            scrollTrigger: {
                trigger: ".section-1",
                start: "top top",
                end: () => "+=" + 1/2 * innerHeight,
                scrub: 1,
                once: true,
                // markers: true,
            }
        })
        gsap.to(".intro-text", {
            color: "#FFFFFF",
            scrollTrigger: {
                trigger: ".section-1",
                start: "top top",
                end: () => "+=" + 1/4 * innerHeight,
                scrub: 1,
                once: true,
                // markers: true,
            }
        })

        const small = innerWidth < 768
        // if larger than md
        if (!small) {
            gsap.set(".cards-info", {
                xPercent: -100
            })
        } else {
            gsap.set(".cards-info-stack", {
                 yPercent: -100
            })
        }
        gsap.set(".cards", {
            xPercent: -110
        })

        gsap.utils.toArray(".cards").forEach((card) => {
            const percard_timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: small ? "top 50%" : "top 60%",
                    end: small ? "+=50%" : "+=30%",
                    scrub: 1,
                    once: true,
                    // markers: true
                },
                defaults: {
                    ease: "power2.out"
                }
            })

            percard_timeline.to(card, {
                xPercent: 0
            }, 0)
            if (!small) {
                percard_timeline.to(card.querySelectorAll(".cards-info"), {
                    xPercent: 0,
                    stagger: .2,
                }, .4)
            } else {
                percard_timeline.to(card.querySelectorAll(".cards-info-stack"), {
                    yPercent: 0
                }, .7)
            }
        })


        const partners = gsap.utils.toArray(".partner")
        let active_element
        loop = horizontalLoop(partners, {
            paused: true,
            draggable: false,
            center: true,
            onChange: (element) => { // when the active element changes, this function gets called.
                active_element && active_element.classList.remove("active");
                element.classList.add("active");
                active_element = element;
            }
        })

        setInterval(() => {
            loop.next({duration: 1, ease: "power2.out"});
        }, 7 * 1000)
    })

    return (
        <>
            <Header/>

            <section class={"section-1 w-full h-fit text-white"}>
                <div class="relative spacer w-full h-[75vh] flex flex-col items-center justify-center text-center">
                    <header class={"intro-text text-black text-7xl"}>MEET THE OFFICERS</header>
                    <h1 class="intro-text text-black mt-8">(scroll)</h1>
                </div>
                <section class="space-y-[10rem] py-[10rem] w-[80%] md:w-fit mx-auto overflow-hidden">

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"} src={lex_png}
                             alt="Lex Padua"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">President</h1>
                            <h1 class="cards-info text-3xl mt-2">Lex Padua</h1>
                            <h1 class="cards-info text-xl">alexmariepadua19@gmail.com</h1>
                        </div>
                    </div>

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"} src={clarrise_png} alt="Clarrise Song"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Vice President</h1>
                            <h1 class="cards-info text-3xl mt-2">Clarrise Song</h1>
                            <h1 class="cards-info text-xl">clarissesong18@gmail.com</h1>
                        </div>
                    </div>

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img
                            class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"}
                            src={annabelle_png} alt="Annabelle Ho"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Treasurer</h1>
                            <h1 class="cards-info text-3xl mt-2">Annabelle Ho</h1>
                            <h1 class="cards-info text-xl">annabelle.zt.ho@gmail.com</h1>
                        </div>
                    </div>

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img
                            class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"}
                            src={ravindu_png} alt="Ravindu Marasinghe"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Secretary</h1>
                            <h1 class="cards-info text-3xl mt-2">Ravindu Marasinghe</h1>
                            <h1 class="cards-info text-xl">ravindu2008@icloud.com</h1>
                        </div>
                    </div>

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img
                            class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"}
                            src={allyson_png} alt="Allyson Chun"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Editor</h1>
                            <h1 class="cards-info text-3xl mt-2">Allyson Chun</h1>
                            <h1 class="cards-info text-xl">allysonhw96@gmail.com</h1>
                        </div>
                    </div>

                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"} src={ellie_png} alt="Ellie Nguyen"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Editor</h1>
                            <h1 class="cards-info text-3xl mt-2">Ellie Nguyen</h1>
                            <h1 class="cards-info text-xl">ellienguyen882@gmail.com</h1>
                        </div>
                    </div>
                    <div class="relative cards h-fit w-full md:w-fit md:flex">
                        <img class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"} src={nikolay_png} alt="Nikolay Li"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold] pr-1">Webmaster</h1>
                            <h1 class="cards-info text-3xl mt-2">Nikolay Li</h1>
                            <h1 class="cards-info text-xl">nikolay.li2008@gmail.com</h1>
                        </div>
                    </div>
                    <div class="elative cards h-fit w-full md:w-fit md:flex">
                        <img class={"relative w-full md:w-auto md:size-[20rem] aspect-square border-kcyellow border-16 z-10"} src={killian_png} alt="Killian Bates"/>
                        <div class={"cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden"}>
                            <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Secretary</h1>
                            <h1 class="cards-info text-3xl mt-2">Killian Bates</h1>
                            <h1 class="cards-info text-xl">killianj1010@outlook.com</h1>
                        </div>
                    </div>

                </section>
            </section>

            <section class={"w-full min-h-screen p-8 flex items-center flex-col text-center"}>
                <header class={"text-6xl sm:text-7xl mb-4"}>FACULTY ADVISORS</header>
            
                <div class={"grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1"}>
            
                    <div class={"flex flex-col h-full w-full items-center justify-center"}>
                        <img class={"object-cover border-kcyellow border-16 aspect-[3/4] w-full"} src={mrcain}
                             alt="Mr. Cain"/>
                        <h1 class={"font-[century-gothic-bold] text-5xl mt-4"}>Alfred Cain</h1>
                        <h1 class={"text-2xl"}>acain@everettsd.org</h1>
                    </div>
            
                    <div class={"flex flex-col h-full w-full items-center justify-center"}>
                        <img class={"object-cover border-kcyellow border-16 aspect-[3/4] w-full"} src={mrsvaught}
                             alt="Mrs. Vaught"/>
                        <h1 class={"font-[century-gothic-bold] text-5xl mt-4"}>Rachel Vaught</h1>
                        <h1 class={"text-2xl"}>rvaught@everettsd.org</h1>
                    </div>
            
                </div>
            </section>
            
            <section class={"w-full min-h-screen p-8 flex items-center flex-col text-center"}>
                <header class={"text-6xl sm:text-7xl mb-4"}>KIWANIS ADVISORS</header>
            
                <div class={"grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1"}>
            
                    <div class={"flex flex-col h-full w-full items-center justify-center"}>
                        <img class={"object-cover border-kcyellow border-16 aspect-[3/4] w-full"} src={mrsteckler}
                             alt="Mr. Cain"/>
                        <h1 class={"font-[century-gothic-bold] text-5xl mt-4"}>John Steckler</h1>
                        <h1 class={"text-2xl"}>johnsteckler@comcast.net</h1>
                    </div>
            
                    <div class={"flex flex-col h-full w-full items-center justify-center"}>
                        <img class={"object-cover border-kcyellow border-16 aspect-[3/4] w-full"} src={mrssteckler}
                             alt="Mrs. Vaught"/>
                        <h1 class={"font-[century-gothic-bold] text-5xl mt-4"}>Lisa Steckler</h1>
                        <h1 class={"text-2xl"}>stecklerlisa@gmail.com</h1>
                    </div>
            
                </div>
            </section>
            
            <section class={"w-full min-h-screen p-8 flex items-center flex-col text-center"}>
                <header class={"text-6xl sm:text-7xl mb-4"}>D21 LIEUTENANT GOVERNOR</header>
            
                <div class={"w-[90%] sm:w-[50%] lg:w-[35%] xl:w-[30%] flex-1 flex flex-col items-center justify-center"}>
                    <img class={"object-cover border-kcyellow border-16 h-[90%] aspect-[3/4] w-full"} src={maeve}
                         alt="Maeve"/>
                    <h1 class={"font-[century-gothic-bold] text-5xl mt-4"}>Maeve Hershlip</h1>
                    <h1 class={"text-2xl"}>ltg21@pnwkeyclub.org</h1>
                </div>
            </section>
            
            <section class={"w-full h-screen p-8 flex items-center flex-col text-white"}>
                <header class={"text-4xl sm:text-7xl text-black text-center"}>OUR PREFERRED PARTNERS AND CHARITIES</header>

                <div
                    class={"border-16 border-kcyellow mt-8 w-full h-[80%] md:h-[70%] md:aspect-[1.2] lg:w-auto lg:aspect-[1.7] flex overflow-hidden"}>

                    <div class={"partner relative w-full h-full flex-none"}>
                        <div class="absolute p-8 h-full z-10">
                            <img class={"h-[20%] object-contain"} src={thirstproject_logo} alt="Logo"/>

                            <h1 class={"text-md sm:text-2xl lg:text-3xl mt-8 sm:leading-10"}>
                                Thirst Project hopes to educate the next generation by arming students with
                                information
                                about how they can be a part of social change,
                                make a difference and encourage others to join in the effort.
                            </h1>

                            <a class={"absolute bottom-8 text-black bg-white p-4 px-8 text-xl mt-16"}
                               href="https://thirstproject.org/" target={"_blank"}>Learn More</a>
                        </div>

                        <img class={"object-cover z-0 w-full h-full"} src={thirstproject} alt="Thirst Project"/>
                    </div>

                    <div class={"partner relative w-full h-full flex-none"}>
                        <div class="absolute p-8 h-full z-10">
                            <img class={"h-[20%] object-contain"} src={unicef_logo} alt="Logo"/>

                            <h1 class={"text-md sm:text-2xl lg:text-3xl mt-8 sm:leading-10"}>
                                UNICEF is the only organization of the United Nations dedicated exclusively to
                                children.
                                Working with other United Nations bodies, governments and non-governmental
                                organizations,
                                UNICEF helps to provide for children’s needs in more than 150 developing countries
                                through community-based services in primary health care,
                                basic education and safe water and sanitation.
                            </h1>

                            <a class={"absolute bottom-8 text-black bg-white p-4 px-8 text-xl mt-16"}
                               href="https://www.unicef.org/" target={"_blank"}>Learn More</a>
                        </div>

                        <img class={"object-cover z-0 w-full h-full"} src={unicef} alt="Unicef"/>
                    </div>

                    <div class={"partner relative w-full h-full flex-none"}>
                        <div class="absolute p-8 h-full z-10">
                            <img class={"h-[20%] object-contain"} src={erikaslighthouse_logo} alt="Logo"/>

                            <h1 class={"text-md sm:text-2xl lg:text-3xl mt-8 sm:leading-10"}>
                                The mission of Erika's Lighthouse is to make sure no young person feels alone in
                                their depression.
                                This nonprofit organization encourages good mental health and strives to break down
                                the stigma surrounding mental health issues.
                                Erika's Lighthouse is dedicated to creating a community of empathy and education and
                                has resources and programs for students and educators, grades 4-12.
                            </h1>

                            <a class={"absolute bottom-8 text-black bg-white p-4 px-8 text-xl mt-16"}
                               href="https://erikaslighthouse.org/" target={"_blank"}>Learn More</a>
                        </div>

                        <img class={"object-cover brightness-[.2] z-0 w-full h-full"} src={erikaslighthouse}
                             alt="Erika's Lighthouse"/>
                    </div>

                    <div class={"partner relative w-full h-full flex-none"}>
                        <div class="absolute p-8 h-full z-10">
                            <img class={"h-[20%] object-contain"} src={schoolhouse_logo} alt="Logo"/>

                            <h1 class={"text-md sm:text-2xl lg:text-3xl mt-8 sm:leading-10"}>
                                Want to make an impact and have fun while doing it? Looking for a service project
                                that you can complete from the comfort of your bedroom?
                                Key Club has partnered with Schoolhouse to bring free tutoring to thousands of
                                learners across the world.
                                If you're interested in learning something new, or you're interested in becoming a
                                tutor yourself, sign up today!
                            </h1>

                            <a class={"absolute bottom-8 text-black bg-white p-4 px-8 text-xl mt-16"}
                               href="https://schoolhouse.world/key-club" target={"_blank"}>Learn More</a>
                        </div>

                        <img class={"object-cover brightness-[1.2] z-0 w-full h-full"} src={schoolhouse}
                             alt="schoolhouse"/>
                    </div>

                    <div class={"partner relative w-full h-full flex-none"}>
                        <div class="absolute p-8 h-full z-10">
                            <img class={"h-[20%] object-contain"} src={collegewise_logo} alt="Logo"/>

                            <h1 class={"text-md sm:text-2xl lg:text-3xl mt-8 sm:leading-10"}>
                                Collegewise helps identify the college that’s right for you, assists with the
                                application process,
                                and provides tutoring for ACT/SAT exams. While a paid subscription is available for
                                those who wish to access it,
                                every Key Club member has access to a suite of Collegewise resources on the Runway
                                platform as a member benefit.
                            </h1>

                            <a class={"absolute bottom-8 text-black bg-white p-4 px-8 text-xl mt-16"}
                               href="https://collegewise.com/" target={"_blank"}>Learn More</a>
                        </div>

                        <img class={"object-cover z-0 w-full h-full"} src={collegewise} alt="Collegewise"/>
                    </div>

                </div>

                <div class="flex text-black gap-8 mt-4">
                    <button class={"border-1 rounded-xl"}
                            onclick={() => loop.previous(partner_change)}
                    >
                        <FiArrowLeft class={"size-[4rem]"}/>
                    </button>
                    <button class={"border-1 rounded-xl"}
                            onclick={() => loop.next(partner_change)}
                    >
                        <FiArrowRight class={"size-[4rem]"}/>
                    </button>
                </div>
            </section>

            <section class={"w-full h-screen flex flex-col lg:flex-row"}>
                <div
                    class={"flex flex-col items-center justify-center p-8 text-center w-full h-1/2 lg:w-1/2 lg:h-full"}>
                    <header class={"text-4xl sm:text-7xl"}>OUR KIWANIS</header>
                    <h1 class={"text-xl sm:text-3xl mt-8"}>
                        JHS Key Club is sponsored by the Kiwanis of Mill Creek.
                        Kiwanis is an international community of clubs in which is dedicated to serving the
                        community and the lives of the children around it.
                    </h1>

                    <div>
                        <Switch>
                            <Match when={innerWidth > 768}>
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKiwanisofmillcreek&tabs&width=500&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                    width="500" height="130" style="border:none;overflow:hidden" scrolling="no"
                                    frameborder="0"
                                    class={"outline-none mt-8"}
                                    allowfullscreen="true"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
                            </Match>
                            <Match when={innerWidth <= 768}>
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKiwanisofmillcreek&tabs&width=400&height=80&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                    width="400" height="80" style="border:none;overflow:hidden" scrolling="no"
                                    frameborder="0"
                                    class={"outline-none mt-4"}
                                    allowfullscreen="true"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
                            </Match>
                        </Switch>
                        <div class={"flex items-center ml-4 text-xl"}>
                            <FiArrowUp/>
                            <h1>follow our Kiwanis!</h1>
                        </div>
                    </div>
                </div>

                <div class={"w-full h-1/2 lg:w-1/2 lg:h-full"}>
                    <img class={"w-full h-full object-cover"} src={kiwanis} alt="Mill Creek Kiwanis"/>
                </div>
            </section>

            <section class="w-full p-8 my-[4rem] text-center">
                <header class={"text-4xl sm:text-7xl"}>MORE WEBSITES</header>
                <h1 class={"mt-4 mb-8 text-3xl"}>Check out our international and district websites to learn more or
                    catch up with the
                    buzz!</h1>

                <div class="flex flex-col md:flex-row items-center justify-center mx-auto gap-8 text-4xl">
                    <a class={"bg-kcyellow p-4 px-8"} href="https://www.keyclub.org/">Key Club</a>
                    <a class={"bg-[#c61165] text-white p-4 px-8"} href="https://pnwkeyclub.org/">PNW Key Club</a>
                </div>
            </section>

            <Footer/>
        </>
    )
}