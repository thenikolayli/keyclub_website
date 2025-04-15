import {onMount} from "solid-js";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import membeship_cover from "../assets/membership/membership_cover.jpg";

export const Membership = () => {
    onMount(() => document.title = "Membership")

    return (
        <>
            <Header/>
            <section class={"w-full h-screen min-h-screen"}>
                <div class={"relative w-full h-1/3 flex flex-col items-center justify-center"}>
                    <header class={"text-white text-7xl"}>
                        REGISTRATION IS OPEN
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src={membeship_cover} alt="Membership Cover"/>
                </div>


            </section>
            <Footer/>
        </>
    )
}