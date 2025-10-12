<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Icon from "@iconify/svelte"
    import gsap from "gsap";
    import SplitText from "gsap/SplitText";
    import ScrollTrigger from "gsap/ScrollTrigger";
    import {onMount} from "svelte";
    import axios from "axios";
    import textFit from "textfit";
    import moment from "moment-timezone";
    import momentDurationFormatSetup from "moment-duration-format"

    let bannerMessage = $state("")
    let bannerShow = $state(false)
    let bannerText
    let banner

    let timeLeftString = $state("")

    $effect(() => {
        if (bannerMessage) {
            textFit(bannerText)
        }
    })

    onMount(async () => {
        document.title = "JHS Key Club"
        gsap.registerPlugin(SplitText)
        gsap.registerPlugin(ScrollTrigger)

        // gets banner info
        try {
            const response = await axios({
                method: "get",
                url: "/api/misc/get_banner"
            })

            if (response.status === 200) {
                bannerMessage = response.data.message
                bannerShow = response.data.show
            }
        } catch (error) {
            console.log(error)
        }

        gsap.set(banner, {
            xPercent: 100
        })

        if (bannerShow) {
            gsap.to(banner, {
                xPercent: 0,
                duration: .7,
                ease: "power2.out",
                delay: 1
            })
        }

        // countdown to October 31st 11:59:59 PM PDT (dues close)
        momentDurationFormatSetup(moment)
        const duesClose = moment("2025-10-31T11:59:59").tz("America/Los_Angeles")
        setInterval(() => {
            const msLeft = moment.duration(duesClose - moment.tz("America/Los_Angeles"))
            timeLeftString = msLeft.format("[Dues close in] M [months,] D [days,] h [hours,] m [minutes, and] s [seconds!]")
        }, 1000)

        const timeline = gsap.timeline({
            defaults: {
                ease: "power2.out",
                delay: .5
            }
        })

        const intro1 = SplitText.create(".intro1").words
        const intro2 = SplitText.create(".intro2").words

        timeline.fromTo(intro1, {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7,
        }, 0)

        timeline.fromTo(intro2, {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7
        }, .8)

        timeline.fromTo(".intro3", {
            opacity: 0,
            yPercent: 50
        }, {
            opacity: 1,
            yPercent: 0,
            duration: .7
        }, 1.6)

        timeline.fromTo(".intro4", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1
        }, 2.3)


        if (innerWidth >= 768) {
            gsap.set(".slide", {
                position: "absolute",
                willChange: "transform",
                left: "50%",
                translateX: "-50%"
            })

            gsap.to(".slide", {
                yPercent: -100,
                ease: "none",
                stagger: .5,
                scrollTrigger: {
                    trigger: ".slides",
                    start: "top top",
                    end: () => "+=" + innerHeight * 6,
                    scrub: true,
                    // markers: true,
                    pin: true,
                    anticipatePin: 1
                }
            })
        }

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    })
</script>

<Header />

<section class="relative w-full h-screen flex flex-col overflow-hidden">
    <img class="h-full w-full object-cover brightness-50" src="/home/cover.webp" alt="Cover image"/>

    <div class="absolute inset-x-0 mx-auto top-[25%] z-10 text-stone-200 text-center px-8">
        <h2 class="intro1 text-3xl">
            we don't make keys...
        </h2>
        <h2 class="intro2 text-3xl">
            we make a
        </h2>
        <h2 class="intro3 text-5xl mt-2">
            difference!
        </h2>
        <h1 class="intro4 text-3xl md:text-5xl mt-6">
            Henry M. Jackson High School Key Club
        </h1>
    </div>

    <div bind:this={banner} class="absolute right-0 top-8 p-4 bg-stone-200 h-[6rem] w-[24rem] flex items-center text-kcblack">
        <img class="h-full mr-4" src="/bee.webp" alt="Wolfbee">
        <span class="w-[60%] h-full" bind:this={bannerText}>{bannerMessage}</span>
    </div>
