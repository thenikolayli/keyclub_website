import {createEffect, createSignal, onCleanup, onMount} from "solid-js";
import {A} from "@solidjs/router"
import gsap from "gsap";

export const Header = () => {
    const [popen, set_popen] = createSignal(false)
    const [fvopen, set_fvopen] = createSignal(false)

    let pages
    let forvolunteers
    let pbutton
    let fvbutton
    let pheight
    let fvheight

    onMount(() => {
        pheight = pages.offsetHeight
        fvheight = forvolunteers.offsetHeight
        addEventListener("click", (event) => handle_click_outside(event))
    })

    onCleanup(() => removeEventListener("click", (event) => handle_click_outside(event)))

    createEffect(() => {
        gsap.to(pages, {
            y: popen() ? pheight: 0,
            duration: .4,
            boxShadow: popen() ? "0px 20px 25px -5px rgba(0, 0, 0, .3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            ease: "power2.out"
        })
        gsap.to(forvolunteers, {
            y: fvopen() ? fvheight: 0,
            duration: .4,
            boxShadow: fvopen() ? "0px 20px 25px -5px rgba(0, 0, 0, .3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            ease: "power2.out"
        })
    })

    const handle_click_outside = (event) => {
        if (popen() && !pages.contains(event.target) && !pbutton.contains(event.target)) {
            set_popen(false)
        }
        if (fvopen() && !forvolunteers.contains(event.target) && !fvbutton.contains(event.target)) {
            set_fvopen(false)
        }
    }

    return (
        <section class={"relative header w-full z-30"}>
            <div class={"relative w-full h-full top-0 left-0 z-30 p-4 flex flex-col items-center bg-white"}>
                <A href={"/"}>
                    <img class={"h-[4rem] object-contain"} src="/keyclub_horizontal_black.png" alt="Key Club Logo"/>
                    <h1 class={"text-4xl text-gray-600"}>Henry M. Jackson High School</h1>
                </A>

                <ul class={"hidden lg:flex lg:space-x-8 xl:space-x-16 items-center mt-6 text-2xl"}>
                    <A class={"hover:underline"} href="/">Home</A>
                    <A class={"hover:underline"} href="/about">About</A>
                    <A class={"hover:underline"} href="/events">Events</A>
                    <A class={"hover:underline"} href="/districtproject">District Project</A>
                    <A class={"hover:underline"} href="/membership">Membership</A>
                    <A class={"hover:underline"} href="/gallery">Gallery</A>
                    <A class={"hover:underline"} href="/contact">Contact Us</A>
                </ul>

                <div class="flex justify-between mt-4 w-full px-4 space-x-8">
                    <button onclick={() => set_popen(!popen())} ref={pbutton}
                            class={"lg:hidden text-xl w-1/2 p-2 bg-kcyellow"}>
                        Pages
                    </button>

                    <button onclick={() => set_fvopen(!fvopen())} ref={fvbutton}
                            class={"lg:hidden text-xl w-1/2 p-2 bg-kcyellow"}>
                        For Volunteers
                    </button>
                </div>
            </div>

            <div class="absolute bg-white w-full h-full top-0 left-0 z-20"/>

            <section ref={pages}
                     class={"absolute bottom-0 flex-none inset-x-0 w-fit mx-auto z-0 bg-white p-8 z-10"}>
                <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
                    <A class={"w-full"} href="/">Home</A>
                    <A class={"w-full"} href="/about">About</A>
                    <A class={"w-full"} href="/events">Events</A>
                    <A class={"w-full"} href="/districtproject">District Project</A>
                    <A class={"w-full"} href="/gallery">Gallery</A>
                    <A class={"w-full"} href="/membership">Membership</A>
                    <A class={"w-full"} href="/contact">Contact Us</A>
                </ul>
            </section>

            <section ref={forvolunteers}
                     class={"absolute bottom-0 flex-none inset-x-0 w-fit mx-auto z-0 bg-white p-8 z-10"}>
                <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
                    <A class={"w-full"} href="/events">Events</A>
                    <A class={"w-full"} href="/hours">Check Hours</A>
                    <A class={"w-full"} href="/districtproject">District Project</A>
                    <A class={"w-full"} href="/membership">Membership</A>
                    <A class={"w-full"} href="/contact">Contact Us</A>
                </ul>
            </section>
        </section>
    )
}