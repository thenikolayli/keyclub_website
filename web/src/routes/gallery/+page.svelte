<script>
    import gsap from "gsap";
    import {onMount} from "svelte";
    import axios from "axios";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ImageHeader from "$lib/components/ImageHeader.svelte";

    let photoUrls = $state([])
    let featuredImage = $state("")

    const zone_count = 20
    let columns = $state(6)
    let rows = $state(6)

    let featured
    let background

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

    const animate_image_hover = (imageId, start) => {
        console.log(start)
        gsap.to(`#${imageId}`, {
            transformOrigin: "center center",
            scale: start ? 1.3 : 1,
            duration: .3,
            ease: "power2.out"
        })
    }

    const generate_grid = (indivisibleZones, divisibleZones, zoneGoal) => {
        if (indivisibleZones.length + divisibleZones.length < zoneGoal && divisibleZones.length > 0) {
            // picks value and removes it from the divisible zones
            const pickIndex = Math.floor(Math.random() * divisibleZones.length);
            const pick = divisibleZones.splice(pickIndex, 1)[0];
            let divisionAxis;
            let dividedZones = []

            // determines division axis
            if (pick.width > pick.height) {
                divisionAxis = "horizontal"
            } else if (pick.height > pick.width) {
                divisionAxis = "vertical"
            } else {
                divisionAxis = ["horizontal", "vertical"][Math.floor(Math.random() * 2)];
            }

            // divides
            if (divisionAxis === "horizontal") {
                const half = Math.floor(pick.width / 2);
                const remainder = pick.width - half;
                // console.log(pick.width, half, remainder)

                dividedZones.push({x: pick.x, y: pick.y, width: half, height: pick.height})
                dividedZones.push({x: pick.x + half, y: pick.y, width: remainder, height: pick.height})
            } else if (divisionAxis === "vertical") {
                const half = Math.floor(pick.height / 2);
                const remainder = pick.height - half;
                // console.log(pick.height, half, remainder)

                dividedZones.push({x: pick.x, y: pick.y, width: pick.width, height: half})
                dividedZones.push({x: pick.x, y: pick.y + half, width: pick.width, height: remainder})
            }

            for (const each of dividedZones) {
                if (each.width === 1 && each.height === 1) {
                    indivisibleZones.push(each)
                } else {
                    divisibleZones.push(each)
                }
            }

            return generate_grid(indivisibleZones, divisibleZones, zoneGoal);
        } else {
            let zones = indivisibleZones.concat(divisibleZones);
            zones.sort((a, b) => a.y - b.y || a.x - b.x);
            return zones
        }
    }

    onMount(async () => {
        document.title = "Gallery"

        // loads photos
        const result = await axios({
            method: "get",
            url: "/api/gallery/get_photos"
        })
        photoUrls = result.data

        // reactive resize
        addEventListener("resize", window_resize_handler)
        window_resize_handler()
    })

    // animations for when an image is clicked to be featured
    $effect(() => {
        if (featuredImage !== "") {
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

<Header/>
<section class="overflow-hidden flex flex-col items-center bg-stone-200">
    <ImageHeader text="Gallery" imageSrc="/gallery.jpg" dim={true}/>
    <section
            class="xl:grid p-4 md:p-8 gap-4 md:gap-8 relative w-full h-[200vh] bg-stone-200 text-stone-200 overflow-hidden"
            style="
                        display: grid;
                        grid-template-columns: repeat({columns}, minmax(0, 1fr));
                        grid-template-rows: repeat({rows}, minmax(0, 1fr));
                    ">
        {#each generate_grid([], [{ x: 0, y: 0, width: columns, height: rows }], zone_count) as each, index}
            <button class="border-3 border-kcyellow text-black overflow-hidden"
                    onmouseover={() => animate_image_hover(`image-${index}`, true)}
                    onmouseleave={() => animate_image_hover(`image-${index}`, false)}
                    onfocus={() => null}
                    onclick={() => featuredImage = photoUrls[index]}
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
                        src="{photoUrls[index]}"
                        alt="{photoUrls[index]}"
                />
            </button>
        {/each}
    </section>
    <h1 class="bg-stone-200 text-kcblack text-center text-4xl py-4">
        <button class="cursor-pointer underline" onclick={() => {
                        location.reload()
                        scrollTo(0, 0)
                    }}>Refresh
        </button>
        the page, it's different every time!
    </h1>
</section>
<Footer/>

<img bind:this={featured} src={featuredImage} alt=""
     class="fixed z-30 max-w-[80vw] max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-kcyellow object-contain"/>

<button onclick={() => featuredImage = ""} bind:this={background} aria-label="Click off"
        class="fixed z-20 top-0 left-0 backdrop-blur-sm w-screen h-screen cursor-default"></button>