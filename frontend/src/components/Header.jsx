import {createEffect, createSignal, onCleanup, onMount} from "solid-js";
import {FiArrowDown} from "solid-icons/fi";
import {A} from "@solidjs/router"
import gsap from "gsap";

export const Header = () => {
    const [open, set_open] = createSignal(false)
    let menu_height

    onMount(() => {
        menu_height = document.querySelector(".menu").offsetHeight
        addEventListener("click", (event) => handle_click_outside(event))
    })

    onCleanup(() => removeEventListener("click", (event) => handle_click_outside(event)))

    createEffect(() => {
        gsap.to(".menu", {
            y: open() ? menu_height: 0,
            duration: .4,
            boxShadow: open() ? "0px 20px 25px -5px rgba(0, 0, 0, .3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            ease: "power2.out"
        })
    })

    const handle_click_outside = (event) => {
        if (open() && !document.querySelector(".menu").contains(event.target) && !document.querySelector(".menu-button").contains(event.target)) {
            set_open(false)
        }
    }

    return (
        <>
            <section class={"relative header w-full z-30"}>
                <div class={"relative w-full h-full top-0 left-0 z-30 p-4 flex flex-col items-center bg-white"}>
                    <a class={"mb-2"} href={"/"}>
                        <img class={"h-[4rem] object-contain"} src="/keyclub_horizontal_black.png" alt="Key Club Logo"/>
                        <h1 class={"text-4xl text-black/70"}>Henry M. Jackson High School</h1>
                    </a>

                    <ul class={"hidden lg:flex lg:space-x-8 xl:space-x-16 items-center mt-6 text-2xl"}>
                        <A class={"hover:underline"} href="/">Home</A>
                        <A class={"hover:underline"} href="/about">About</A>
                        <A class={"hover:underline"} href="/events">Events</A>
                        <A class={"hover:underline"} href="/districtproject">District Project</A>
                        <A class={"hover:underline"} href="/membership">Membership</A>
                        <A class={"hover:underline"} href="/gallery">Gallery</A>
                        <A class={"hover:underline"} href="/contact">Contact Us</A>
                    </ul>

                    <button onclick={() => set_open(true)}
                            class={"menu-button my-auto lg:hidden w-fit p-1 rounded-xl border-1"}
                    >
                        <FiArrowDown
                            class={"size-[2rem]"}
                        />
                    </button>
                </div>

                <div class="absolute bg-white w-full h-full top-0 left-0 z-20"/>

                <section class={"menu absolute bottom-0 flex-none inset-x-0 w-fit mx-auto z-0 bg-white p-8 rounded-b-2xl z-10"}>
                    <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
                        <A class={"hover:underline"} href="/">Home</A>
                        <A class={"hover:underline"} href="/about">About</A>
                        <A class={"hover:underline"} href="/events">Events</A>
                        <A class={"hover:underline"} href="/districtproject">District Project</A>
                        <A class={"hover:underline"} href="/membership">Membership</A>
                        <A class={"hover:underline"} href="/gallery">Gallery</A>
                        <A class={"hover:underline"} href="/contact">Contact Us</A>
                    </ul>
                </section>
            </section>
        </>
    )
}