</section>

<section class="relative w-full h-screen text-kcblack bg-kcyellow flex flex-col">
    <header class="relative top-12 mx-auto w-fit text-4xl md:text-7xl">🚨 IMPORTANT 🚨</header>
    <h1 class="mt-16 mx-auto w-fit text-3xl md:text-5xl p-4">{timeLeftString}</h1>
    <div class="relative flex-1 flex items-center justify-center">
        <div class="w-[80%] md:w-fit flex flex-col items-center justify-items-center p-8" style="background-color: oklch(0.931 0.1524 91.02);">
            <p class="text-2xl md:text-4xl text-left">
                In order to officially register for Key Club, you must pay <span class="underline">$41</span>.
            </p>
            <ul class="mt-8 text-2xl md:text-4xl list-disc">
                <li>International: $10</li>
                <li>District: $5.50</li>
                <li>Club: $2.50</li>
                <li>Hoodie: $23</li>
            </ul>
            <hr class="border-2 w-[60%] my-4">
            <h1 class="text-3xl md:text-6xl font-semibold">$41</h1>

            <p class="mt-8 text-xl md:text-3xl">
                You can pay online by following <a class="underline" target="_blank" href="https://www.everettsd.org/payments">this link</a>
                or in person at the ASB office.
            </p>
        </div>
    </div>
</section>

<section class="w-full h-screen grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-stone-200">
    <img class="w-full h-full object-cover overflow-hidden" src="/home/whoRwe.jpg" alt="WhoRwe image"/>

    <div class="w-full h-full flex flex-col items-center justify-center p-8 text-kcblack">
        <header class="text-4xl md:text-7xl">WHO ARE WE?</header>
        <p class="text-xl md:text-3xl mt-8 text-left">
            Key Club is a student-led volunteering organization. Jackson High School is one of 13
            schools in Division 21, currently standing as the club with the most members. Key Club
            is a great opportunity for students to volunteer for their community and simultaneously
            make new friends within the division with students from other schools.
        </p>
    </div>
</section>

