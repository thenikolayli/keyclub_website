<script>
    import gsap from "gsap";
    import ScrollTrigger from "gsap/ScrollTrigger";
    import {horizontalLoop} from "$lib/HorizontalLoop.js";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte";
    import Icon from "@iconify/svelte"
    import {onMount} from "svelte";
    import textFit from "textfit";

    let loop
    let officer_section
    const partnerChange = {duration: .8, ease: "power2.out"}

    let canSend = $state(true)
    let small = $state(false)
    let fbsrc = $state("")

    let thirst
    let lighthouse
    let schoolhouse
    let collegewise
    let unicef

    onMount(() => {
        document.title = "About"
        gsap.registerPlugin(ScrollTrigger)

        textFit(thirst)
        textFit(lighthouse)
        textFit(schoolhouse)
        textFit(collegewise)
        textFit(unicef)

        fbsrc = "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKiwanisofmillcreek&tabs=timeline&width=340&height=500"

        gsap.fromTo(officer_section, {
                backgroundColor: "#e7e5e4"
            }, {
                backgroundColor: "#231f20",
                scrollTrigger: {
                    trigger: officer_section,
                    start: "top top",
                    end: () => "+=" + 1/4 * innerHeight, // end after quarter of screen height
                    scrub: 1,
                    once: true,
                    // markers: true,
                }
            }
        )
        gsap.to(".intro-text", {
            color: "#fed450",
            scrollTrigger: {
                trigger: officer_section,
                start: "top top",
                end: () => "+=" + 1/4 * innerHeight,
                scrub: 1,
                once: true,
                // markers: true,
            }
        })

        small = innerWidth < 768
        // if larger than md
        if (!small) {
            gsap.set(".cards-info", {
                xPercent: -100
            })
        } else {
            gsap.set(".cards-info-stack", {
                yPercent: -100
            })
        }
        gsap.set(".cards", {
            xPercent: -110
        })

        gsap.utils.toArray(".cards").forEach((card) => {
            const card_st = ScrollTrigger.create({
                trigger: card,
                start: small ? "top 40%" : "top 60%",
                // markers: true
            })

            gsap.to(card, {
                xPercent: 0,
                duration: .3,
                ease: "power2.out",
                scrollTrigger: card_st
            })
            if (!small) {
                gsap.to(card.querySelectorAll(".cards-info"), {
                    xPercent: 0,
                    stagger: .2,
                    duration: .3,
                    ease: "power2.out",
                    delay: .2,
                    scrollTrigger: card_st
                })
            } else {
                gsap.to(card.querySelectorAll(".cards-info-stack"), {
                    yPercent: 0,
                    stagger: .2,
                    duration: .3,
                    ease: "power2.out",
                    delay: .2,
                    scrollTrigger: card_st
                })
            }
        })


        const partners = gsap.utils.toArray(".partner")
        let active_element
        loop = horizontalLoop(partners, {
            paused: true,
            draggable: false,
            center: true,
            onChange: (element) => { // when the active element changes, this function gets called.
                active_element && active_element.classList.remove("active");
                element.classList.add("active");
                active_element = element;
            }
        })

        setInterval(() => {
            loop.next({duration: 1, ease: "power2.out"});
        }, 10 * 1000)

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    })
</script>

<Header/>
<section bind:this={officer_section} class="w-full h-fit text-stone-200 bg-stone-200">
    <div class="w-full h-[75vh] flex flex-col items-center justify-center text-center">
        <header class="intro-text text-black text-7xl">MEET THE OFFICERS</header>
