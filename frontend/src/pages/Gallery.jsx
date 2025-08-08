import {createEffect, createMemo, createSignal, onCleanup, onMount} from "solid-js";
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import axios from "axios";
import {A} from "@solidjs/router";

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

export const Gallery = () => {
    const [photo_urls, set_photo_urls] = createSignal([])
    const [featured_image, set_featured_image] = createSignal("")

    const zone_count = 20
    const [columns, set_columns] = createSignal(6)
    const [rows, set_rows] = createSignal(6)

    let featured_ref
    let background_ref

    const window_resize_handler = () => {
        if (innerWidth <= 640) {
            set_columns(2)
            set_rows(14)
        } else if (innerWidth > 640 && innerWidth <= 768) {
            set_columns(3)
            set_rows(9)
        } else if (innerWidth > 768 && innerWidth <= 1024) {
            set_columns(4)
            set_rows(7)
        } else if (innerWidth > 1024 && innerWidth <= 1280) {
            set_columns(5)
            set_rows(6)
        } else if (innerWidth > 1280) {
            set_columns(6)
            set_rows(6)
        }
    }

    const animate_image_hover = (image_id, start) => {
        console.log(start)
        gsap.to(`#${image_id}`, {
            transformOrigin: "center center",
            scale: start ? 1.3 : 1,
            filter: start ? "blur(3px)" : "blur(0px)",
            duration: .3,
            ease: "power2.out"
        })
    }

    onMount(async () => {
        // loads photos
        const result = await axios({
            method: "get",
            url: "/api/get_photos"
        })
        set_photo_urls(result.data)

        // reactive resize
        addEventListener("resize", window_resize_handler)
        window_resize_handler()

        gsap.set(".backdrop", {
            backdropFilter: "blur(10px)",
        })
        gsap.set(".wrapper", {
            scale: 1.3,
            transformOrigin: "center center"
        })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".superwrapper",
                start: `${2 * rem} top`,
                // markers: true
            },
            defaults: {
                ease: "power2.out",
            }
        })
        timeline.to(".title", {
            scale: .8,
            duration: .7
        }, 0)
        timeline.to(".title", {
            yPercent: -140,
            duration: .7
        }, .05)
        timeline.to(".backdrop", {
            backdropFilter: "blur(0px)",
            duration: 1,
            onComplete: () => gsap.set(".backdrop", {display: "none"})
        }, .2)
        timeline.to(".wrapper", {
            scale: 1,
            duration: 1
        }, .2)
    })

    onCleanup(() => {
        removeEventListener("resize", window_resize_handler)
    })

    const generate_grid = (indivisible_zones, divisible_zones, zone_goal) => {
        if (indivisible_zones.length + divisible_zones.length < zone_goal && divisible_zones.length > 0) {
            // picks value and removes it from the divisible zones
            const pick_index = Math.floor(Math.random() * divisible_zones.length);
            const pick = divisible_zones.splice(pick_index, 1)[0];
            let division_axis;
            let divided_zones = []

            // determines division axis
            if (pick.width > pick.height) {
                division_axis = "horizontal"
            } else if (pick.height > pick.width) {
                division_axis = "vertical"
            } else {
                division_axis = ["horizontal", "vertical"][Math.floor(Math.random() * 2)];
            }

            // divides
            if (division_axis === "horizontal") {
                const half = Math.floor(pick.width / 2);
                const remainder = pick.width - half;
                // console.log(pick.width, half, remainder)

                divided_zones.push({x: pick.x, y: pick.y, width: half, height: pick.height})
                divided_zones.push({x: pick.x + half, y: pick.y, width: remainder, height: pick.height})
            } else if (division_axis === "vertical") {
                const half = Math.floor(pick.height / 2);
                const remainder = pick.height - half;
                // console.log(pick.height, half, remainder)

                divided_zones.push({x: pick.x, y: pick.y, width: pick.width, height: half})
                divided_zones.push({x: pick.x, y: pick.y + half, width: pick.width, height: remainder})
            }

            for (const each of divided_zones) {
                if (each.width === 1 && each.height === 1) {
                    indivisible_zones.push(each)
                } else {
                    divisible_zones.push(each)
                }
            }

            return generate_grid(indivisible_zones, divisible_zones, zone_goal);
        } else {
            let zones = indivisible_zones.concat(divisible_zones);
            zones.sort((a, b) => a.y - b.y || a.x - b.x);
            // console.log(zones)
            return zones
        }
    }

    onCleanup(() => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    })

    createEffect(() => {
        if (featured_image() !== "") {
            gsap.set([featured_ref, background_ref], {
                display: "block",
                opacity: 0
            })
            gsap.to([featured_ref, background_ref], {
                opacity: 1,
                duration: .5,
                ease: "power2.out",
            })
        } else {
            gsap.to([featured_ref, background_ref], {
                opacity: 0,
                duration: .2,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set([featured_ref, background_ref], {
                        display: "none",
                    })
                }
            })

        }
    })

    return (
        <>
            <section class={"superwrapper overflow-hidden flex flex-col items-center"}>
                <div class={"relative z-20 w-full"}>
                    <Header/>
                </div>
                <header
                    class={"title z-10 absolute text-kcyellow text-8xl md:text-[10rem] tracking-wide top-[17rem]"}>Gallery
                </header>
                <section
                    class={"wrapper hidden xl:grid p-4 md:p-8 gap-4 md:gap-8 relative w-full h-[200vh] bg-white text-white overflow-hidden"}
                    style={{
                        "display": "grid",
                        "grid-template-columns": `repeat(${columns()}, minmax(0, 1fr))`,
                        "grid-template-rows": `repeat(${rows()}, minmax(0, 1fr))`,
                    }}>
                    <section class={"backdrop z-0 absolute w-full h-full"}/>
                    {createMemo(() => (
                        generate_grid([], [{
                            x: 0,
                            y: 0,
                            width: columns(),
                            height: rows()
                        }], zone_count).map((each, index) => (
                            <button
                                onmouseover={() => animate_image_hover(`image-${index}`, true)}
                                onmouseleave={() => animate_image_hover(`image-${index}`, false)}
                                onclick={() => set_featured_image(photo_urls()[index])}
                                class={"border-4 border-kcyellow text-black overflow-hidden"}
                                style={{
                                    "grid-column-start": `${each.x + 1}`,
                                    "grid-column": `span ${each.width} / span ${each.width}`,
                                    "grid-row-start": `${each.y + 1}`,
                                    "grid-row": `span ${each.height} / span ${each.height}`,
                                }}>
                                <img id={`image-${index}`} class={"object-cover w-full h-full"}
                                     src={photo_urls()[index]} alt={photo_urls()[index]}/>
                            </button>
                        ))
                    ))}
                </section>
                <h1 class={"text-black text-center text-4xl my-4"}>
                    <button class={"cursor-pointer underline"} onclick={() => {
                        location.reload()
                        scrollTo(0, 0)
                    }}>Refresh
                    </button>
                    the page, it's different every time!
                </h1>
                <Footer/>
            </section>

            <div ref={featured_ref}
                class={"fixed z-30 max-w-full max-h-full inset-0 w-fit h-fit m-auto border-6 border-kcyellow overflow-hidden"}>
                <img class={"object-contain w-full h-full"} src={featured_image()} alt="Featured image"/>
            </div>

            <button onclick={() => set_featured_image("")} ref={background_ref} class={"fixed z-20 top-0 left-0 backdrop-blur-sm w-screen h-screen cursor-default"}></button>
        </>
    )
}