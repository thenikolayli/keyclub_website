import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {createSignal, onMount} from "solid-js";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import {A} from "@solidjs/router";
import {ResponsiveButton} from "../components/ResponsiveButton.jsx";

export const DistrictProject = () => {
    let htext_ref
    const [can_send, set_can_send] = createSignal(true)

    onMount(() => {
        document.title = "District Project"

        const header_text = SplitText.create(htext_ref).words

        gsap.fromTo(header_text, {
            yPercent: 50,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            stagger: 1/5,
            duration: .5,
            delay: .5,
            ease: "power2.out",
        })
    })


    return (
        <>
            <Header/>
            <section class="w-full h-screen">
                <div class={"relative w-full h-[30vh] flex flex-col items-center justify-center"}>
                    <header ref={htext_ref} class={"text-white text-4xl"}>
                        DISTRICT PROJECT
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover brightness-50"}
                         src="/districtproject/cover.jpg" alt="cover image"/>
                </div>

                <h1 class={"p-4 w-full text-xl"}>
                    <img class={"w-[45%] float-right"} src="/districtproject/logo.png" alt="logo"/>
                    In 25-26 year, we’ve partnered with The Ronald McDonald House Charities!
                    <br/><br/>
                    The Ronald McDonald House Charities (RMHC) is a non-profit organization that supports families with
                    sick children who need to travel for medical care. It provides a "home-away-from-home" through programs
                    like <A class={"underline"} href="https://rmhc.org/our-core-programs/ronald-mcdonald-house-programs">Ronald McDonald Houses</A> and
                    <A class={"underline"} href="https://rmhc.org/our-core-programs/ronald-mcdonald-family-room-programs">Family Rooms</A> near hospitals.
                    <br/><br/>
                    RMHC's mission is to strengthen families,
                    promote healing, and ensure the best health outcomes for children by removing barriers to healthcare.

                    <ResponsiveButton init_text={"Visit their website"} clicked_text={"..."} on_click={() => window.open("https://rmhc.org/", "_blank")} can_send={can_send}/>
                </h1>
            </section>
            <Footer/>
        </>
    )
}