<!--        <h1 class="intro-text text-black mt-8">(scroll)</h1>-->
    </div>
    <section class="space-y-[14rem] py-[10rem] w-[80%] md:w-fit mx-auto overflow-hidden">

        <div class="relative cards h-fit w-full md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/lex.png"
                 alt="Lex Padua"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class={"h-4 w-full"}></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Lex Padua</h1>
                <h3 class="cards-info text-3xl mt-2">President</h3>
                <h3 class="cards-info text-lg flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">alexmariepadua19@gmail.com</span></h3>
            </div>
        </div>

        <div class="relative cards h-fit w-full md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/clarrise.png" alt="Clarrise Song"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Clarisse Song</h1>
                <h2 class="cards-info text-3xl mt-2">Vice President</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">clarissesong18@gmail.com</span></h3>
            </div>
        </div>

        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/annabelle.png" alt="Annabelle Ho"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Annabelle Ho</h1>
                <h2 class="cards-info text-3xl mt-2">Treasurer</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">annabelle.zt.ho@gmail.com</span></h3>
            </div>
        </div>

        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/ravindu.png" alt="Ravindu Marasinghe"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Ravindu Marasinghe</h1>
                <h2 class="cards-info text-3xl mt-2">Secretary</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">ravindu2008@icloud.com</span></h3>
            </div>
        </div>

        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/allyson.png" alt="Allyson Chun"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Allyson Chun</h1>
                <h2 class="cards-info text-3xl mt-2">Editor</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">allysonhw96@gmail.com</span></h3>
            </div>
        </div>

        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/ellie.png" alt="Ellie Nguyen"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Ellie Nguyen</h1>
                <h2 class="cards-info text-3xl mt-2">Editor</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">ellienguyen882@gmail.com</span></h3>
            </div>
        </div>
        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/nikolay.png" alt="Nikolay Li"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold] pr-1">Nikolay Li</h1>
                <h2 class="cards-info text-3xl mt-2">Webmaster</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">nikolayliwork@gmail.com</span></h3>
            </div>
        </div>
        <div class="relative cards h-fit w-full md:w-fit md:flex">
            <img class="relative w-full md:size-[20rem] aspect-square border-kcyellow border-16 z-10"
                 src="/about/killian.png" alt="Killian Bates"/>
            <div class="cards-info-stack absolute left-0 md:relative w-fit ml-4 overflow-hidden">
                <div class="h-4 w-full"></div>
                <h1 class="cards-info text-5xl text-kcyellow font-[century-gothic-bold]">Killian Bates</h1>
                <h2 class="cards-info text-3xl mt-2">Historian</h2>
                <h3 class="cards-info text-xl flex items-center text-gray-400"><Icon icon="fe:mail" /><span
                        class="ml-2">killianj1010@outlook.com</span></h3>
            </div>
        </div>

    </section>
</section>

<section class="w-full min-h-screen p-8 flex items-center flex-col text-center text-kcblack bg-stone-200">
    <header class="text-6xl sm:text-7xl mb-4">FACULTY ADVISORS</header>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1">

        <div class="flex flex-col h-full w-full items-center justify-center">
            <img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full" src="/about/mrcain.png"
                 alt="Mr. Cain"/>
            <h1 class="font-[century-gothic-bold] text-5xl mt-4">Alfred Cain</h1>
            <h2 class="text-2xl flex items-center text-gray-600"><Icon icon="fe:mail" /><span class="ml-2">
                            acain@everettsd.org</span></h2>
        </div>

        <div class="flex flex-col h-full w-full items-center justify-center">
            <img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full"
                 src="/about/mrsvaught.jpeg"
                 alt="Mrs. Vaught"/>
            <h1 class="font-[century-gothic-bold] text-5xl mt-4">Rachel Vaught</h1>
            <h2 class="text-2xl flex items-center text-gray-600"><Icon icon="fe:mail" /><span class="ml-2">
                            rvaught@everettsd.org</span></h2>
        </div>

    </div>
</section>

<section class="w-full min-h-screen p-8 flex items-center flex-col text-center text-kcblack bg-stone-200">
    <header class="text-6xl sm:text-7xl mb-4">KIWANIS ADVISORS</header>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[4rem] w-[90%] lg:w-[70%] xl:w-[60%] flex-1">

        <div class="flex flex-col h-full w-full items-center justify-center">
            <img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full"
                 src="/about/mrsteckler.png"
                 alt="Mr. Cain"/>
            <h1 class="font-[century-gothic-bold] text-5xl mt-4">John Steckler</h1>
            <h2 class="text-2xl flex items-center text-gray-600"><Icon icon="fe:mail" /><span class="ml-2">
                            johnsteckler@comcast.net</span></h2>
        </div>

        <div class="flex flex-col h-full w-full items-center justify-center">
            <img class="object-cover border-kcyellow border-16 aspect-[3/4] w-full"
                 src="/about/mrssteckler.png"
                 alt="Mrs. Vaught"/>
            <h1 class="font-[century-gothic-bold] text-5xl mt-4">Lisa Steckler</h1>
            <h2 class="text-2xl flex items-center text-gray-600"><Icon icon="fe:mail" /><span class="ml-2">
                            stecklerlisa@gmail.com</span></h2>
        </div>

    </div>
