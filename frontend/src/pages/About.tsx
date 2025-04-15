import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

import lex_png from "../assets/about/lex.png";
import clarrise_png from "../assets/about/clarrise.png";
import annabelle_png from "../assets/about/annabelle.png";
import ravindu_png from "../assets/about/ravindu.png";
import allyson_png from "../assets/about/allyson.png";
import ellie_png from "../assets/about/ellie.png";
import nikolay_png from "../assets/about/nikolay.png";
import killian_png from "../assets/about/killian.png";

import {onMount} from "solid-js";
import {animate, createTimeline, onScroll, stagger, utils} from "animejs";
import kiwanis from "../assets/about/kiwanis.jpg";

export const About = () => {
    onMount(() => {
        document.title = "About"
        utils.set(".pnw-bg", {
            transformOrigin: "center left",
            scaleX: "100%"
        })
        utils.set(".kc-bg", {
            transformOrigin: "center left",
            scaleX: "100%"
        })

        animate(".section-1", {
            backgroundColor: "#000000",
            ease: "outSine",
            autoplay: onScroll({
                // debug: true,
                target: ".section-1",
                enter: "top top",
                leave: "top 25vh",
                sync: true,
                repeat: false
            })
        })
        animate(".intro-text", {
            color: "#FFFFFF",
            ease: "outSine",
            autoplay: onScroll({
                // debug: true,
                target: ".section-1",
                enter: "top top",
                leave: "top 25vh",
                sync: true,
                repeat: false
            })
        })


        utils.set(".cards", {
            x: "-18rem"
        })
        utils.set(".cards-info", {
            x: "-100%"
        })

        utils.$(".cards").forEach((card) => {
            const timeline = createTimeline({
                autoplay: false,
                defaults: {
                    ease: "outQuad",
                    duration: 1000,
                }
            });
            timeline.add(card, {
                x: "2rem"
            }, 0)
            timeline.add(card.querySelectorAll(".cards-info"), {
                x: "0%",
                delay: stagger(250)
            }, 400)

            onScroll({
                // debug: true,
                target: card,
                enter: "center top",
                onEnter: () => timeline.play()
            })
        })
    })

    const animate_button = (start: boolean, bg: string) => {
        animate(bg, {
            transformOrigin: "center left",
            scaleX: start ? 0 : 1,
            duration: 300,
            ease: "outQuad",
        })
    }

    return (
        <>
            <Header/>

            <section class={"section-1 w-full h-fit text-white"}>
                <div class="relative spacer w-full h-[75vh] flex flex-col items-center justify-center text-center">
                    <header class={"intro-text text-black text-7xl"}>MEET THE OFFICERS</header>
                    <h1 class="intro-text text-black mt-[2rem]">(scroll)</h1>
                </div>
                <section class="space-y-[10rem] mx-auto w-fit pr-[3rem] overflow-hidden">

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={lex_png} alt="Lex Padua"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">President</h1>
                            <h1 class="cards-info">Lex Padua</h1>
                            <h1 class="cards-info text-xl!">alexmariepadua19@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={clarrise_png} alt="Lex Padua"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Vice President</h1>
                            <h1 class="cards-info">Clarrise Song</h1>
                            <h1 class="cards-info text-xl!">clarissesong18@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={annabelle_png} alt="Annabelle Ho"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Treasurer</h1>
                            <h1 class="cards-info">Annabelle Ho</h1>
                            <h1 class="cards-info text-xl!">annabelle.zt.ho@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={ravindu_png} alt="Ravindu Marasinghe"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Secretary</h1>
                            <h1 class="cards-info">Ravindu Marasinghe</h1>
                            <h1 class="cards-info text-xl!">ravindu2008@icloud.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={allyson_png} alt="Allyson Chun"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Editor</h1>
                            <h1 class="cards-info">Allyson Chun</h1>
                            <h1 class="cards-info text-xl!">allysonhw96@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={ellie_png} alt="Ellie Nguyen"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Editor</h1>
                            <h1 class="cards-info">Ellie Nguyen</h1>
                            <h1 class="cards-info text-xl!">ellienguyen882@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={nikolay_png} alt="Nikolay Li"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Webmaster</h1>
                            <h1 class="cards-info">Nikolay Li</h1>
                            <h1 class="cards-info text-xl!">nikolay.li2008@gmail.com</h1>
                        </div>
                    </div>

                    <div class="cards w-fit h-fit] flex">
                        <div class="p-[1rem] bg-white z-10">
                            <img class={"size-[16rem]"} src={killian_png} alt="Killian Bates"/>
                        </div>
                        <div class={"w-fit ml-[1rem] overflow-hidden"}>
                            <h1 class="cards-info text-5xl! font-semibold">Secretary</h1>
                            <h1 class="cards-info">Killian Bates</h1>
                            <h1 class="cards-info text-xl!">killianj1010@outlook.com</h1>
                        </div>
                    </div>
                </section>
            </section>
            <div class="relative w-full h-[75vh] bg-black"/>

            <section class={"w-full h-screen p-[2rem] flex flex-col"}>
                <section class={"grid grid-cols-3"}>
                    <div class={"relative flex flex-col"}>
                        <header class={"mx-auto text-3xl"}>
                            Faculty Advisors
                        </header>

                        <div class={"mx-auto mt-[.5rem]"}>
                            <h1 class={"text-2xl!"}>
                                Alfred Cain
                            </h1>
                            <h1 class={"text-lg!"}>
                                acain@everettsd.org
                            </h1>
                            <h1 class={"text-2xl!"}>
                                Rachel Vaught
                            </h1>
                            <h1 class={"text-lg!"}>
                                rvaught@everettsd.org
                            </h1>
                        </div>

                        <div class={"absolute right-[1rem] inset-y-0 my-auto h-3/4 w-0 border-1"}></div>
                    </div>

                    <div class={"flex flex-col"}>
                        <header class={"text-center mx-auto text-3xl"}>
                            Division 21 Lieutenant Governor
                        </header>

                        <div class={"mx-auto mt-[.5rem]"}>
                            <h1 class={"text-2xl!"}>
                                Maeve Hershlip
                            </h1>
                            <h1 class={"text-lg!"}>
                                ltg21@pnwkeyclub.org
                            </h1>
                        </div>
                    </div>

                    <div class={"relative flex flex-col"}>
                        <header class={"mx-auto text-3xl"}>
                            Kiwanis Advisors
                        </header>

                        <div class={"mx-auto mt-[.5rem]"}>
                            <h1 class={"text-2xl!"}>
                                John Steckler
                            </h1>
                            <h1 class={"text-lg!"}>
                                johnsteckler@comcast.net
                            </h1>
                            <h1 class={"text-2xl!"}>
                                Lisa Steckler
                            </h1>
                            <h1 class={"text-lg!"}>
                                stecklerlisa@gmail.com
                            </h1>
                        </div>

                        <div class={"absolute left-[1rem] inset-y-0 my-auto h-3/4 w-0 border-1"}></div>
                    </div>
                </section>

                <header class={"text-6xl my-[2rem] text-center"}>OUR PARTNERS & PREFERRED CHARITIES</header>
                <section class="flex-1">
                    <div class="bg-black h-full w-full lg:w-[60%] mx-auto"></div>
                </section>
            </section>

            <section class={"w-full h-screen flex"}>
                <div class={"w-1/2 p-[2rem] flex items-center justify-center"}>
                    <div class={"text-center flex flex-col items-center justify-center"}>
                        <header class="text-6xl">
                            OUR KIWANIS
                        </header>
                        <h1 class="mt-8 w-full xl:w-[75%]">
                            JHS Key Club is sponsored by the Kiwanis of Mill Creek.
                            Kiwanis is an international community of clubs in which is dedicated to serving the
                            community and the lives of the children around it.
                        </h1>

                        <a class={"p-[1rem] bg-black text-white text-xl my-[1rem]"} href="https://www.kiwanis.org/">
                            Learn More About Kiwanis
                        </a>

                        <a class={"p-[1rem] bg-[#0866ff] text-white text-xl"} href="https://www.facebook.com/Kiwanisofmillcreek/">
                            Mill Creek Kiwanis Facebook
                        </a>
                    </div>
                </div>
                <img class={"w-1/2 h-full object-cover"} src={kiwanis} alt="Mill Creek Kiwanis"/>
            </section>

            <section class="w-full p-[2rem] text-center">
                <header class={"text-6xl"}>MORE WEBSITES</header>
                <h1 class={"mt-[1rem] mb-[2rem]"}>Check out our district websites to learn more or catch up with the
                    buzz!</h1>

                <div class="flex text-white text-4xl mx-auto w-fit space-x-[2rem]">
                    <a
                        onmouseenter={() => animate_button(true, ".kc-bg")}
                        onmouseleave={() => animate_button(false, ".kc-bg")}
                        class="relative w-fit h-fit p-[2rem] hover:no-underline!"
                        href={"https://www.keyclub.org/"}
                        target={"_blank"}>
                        <h1 class={"text-black-outline z-20 hover:no-underline!"}>Key Club</h1>
                        <div class={"kc-bg absolute -z-10 top-0 left-0 w-full h-full object-cover bg-black"}/>
                        <img class={"absolute -z-20 top-0 left-0 w-full h-full object-contain text-shadow"}
                             src="https://ktkey.org/wp-content/uploads/Template_KeyClub_Blue-key-graphic.jpg.jpg"
                             alt="Key Club"/>
                    </a>

                    <a
                        onmouseenter={() => animate_button(true, ".pnw-bg")}
                        onmouseleave={() => animate_button(false, ".pnw-bg")}
                        class="relative w-fit h-fit p-[2rem] hover:no-underline!"
                        href={"https://pnwkeyclub.org/"}
                        target={"_blank"}>
                        <h1 class={"hover:no-underline!"}>PNW Key Club</h1>
                        <div class={"pnw-bg absolute -z-10 top-0 left-0 w-full h-full object-cover bg-black"}/>
                        <img class={"absolute -z-20 top-0 left-0 w-full h-full object-cover"}
                             src="https://i.natgeofe.com/n/1ac29c4c-43b5-41d5-8db4-668370f3cdaa/GettyImages-1130537468.gif"
                             alt="PNW Key Club"/>
                    </a>
                </div>
            </section>
            <Footer/>
        </>
    )
}