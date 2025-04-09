import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import OfficerPhoto from "../components/OfficerPhoto.tsx";
import gsap from "gsap";
import kiwanis from "../assets/about/kiwanis.jpg";

import lex_png from "../assets/about/lex.png";
import clarrise_png from "../assets/about/clarrise.png";
import annabelle_png from "../assets/about/annabelle.png";
import ravindu_png from "../assets/about/ravindu.png";
import allyson_png from "../assets/about/allyson.png";
import ellie_png from "../assets/about/ellie.png";
import nikolay_png from "../assets/about/nikolay.png";
import killian_png from "../assets/about/killian.png";

import charlie_png from "../assets/about/charlie2.png";
import {onMount} from "solid-js";

const About = () => {

    onMount(() => {
        gsap.set(".pnw-bg", {
            transformOrigin: "center left",
            scaleX: "100%"
        })
        gsap.set(".kc-bg", {
            transformOrigin: "center left",
            scaleX: "100%"
        })
    })

    const animate_button = (start: boolean, bg: string) => {
        gsap.to(bg, {
            transformOrigin: "center left",
            scaleX: start ? "0%" : "100%",
            duration: .4,
            ease: "power2.out",
        })
    }

    return (
        <>
            <Header/>
            <section class={"w-full min-h-screen p-[2rem] flex flex-col items-stretch justify-center"}>
                <header class={"text-6xl font-semibold text-center mb-[2rem]"}>MEET THE OFFICERS!</header>
                <div
                    class={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-[2rem] rounded-[2rem] flex-1 bg-[#d1d1d1] p-[2rem]"}>
                    <OfficerPhoto img_src={lex_png} name={"Lex Padua"} role={"President"}
                                  email={"alexmariepadua19@gmail.com"}/>
                    <OfficerPhoto img_src={clarrise_png} name={"Clarrise Song"} role={"Vice President"}
                                  email={"clarissesong18@gmail.com"}/>
                    <OfficerPhoto img_src={annabelle_png} name={"Annabelle Ho"} role={"Treasurer"}
                                  email={"annabelle.zt.ho@gmail.com"}/>
                    <OfficerPhoto img_src={ravindu_png} name={"Ravindu Marasinghe"} role={"Secretary"}
                        email={"ravindu2008@icloud.com"}/>
                    <OfficerPhoto img_src={allyson_png} name={"Allyson Chun"} role={"Bulletin Editor"}
                                  email={"allysonhw96@gmail.com"}/>
                    <OfficerPhoto img_src={ellie_png} name={"Ellie Nguyen"} role={"Bulletin Editor"}
                                  email={"ellienguyen882@gmail.com"}/>
                    <OfficerPhoto img_src={nikolay_png} name={"Nikolay Li"} role={"Webmaster"}
                                  email={"nikolay.li2008@gmail.com"} img2={charlie_png}/>
                    <OfficerPhoto img_src={killian_png} name={"Killian Bates"} role={"Historian"}
                                  email={"killianj1010@outlook.com"}/>
                </div>
            </section>

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
                            Kiwanis is an international community of clubs in which is dedicated to serving the community and the lives of the children around it.
                        </h1>
                    </div>
                </div>
                <img class={"w-1/2 h-full object-cover"} src={kiwanis} alt="Mill Creek Kiwanis"/>
            </section>

            <section class="w-full p-[2rem] text-center">
                <header class={"text-6xl"}>MORE WEBSITES</header>
                <h1 class={"mt-[1rem] mb-[2rem]"}>Check out our district websites to learn more or catch up with the buzz!</h1>

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

export default About