</section>

<section class="w-full min-h-screen p-8 flex items-center flex-col text-center text-kcblack bg-stone-200">
    <header class="text-6xl sm:text-7xl mb-4">D21 LIEUTENANT GOVERNOR</header>

    <div
            class="w-[90%] sm:w-[50%] lg:w-[35%] xl:w-[30%] flex-1 flex flex-col items-center justify-center">
        <img class="object-cover border-kcyellow border-16 h-[90%] aspect-[3/4] w-full"
             src="/about/maeve.jpg"
             alt="Maeve"/>
        <h1 class="font-[century-gothic-bold] text-5xl mt-4">Maeve Hershlip</h1>
        <h2 class="text-2xl flex items-center text-gray-600"><Icon icon="fe:mail" /><span class="ml-2">
                            ltg21@pnwkeyclub.org</span></h2>
    </div>
</section>

<section class="w-full h-screen p-8 flex items-center flex-col text-stone-200 bg-stone-200">
    <header class="text-4xl sm:text-7xl text-kcblack text-center">OUR PREFERRED PARTNERS AND CHARITIES</header>

    <div
            class="border-16 border-kcyellow mt-8 w-full h-[80%] md:h-[70%] md:aspect-[1.2] lg:w-auto lg:aspect-[1.7] flex overflow-hidden">

        <div class="partner relative w-full h-full flex-none">
            <div class="absolute p-8 h-full z-10">
                <div class="h-[40%] md:h-[20%] flex flex-col md:flex-row space-y-4 items-start md:items-center justify-between w-full mb-4">
                    <img class="h-full object-contain" src="/about/thirstproject_logo.png" alt="Logo"/>

                    <a class="text-black bg-stone-200 p-4 text-xl"
                       href="https://thirstproject.org/" target="_blank">
                        Learn More
                    </a>
                </div>


                <p bind:this={thirst} class="w-full h-[60%]">
                    Thirst Project hopes to educate the next generation by arming students with
                    information
                    about how they can be a part of social change,
                    make a difference and encourage others to join in the effort.
                </p>
            </div>

            <img class="object-cover z-0 w-full h-full" src="/about/thirstproject.png" alt="Thirst Project"/>
        </div>

        <div class="partner relative w-full h-full flex-none">
            <div class="absolute p-8 h-full z-10">
                <div class="h-[40%] md:h-[20%] flex flex-col md:flex-row space-y-4 items-start md:items-center justify-between w-full mb-4">
                    <img class="h-full object-contain" src="/about/unicef_logo.png" alt="Logo"/>

                    <a class="text-black bg-stone-200 p-4 text-xl"
                       href="https://www.unicef.org/" target="_blank">
                        Learn More
                    </a>
                </div>

                <p bind:this={unicef} class="w-full h-[60%]">
                    UNICEF is the only organization of the United Nations dedicated exclusively to
                    children.
                    Working with other United Nations bodies, governments and non-governmental
                    organizations,
                    UNICEF helps to provide for children’s needs in more than 150 developing countries
                    through community-based services in primary health care,
                    basic education and safe water and sanitation.
                </p>
            </div>

            <img class="object-cover z-0 w-full h-full" src="/about/unicef.jpg" alt="Unicef"/>
        </div>

        <div class="partner relative w-full h-full flex-none">
            <div class="absolute p-8 h-full z-10">
                <div class="h-[40%] md:h-[20%] flex flex-col md:flex-row space-y-4 items-start md:items-center justify-between w-full mb-4">
                    <img class="h-full object-contain" src="/about/erikaslighthouse_logo.png" alt="Logo"/>

                    <a class="text-black bg-stone-200 p-4 text-xl"
                       href="https://erikaslighthouse.org/" target="_blank">
                        Learn More
                    </a>
                </div>

                <p bind:this={lighthouse} class="w-full h-[60%]">
                    The mission of Erika's Lighthouse is to make sure no young person feels alone in
                    their depression.
                    This nonprofit organization encourages good mental health and strives to break down
                    the stigma surrounding mental health issues.
                    Erika's Lighthouse is dedicated to creating a community of empathy and education and
                    has resources and programs for students and educators, grades 4-12.
                </p>
            </div>

            <img class="object-cover brightness-[.2] z-0 w-full h-full" src="/about/erikaslighthouse.jpeg"
                 alt="Erika's Lighthouse"/>
        </div>

        <div class="partner relative w-full h-full flex-none">
            <div class="absolute p-8 h-full z-10">
                <div class="h-[40%] md:h-[20%] flex flex-col md:flex-row space-y-4 items-start md:items-center justify-between w-full mb-4">
                    <img class="h-full object-contain" src="/about/schoolhouse_logo.png" alt="Logo"/>

                    <a class="text-black bg-stone-200 p-4 text-xl"
                       href="https://schoolhouse.world/key-club" target="_blank">
                        Learn More
                    </a>
                </div>

                <p bind:this={schoolhouse} class="w-full h-[60%]">
                    Want to make an impact and have fun while doing it? Looking for a service project
                    that you can complete from the comfort of your bedroom?
                    Key Club has partnered with Schoolhouse to bring free tutoring to thousands of
                    learners across the world.
                    If you're interested in learning something new, or you're interested in becoming a
                    tutor yourself, sign up today!
                </p>
            </div>

            <img class="object-cover brightness-[1.2] z-0 w-full h-full" src="/about/schoolhouse.png"
                 alt="schoolhouse"/>
        </div>

        <div class="partner relative w-full h-full flex-none">
            <div class="absolute p-8 h-full z-10">
                <div class="h-[40%] md:h-[20%] flex flex-col md:flex-row space-y-4 items-start md:items-center justify-between w-full mb-4">
                    <img class="h-full object-contain" src="/about/collegewise_logo.png" alt="Logo"/>

                    <a class="text-black bg-stone-200 p-4 text-xl"
                       href="https://collegewise.com/" target="_blank">
                        Learn More
                    </a>
                </div>

                <p bind:this={collegewise} class="w-full h-[60%]">
                    Collegewise helps identify the college that’s right for you, assists with the
                    application process,
                    and provides tutoring for ACT/SAT exams. While a paid subscription is available for
                    those who wish to access it,
                    every Key Club member has access to a suite of Collegewise resources on the Runway
                    platform as a member benefit.
                </p>
            </div>

            <img class="object-cover z-0 w-full h-full" src="/about/collegewise.jpg" alt="Collegewise"/>
        </div>

    </div>

    <div class="flex text-black gap-8 mt-4">
        <button onclick={() => loop.previous(partnerChange)} aria-label="Previous">
            <Icon icon="solar:arrow-left-outline" class="size-[4rem]"/>
        </button>
        <button onclick={() => loop.next(partnerChange)} aria-label="Previous">
            <Icon icon="solar:arrow-right-outline" class="size-[4rem]"/>
        </button>
    </div>
