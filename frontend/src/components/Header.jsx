import keyclub_horizontal_logo from "../assets/keyclub_horizontal_black.png";
import {onMount} from "solid-js";
import {FiArrowDown} from "solid-icons/fi";
import gsap from "gsap";

export const Header = () => {
    onMount(() => {
        gsap.set(".menu", {
            yPercent: -110
        })
    })

    const show_menu = (start) => {
        gsap.to(".menu", {
            yPercent: start ? 0 : -110,
            duration: .4,
            ease: "power2.out"
        })
    }

    return (
        <>
            <section class={"relative p-4 w-full flex flex-col items-center justify-center bg-white z-10 h-[12rem]"}>
                <header class={"h-[6rem]"}>
                    <img class={"h-[4rem]"} src={keyclub_horizontal_logo} alt="Key Club Logo"/>
                    <h1 class={"text-4xl text-black/70"}>Henry M. Jackson High School</h1>
                </header>

                <ul class={"hidden lg:flex lg:space-x-8 xl:space-x-16 items-center mt-6 text-2xl"}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/events">Events</a>
                    <a href="/districtproject">District Project</a>
                    <a href="/membership">Membership</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contact">Contact Us</a>
                </ul>

                <FiArrowDown
                    onmouseenter={() => show_menu(true)}
                    class={"relative mt-4 lg:hidden size-[2rem]"}
                />
            </section>

            <section
                onmouseleave={() => show_menu(false)}
                class={"menu absolute top-[12rem] inset-x-0 w-fit mx-auto shadow-xl z-0 bg-white p-[2rem] rounded-b-2xl"}>
                <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/events">Events</a>
                    <a href="/districtproject">District Project</a>
                    <a href="/membership">Membership</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contact">Contact Us</a>
                </ul>
            </section>
        </>
    )
}