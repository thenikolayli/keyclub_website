<script>
    import SplitText from "gsap/SplitText";
    import gsap from "gsap";
    import {onMount} from "svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let htext

    onMount(() => {
        document.title = "Membership"

        const headerText = SplitText.create(htext).words

        gsap.fromTo(headerText, {
            yPercent: 50,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            stagger: 1/5,
            duration: .5,
            delay: .5,
            ease: "power2.out",
        })
    })
</script>

<Header/>
<section class="w-full min-h-screen text-center text-2xl text-kcblack">
    <div class="relative w-full h-[30vh] flex flex-col items-center justify-center">
        <header bind:this={htext} class="text-stone-200 text-4xl">
            REGISTRATION IS CLOSED
        </header>
        <img class="absolute -z-10 top-0 left-0 w-full h-full object-cover" src="/membership/membership_cover.jpg"
             alt="Membership Cover"/>
    </div>

    <section class="p-4 space-y-8 md:space-y-16 w-full my-8 md:text-3xl">

        <div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
            <img class="object-contain w-[80%] mx-auto" src="/membership/members1.png" alt="Members 1"/>
            <div class="w-full">
                <header class="text-4xl mb-8">Be a Keyutie</header>
                <p class="text-left w-fit mx-auto">
                    <span class="underline">Get an ASB card!</span> If you don't already have one, go to the
                    ASB office for assistance.
                    <br/><br/>
                    Start your service!
                    <br/><br/>
                    Participate in club events/socials, go to DCMs, and attend club
                    meetings. Requirements are listed below.
                </p>
            </div>
        </div>

        <div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
            <img class="md:order-2 object-contain w-[80%] mx-auto" src="/membership/members2.png" alt="Members 2"/>
            <div class="md:order-1 w-full">
                <header class="text-4xl mb-8">Pay Dues</header>
                <p class="text-left w-fit mx-auto">
                    The official dues payments are closed.
                    <br/><br/>
                    Check back in October 🎃.
                </p>
            </div>
        </div>

        <div class="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
            <img class="object-contain w-[80%] mx-auto" src="/membership/members3.png" alt="Members 3"/>
            <div class="w-full">
                <header class="text-4xl mb-8">Stay in the Hive</header>
                <p class="text-left">
                    Complete your annual hour requirement of <span class="underline">25 hours</span>!
                    (There is no semester hour requirement.)
                    <br/><br/>
                    Attend <span class="underline">50%</span> of the general meetings.
                    <br/><br/>
                    Attend all events you've signed up for. Give a <span
                        class="underline">24 hour notice</span> if you can't make it to an
                    event.
                    Misbehavior or failure to show up to 3 events without advanced notice gets you suspended
                    from the club.
                </p>
            </div>
        </div>

    </section>
</section>
<Footer/>