</section>

<section class="w-full h-screen grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-kcblack bg-stone-200">
    <div class="w-full h-full flex flex-col items-center justify-center p-8">
        <header class="text-4xl md:text-7xl">OUR KIWANIS</header>
        <p class="text-3xl md:text-2xl mt-8 text-left">
            JHS Key Club is sponsored by the Kiwanis of Mill Creek.
            Kiwanis is an international community of clubs in which is dedicated to serving the
            community and the lives of the children around it.
        </p>

        <ResponsiveButton init_text="Kiwanis Website" clicked_text="..." on_click={() => window.open("https://k19352.site.kiwanis.org/", "_blank")} can_send={canSend}/>
    </div>
    <img class="w-full h-full object-contain" src="/about/kiwanis.jpg" alt="Mill Creek Kiwanis"/>
</section>

<section class="w-full p-8 text-center text-kcblack bg-stone-200">
    <header class="text-4xl sm:text-7xl">MORE WEBSITES</header>
    <p class="mt-4 mb-8 text-3xl text-center">
        Check out our international and district websites to learn more or catch up with the buzz!
    </p>

    <div class="flex flex-col md:flex-row mx-auto text-4xl space-x-8">
        <ResponsiveButton init_text="Key Club" clicked_text="..." on_click={() => window.open("https://keyclub.org/", "_blank")} can_send={canSend}/>
        <ResponsiveButton init_text="PNW Key Club" clicked_text="..." on_click={() => window.open("https://pnwkeyclub.org/", "_blank")} can_send={canSend}/>
    </div>
</section>
<Footer/>