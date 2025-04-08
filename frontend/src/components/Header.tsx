import header_jpg from "../assets/header.jpg"
import {VsGlobe} from "solid-icons/vs";
import {onMount} from "solid-js";
import gsap from "gsap";
// @ts-ignore
import {setLocale} from "../paraglide/runtime";

const Header = () => {
    onMount(() => {
        gsap.set(".language-select", {y: "-100%"})
    })

    const show_language_select = (start: boolean) => {
        gsap.to(".language-select", {
            y: start ? "0%" : "-100%",
            duration: .4,
            ease: "power2.out"
        })
    }

    return (
        <section class={"relative top-0 left-0 w-full flex flex-col items-center p-4"}>
            <button
                onclick={() => show_language_select(true)}
                onmouseenter={() => show_language_select(true)}
                class="absolute top-4 left-4"><VsGlobe class={"size-[1.75em]"}/></button>

            <section
                onmouseleave={() => show_language_select(false)}
                class="language-select fixed flex flex-col gap-y-4 top-0 left-0 w-fit text-2xl p-4 bg-white shadow-lg">
                <header>Choose a Language</header>
                <hr class={"-my-2"}/>
                <button onclick={() => setLocale("en")}>English</button>
                <button onclick={() => setLocale("es")}>Spanish</button>
            </section>

            <header class={"flex w-fit text-6xl tracking-widest"}>
                JHS
                <img class={"h-[1.25em] w-auto mx-2"} src={header_jpg} alt="Header image"/>
                Key Club
            </header>

            <ul class={"flex space-x-[2rem] text-reddish items-center mt-4 text-2xl"}>
                <a href="/">Home</a>
                <a href="/#about">About</a>
                <a href="/events">Events</a>
                <a href="/districtproject">District Project</a>
                <a href="/membership">Membership</a>
                <a href="/gallery">Gallery</a>
                <a href="/contactr">Contact Us</a>
            </ul>
        </section>
    )
}

export default Header;