import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
// @ts-ignore
import {m} from "../paraglide/messages.js"
import cover_jpg from "../assets/home/cover.jpg"
import home_gif from "../assets/home/gif.webm"
import committees_jpg from "../assets/home/committees.jpg"
import remind_jpg from "../assets/home/remind.jpg"
import {onMount} from "solid-js";

export const Home = () => {
    onMount(() => document.title = "Home")

    return (
        <>
            <section class={"w-full h-screen flex flex-col"}>
                <Header/>
                <div class={"relative flex-1 bg-black"}>
                    <img class={"h-full w-full object-cover"} src={cover_jpg} alt="Cover image"/>

                    <div class={"absolute inset-0 top-0 z-10 flex flex-col text-white items-center justify-center"}>
                        <h1 class={"text-2xl"}>
                            "We don't make keys... we make a difference!"
                        </h1>
                        <header class={"text-8xl mt-4"}>
                            JHS Key Club
                        </header>
                    </div>
                </div>
            </section>

            <section class={"w-full h-screen flex"}>
                <video autoplay loop muted class={"w-1/2 object-cover"}>
                    <source src={home_gif} type="video/webm"/>
                </video>

                <div class={"w-1/2 p-[2rem] flex items-center justify-center"}>
                    <div class={"text-center flex flex-col items-center justify-center"}>
                        <header class="text-6xl">
                            WHO ARE WE?
                        </header>
                        <h1 class="mt-8 w-full xl:w-[75%]">
                            Key Club is a student-led volunteering organization. Jackson High School is one of 13
                            schools in Division 21, currently standing as the club with the most members. Key Club
                            is a great opportunity for students to volunteer for their community and simultaneously
                            make new friends within the division with students from other schools.
                        </h1>
                    </div>
                </div>
            </section>

            <section class={"relative w-full h-screen text-white"}>
                <img class={"w-full h-full object-cover"} src={committees_jpg} alt="Committees img"/>
                <header class={"absolute top-[4rem] right-[4rem] text-7xl z-10 text-right"}>
                    Committee <br/> applications are closed
                </header>

                <div class={"absolute z-10 inset-0 m-auto w-full h-fit grid grid-cols-3"}>
                    <div class="rounded-[3rem] p-[2rem] w-[90%] mx-auto bg-black/50 backdrop-blur border-3 border-white flex flex-col items-center">
                        <header class={"text-4xl mb-4"}>DECORATION COMMITTEE</header>

                        <ul>
                            <li>— Make posters and decorations</li>
                            <li>— Help decorate for events</li>
                            <li>— Make officers advertise</li>
                        </ul>
                    </div>
                    <div class="rounded-[3rem] p-[2rem] w-[90%] mx-auto bg-black/50 backdrop-blur border-3 border-white flex flex-col items-center">
                        <header class={"text-4xl mb-4"}>SERVICE COMMITTEE</header>

                        <ul>
                            <li>— Find ways to contribute to our district project</li>
                            <li>— Plan fundraisers</li>
                        </ul>
                    </div>
                    <div class="rounded-[3rem] p-[2rem] w-[90%] mx-auto bg-black/50 backdrop-blur border-3 border-white flex flex-col items-center">
                        <header class={"text-4xl mb-4"}>SPIRIT COMMITTEE</header>

                        <ul>
                            <li>— Learn and lead district chants</li>
                            <li>— Make meeting Energizers</li>
                            <li>— Hype up our club!</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class={"w-full h-screen flex"}>
                <div class={"w-1/2 p-[2rem] flex items-center justify-center"}>
                    <div class={"text-center flex flex-col items-center"}>
                        <header class="text-6xl">
                            SIGN UP TO OUR REMIND!
                        </header>
                        <h1 class="my-8 w-full xl:w-[75%]">
                            Send the code corresponding
                            with your grade to 81010
                        </h1>
                        <ul>
                            <li>@jhsfresh25</li>
                            <li>@jhssoph25</li>
                            <li>@kcjunior25</li>
                            <li>@kcsenior25</li>
                        </ul>
                    </div>
                </div>

                <img class={"w-1/2 object-cover"} src={remind_jpg} alt="Remind image"/>
            </section>

            <Footer/>
        </>
    )
}