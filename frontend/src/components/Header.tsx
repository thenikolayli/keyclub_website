import header_jpg from "../assets/header.jpg"
import {VsGlobe} from "solid-icons/vs";
import {onMount} from "solid-js";
// @ts-ignore
import {setLocale} from "../paraglide/runtime";
import {animate, utils} from "animejs";
import {FiArrowDown} from "solid-icons/fi";

export const Header = () => {
    onMount(() => {
        utils.set(".language-select", {
            y: "-110%"
        })
        utils.set(".menu", {
            y: "-110%"
        })
    })

    const show_language_select = (start: boolean) => {
        animate(".language-select", {
            y: start ? "0%" : "-110%",
            duration: 300,
            ease: "outQuad"
        })
    }

    const show_menu = (start: boolean) => {
        animate(".menu", {
            y: start ? "0%" : "-110%",
            duration: 300,
            ease: "outQuad"
        })
    }

    return (
        <>
            <section class={"relative top-0 left-0 w-full h-[10rem] z-40 flex flex-col items-center p-[1rem] bg-white"}>
                <button
                    onclick={() => show_language_select(true)}
                    onmouseenter={() => show_language_select(true)}
                    class={"absolute top-4 left-4"}><VsGlobe class={"size-[1.75em]"}/>
                </button>
                <section
                    onmouseleave={() => show_language_select(false)}
                    class={"language-select fixed flex flex-col gap-y-4 top-0 left-0 w-fit text-2xl p-4 bg-white shadow-lg"}>
                    <header>Choose a Language</header>
                    <hr class={"-my-2"}/>
                    <button onclick={() => setLocale("en")}>English</button>
                    <button onclick={() => setLocale("es")}>Spanish</button>
                </section>

                <header class={"flex w-fit text-4xl sm:text-6xl tracking-widest"}>
                    JHS
                    <img class={"h-[1.25em] w-auto mx-2"} src={header_jpg} alt="Header image"/>
                    Key Club
                </header>

                <ul class={"hidden lg:flex lg:space-x-[1rem] xl:space-x-[4rem] text-reddish items-center mt-4 text-2xl"}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/events">Events</a>
                    <a href="/districtproject">District Project</a>
                    <a href="/membership">Membership</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contactr">Contact Us</a>
                </ul>
                <FiArrowDown
                    onmouseenter={() => show_menu(true)}
                    class={"absolute inset-x-0 mx-auto bottom-[1rem] lg:hidden size-[2rem]"}/>
            </section>

            <section
                onmouseleave={() => show_menu(false)}
                class={"menu absolute top-[10rem] inset-x-0 w-fit mx-auto shadow-xl z-30 bg-white p-[2rem] rounded-b-2xl"}>
                <ul class={"flex flex-col space-y-[1rem] text-reddish items-center text-4xl!"}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/events">Events</a>
                    <a href="/districtproject">District Project</a>
                    <a href="/membership">Membership</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contactr">Contact Us</a>
                </ul>
            </section>
        </>
    )
}