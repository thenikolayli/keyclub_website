<script>
    import gsap from "gsap";
    import {onMount} from "svelte";

    let popen = $state(false)
    let fvopen = $state(false)

    let pages
    let forvolunteers
    let pbutton
    let fvbutton
    let pheight
    let fvheight

    let mdfvtext

    onMount(() => {
        pheight = pages.offsetHeight
        fvheight = forvolunteers.offsetHeight
        addEventListener("click", (event) => handle_click_outside(event))

        if (innerWidth > 768) {
            const mdfvtext_center = mdfvtext.getBoundingClientRect().left + mdfvtext.offsetWidth/2

            gsap.set(forvolunteers, {
                right: innerWidth - mdfvtext_center - forvolunteers.offsetWidth/2
            })
        }

        return () => removeEventListener("click", (event) => handle_click_outside(event))
    })

    $effect(() => {
        gsap.to(pages, {
            y: popen ? pheight: 0,
            duration: .4,
            boxShadow: popen ? "0px 20px 25px -5px rgba(0, 0, 0, .3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            ease: "power2.out"
        })
        gsap.to(forvolunteers, {
            y: fvopen ? fvheight: 0,
            duration: .4,
            boxShadow: fvopen ? "0px 20px 25px -5px rgba(0, 0, 0, .3)" : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
            ease: "power2.out"
        })
    })

    const handle_click_outside = (event) => {
        if (popen && !pages.contains(event.target) && !pbutton.contains(event.target)) {
            popen = false
        }
        if (fvopen && !forvolunteers.contains(event.target) && !fvbutton.contains(event.target)) {
            fvopen = false
        }
    }
</script>

<section class={"relative header w-full z-30"}>
    <div class={"relative w-full h-full top-0 left-0 z-30 p-4 flex flex-col items-center bg-white"}>
        <a href={"/"}>
            <img class={"h-[4rem] object-contain"} src="/keyclub_horizontal_black.png" alt="Key Club Logo"/>
            <h1 class={"text-4xl text-gray-600"}>Henry M. Jackson High School</h1>
        </a>

        <ul class={"hidden lg:flex lg:space-x-8 xl:space-x-16 items-center mt-6 text-2xl"}>
            <li><a class={"hover:underline"} href="/">Home</a></li>
            <li><a class={"hover:underline"} href="/about">About</a></li>
            <li><a class={"hover:underline"} href="/events">Events</a></li>
            <li><a class={"hover:underline"} href="/districtproject">District Project</a></li>
            <li><a class={"hover:underline"} href="/membership">Membership</a></li>
            <li><a class={"hover:underline"} href="/contact">Contact Us</a></li>
            <li><h1 bind:this={mdfvtext} class="cursor-pointer" onmouseover={() => fvopen=true} onfocus={() => null}>For Volunteers</h1></li>
        </ul>

        <div class="flex justify-between mt-4 w-full px-4 space-x-8">
            <button onclick={() => popen=!popen} bind:this={pbutton}
                    class={"lg:hidden text-xl w-1/2 p-2 bg-kcyellow"}>
                Pages
            </button>

            <button onclick={() => fvopen=!fvopen} bind:this={fvbutton}
                    class={"lg:hidden text-xl w-1/2 p-2 bg-kcyellow"}>
                For Volunteers
            </button>
        </div>
    </div>

    <div class="absolute bg-white w-full h-full top-0 left-0 z-20"></div>

    <section bind:this={pages}
             class={"absolute bottom-0 flex-none inset-x-0 w-fit mx-auto z-0 bg-white p-8 z-10"}>
        <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
            <li><a class={"w-full"} href="/">Home</a></li>
            <li><a class={"w-full"} href="/about">About</a></li>
            <li><a class={"w-full"} href="/events">Events</a></li>
            <li><a class={"w-full"} href="/districtproject">District Project</a></li>
            <li><a class={"w-full"} href="/gallery">Gallery</a></li>
            <li><a class={"w-full"} href="/membership">Membership</a></li>
            <li><a class={"w-full"} href="/contact">Contact Us</a></li>
        </ul>
    </section>

    <section bind:this={forvolunteers}
             class={"absolute bottom-0 flex-none w-fit inset-x-0 mx-auto md:inset-x-auto z-0 bg-white p-8 z-10"}>
        <ul class={"flex flex-col space-y-4 items-center text-4xl"}>
            <li><a class={"w-full"} href="/events">Events</a></li>
            <li><a class={"w-full"} href="/hours">Check Hours</a></li>
            <li><a class={"w-full"} href="/districtproject">District Project</a></li>
            <li><a class={"w-full"} href="/membership">Membership</a></li>
            <li><a class={"w-full"} href="/contact">Contact Us</a></li>
        </ul>
    </section>
</section>