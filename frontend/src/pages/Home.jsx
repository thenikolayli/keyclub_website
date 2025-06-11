import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import cover_jpg from "../assets/home/cover.jpg"
import home_gif from "../assets/home/gif.webm"
import committees_jpg from "../assets/home/committees.jpg"
import remind_jpg from "../assets/home/remind.jpg"
import {onMount} from "solid-js";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);
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

    return (
        <>
            <section class={"w-full h-screen flex flex-col"}>
                <Header/>
                <div class={"relative flex-1"}>
                    <img class={"h-full w-full object-cover"} src={cover_jpg} alt="Cover image"/>

                    <div class={"absolute inset-x-0 mx-auto top-[25%] z-10 text-white text-center"}>
                        <h1 class={"intro1 text-4xl"}>
                            we don't make keys...
                        </h1>
                        <h1 class={"intro2 text-4xl"}>
                            we make a
                        </h1>
                        <h1 class={"intro3 text-7xl mt-2"}>
                            difference!
                        </h1>
                        <header class={"intro4 text-7xl mt-4"}>
                            Henry M. Jackson High School Key Club
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
                        <h1 class="mt-8 text-3xl w-full xl:w-[75%]">
                            Key Club is a student-led volunteering organization. Jackson High School is one of 13
                            schools in Division 21, currently standing as the club with the most members. Key Club
                            is a great opportunity for students to volunteer for their community and simultaneously
                            make new friends within the division with students from other schools.
                        </h1>
                    </div>
                </div>
            </section>

            <section class={"relative slides h-[100vh] text-white bg-kcyellow"}>
                <section class="relative p-2 top-0 w-full h-[100vh] bg-kcblack border-3 border-kcyellow rounded-2xl">
                    <header class={"text-5xl h-[5vh]"}>Committees</header>

                    <h1 class={"text-5xl mt-4"}>
                        Our Key Club has 4 committees
                    </h1>
                </section>
                <section class="slide p-2 relative top-[107vh] w-full h-[93vh] bg-kcblack border-3 border-kcyellow rounded-2xl">
                    <header class={"text-5xl h-[5vh]"}>Spirit Committee</header>
                </section>
                <section class="slide p-2 relative top-[114vh] w-full h-[86vh] bg-kcblack border-3 border-kcyellow rounded-2xl">
                    <header class={"text-5xl h-[5vh]"}>Service Committee</header>
                </section>
                <section class="slide p-2 relative top-[121vh] w-full h-[79vh] bg-kcblack border-3 border-kcyellow rounded-2xl">
                    <header class={"text-5xl h-[5vh]"}>Decoration Committee</header>
                </section>
                <section class="slide p-2 relative top-[128vh] w-full h-[72vh] bg-kcblack border-3 border-kcyellow rounded-2xl">
                    <header class={"text-5xl h-[5vh]"}>Leadership Committee</header>
                </section>
            </section>

            <section class={"w-full h-screen flex"}>
                <div class={"w-1/2 p-4 flex items-center justify-center"}>
                    <div class={"text-center flex flex-col items-center"}>
                        <header class="text-6xl">
                            SIGN UP TO OUR REMIND!
                        </header>
                        <h1 class="my-8 text-3xl w-full xl:w-[75%]">
                            Send the code corresponding
                            with your grade to 81010
                        </h1>
                        <ul class={"text-3xl text-left"}>
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