<script>
    import gsap from "gsap";
    import {ScrollTrigger} from "gsap/ScrollTrigger";
    import {onMount} from "svelte";
    import axios from "axios";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let photo_urls = $state([])
    let featured_image = $state("")

    const zone_count = 20
    let columns = $state(6)
    let rows = $state(6)

    let featured
    let background
    let superwrapper
    let wrapper
    let title
    let backdrop

    let rem

    const window_resize_handler = () => {
        if (innerWidth <= 640) {
            columns = 2
            rows = 14
        } else if (innerWidth > 640 && innerWidth <= 768) {
            columns =3
            rows = 9
        } else if (innerWidth > 768 && innerWidth <= 1024) {
            columns = 4
            rows = 7
        } else if (innerWidth > 1024 && innerWidth <= 1280) {
            columns = 5
            rows = 6
        } else if (innerWidth > 1280) {
            columns = 6
            rows = 6
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

    onMount(async () => {
        gsap.registerPlugin(ScrollTrigger);
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

        document.title = "Gallery"

        // loads photos
        const result = await axios({
            method: "get",
            url: "/api/get_photos"
        })
        photo_urls = result.data

        // reactive resize
        addEventListener("resize", window_resize_handler)
        window_resize_handler()

        gsap.set(backdrop, {
            backdropFilter: "blur(10px)",
        })
        gsap.set(wrapper, {
            scale: 1.3,
            transformOrigin: "center center"
        })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: superwrapper,
                start: `${2 * rem} top`,
                // markers: true
            },
            defaults: {
                ease: "power2.out",
            }
        })
        timeline.to(title, {
            scale: .8,
            duration: .7
        }, 0)
        timeline.to(title, {
            yPercent: -140,
            duration: .7
        }, .05)
        timeline.to(backdrop, {
            backdropFilter: "blur(0px)",
            duration: 1,
            onComplete: () => gsap.set(backdrop, {display: "none"})
        }, .2)
        timeline.to(wrapper, {
            scale: 1,
            duration: 1
        }, .2)

        return () => {
            removeEventListener("resize", window_resize_handler)
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    })

    $effect(() => {
        if (featured_image !== "") {
            gsap.set([featured, background], {
                display: "block",
                opacity: 0
            })
            gsap.to([featured, background], {
                opacity: 1,
                duration: .5,
                ease: "power2.out",
            })
        } else {
            gsap.to([featured, background], {
                opacity: 0,
                duration: .2,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set([featured, background], {
                        display: "none",
                    })
                }
            })
        }
    })
</script>

<section bind:this={superwrapper} class={"overflow-hidden flex flex-col items-center"}>
    <div class={"relative z-20 w-full"}>
        <Header/>
    </div>
    <header bind:this={title}
            class={"z-10 absolute text-kcyellow text-8xl md:text-[10rem] tracking-wide top-[17rem]"}>Gallery
    </header>
    <section bind:this={wrapper}
            class={"xl:grid p-4 md:p-8 gap-4 md:gap-8 relative w-full h-[200vh] bg-white text-white overflow-hidden"}
            style="
                        display: grid;
                        grid-template-columns: repeat({columns}, minmax(0, 1fr));
                        grid-template-rows: repeat({rows}, minmax(0, 1fr));
                    ">
        <section bind:this={backdrop} class={"z-0 absolute w-full h-full"}></section>
        {#each generate_grid([], [{ x: 0, y: 0, width: columns, height: rows }], zone_count) as each, index}
            <button class="border-3 border-kcyellow text-black overflow-hidden"
                    onmouseover={() => animate_image_hover(`image-${index}`, true)}
                    onmouseleave={() => animate_image_hover(`image-${index}`, false)}
                    onfocus={() => null}
                    onclick={() => (featured_image = photo_urls[index])}
                    style="
                          grid-column-start: {each.x + 1};
                          grid-column: span {each.width} / span {each.width};
                          grid-row-start: {each.y + 1};
                          grid-row: span {each.height} / span {each.height};
                    "
            >
                <img
                        id="image-{index}"
                        class="object-cover w-full h-full"
                        src="{photo_urls[index]}"
                        alt="{photo_urls[index]}"
                />
            </button>
        {/each}
    </section>
    <h1 class={"text-black text-center text-4xl my-4"}>
        <button class={"cursor-pointer underline"} onclick={() => {
                        location.reload()
                        scrollTo(0, 0)
                    }}>Refresh
        </button>
        the page, it's different every time!
    </h1>
</section>

<Footer/>

<img bind:this={featured} src={featured_image} alt="Featured image"
     class={"fixed z-30 max-w-[80vw] max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-kcyellow object-contain"}/>

<button onclick={() => featured_image=""} bind:this={background}
        class={"fixed z-20 top-0 left-0 backdrop-blur-sm w-screen h-screen cursor-default"}></button>