<section class="relative slides min-h-screen md:h-screen text-stone-200 bg-kcblack">

    <section class="relative top-0 w-full md:w-1/2 mx-auto h-[100vh] bg-kcblack border-3 border-kcyellow z-[11]">
        <div class="absolute top-0 left-0 w-full h-full z-10 p-2">
            <header class="text-3xl h-[5vh]">COMMITTEES</header>

            <p class="text-3xl mt-4">
                Our Key Club has 4 committees.
                <br/> <br/>
                Committees are a great way to meet new people and gain more volunteer hours.
                Each committee is run by one or multiple committee chairs and they host their own meetings.
                <br> <br>
                <span class="underline">Every member must join at least one committee.</span>
            </p>
        </div>

        <img class="absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"
             src="/home/committees_cover.jpg" alt="cover"/>
    </section>

    <section class="slide relative w-full md:w-1/2 h-[calc(100vh-3rem)] bg-kcblack border-3 border-kcyellow z-[12]">
        <div class="absolute top-0 left-0 w-full h-full z-20 p-2 text-3xl">
            <header class="text-3xl h-[5vh]">SPIRIT</header>

            <p class="mt-4">As one of the LARGEST committees in Key Club, we work to create fun energizers, take part in spirited events, and overall build a fun atmosphere!</p>

            <div class="mt-12 w-fit mx-auto text-center p-4 bg-kcyellow text-kcblack">
                <a class="underline" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSf4dZ5ygdjPqQGGIC_ze8NH9NADRONzOkhUQWo_ysNC29WDzg/viewform">Apply here!</a>
            </div>
        </div>

        <img class="absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"
             src="/home/spirit_cover.webp" alt="cover"/>
    </section>

    <section class="slide relative w-full md:w-1/2 h-[calc(100vh-6rem)] bg-kcblack border-3 border-kcyellow z-[13]">
        <div class="absolute top-0 left-0 w-full h-full z-10 p-2 text-3xl">
            <header class="h-[5vh]">SERVICE</header>

            <p class="mt-4">
                Brainstorm fun events to contribute to the <a class="underline" href="/districtproject">District Project</a>!
            </p>

            <div class="mt-12 w-fit mx-auto text-center p-4 bg-kcyellow text-kcblack">
                <a class="underline" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScB4Fk9qVfBD0knPGxAktgDyY458q32Zzou0AXQStlKPxIJbw/viewform">Apply here!</a>
            </div>
        </div>

        <img class="absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"
             src="/home/service_cover.jpg" alt="cover"/>
    </section>

    <section class="slide relative w-full md:w-1/2 h-[calc(100vh-9rem)] bg-kcblack border-3 border-kcyellow z-[14]">
        <div class="absolute top-0 left-0 w-full h-full z-10 p-2 text-3xl">
            <header class="h-[5vh]">DECORATION</header>

            <p class="mt-4">
                This committee is
            </p>
            <ul class="text-2xl list-disc list-inside">
                <li>About making posters</li>
                <li>Spending lots of time at the AC</li>
                <li>Laid back</li>
                <li>After school</li>
            </ul>

            <div class="mt-12 w-fit mx-auto text-center p-4 bg-kcyellow text-kcblack">
                <a class="underline" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfbib7QF9pWxsiXYIqTz9T3RyAO4xLYLGhcTRLLqUkifTPiqg/viewform">Apply here!</a>
            </div>
        </div>

        <img class="absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"
             src="/home/deco_cover.jpg" alt="cover"/>
    </section>

    <section class="slide relative w-full md:w-1/2 h-[calc(100vh-12rem)] bg-kcblack border-3 border-kcyellow z-[15]">
        <div class="absolute top-0 left-0 w-full h-full z-10 p-2">
            <header class="text-3xl h-[5vh]">LEADERSHIP</header>

            <p class="text-3xl mt-4">
                Create and lead events for Key Club! Registration opens at the end of the first semester, so stay tuned for more info!!
                <br/> <br/>
                <span class="w-full text-center">🚨 NOTE: </span>
                This committee is only for Sophomores and above. 🚨
            </p>
        </div>

        <img class="absolute top-0 left-0 z-0 w-full h-full object-cover brightness-50"
             src="/home/leadership_cover.webp" alt="cover"/>
    </section>

</section>

<section class="w-full h-screen grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
    <img class="w-full h-full object-cover overflow-hidden" src="/home/remind.jpg" alt="Remind image"/>

    <div class="w-full h-full p-8 flex items-center justify-center overflow-hidden bg-stone-200 text-kcblack">
        <div class="text-center flex flex-col items-center justify-center">
            <header class="text-4xl">
                FOLLOW OUR SOCIALS!
            </header>
            <ul class="mt-8 text-2xl w-fit underline">
                <li class="w-fit"><a class="flex items-center" href="https://instagram.com/jhskeyclub21"
                                     aria-label="Instagram"
                                     target="_blank"><Icon icon="fa7-brands:instagram" /><span
                        class="ml-2">jhskeyclub21</span></a></li>
                <li class="w-fit"><a class="flex items-center"
                                     href="https://instagram.com/jhskeyclubreminds"
                                     aria-label="Reminds Instagram"
                                     target="_blank"><Icon icon="fa7-brands:instagram" /><span
                        class="ml-2">jhskeyclubreminds</span></a></li>
                <li class="w-fit"><a class="flex items-center"
                                     href="https://www.tiktok.com/@jhskeyclub21"
                                     aria-label="Tiktok"
                                     target="_blank"><Icon icon="fa7-brands:tiktok" /><span
                        class="ml-2">jhskeyclub21</span></a></li>
            </ul>
        </div>
    </div>
</section>

<Footer />