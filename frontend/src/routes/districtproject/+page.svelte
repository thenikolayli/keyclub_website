<script>
    import SplitText from "gsap/SplitText";
    import gsap from "gsap";
    import {onMount} from "svelte";
    import Header from "$lib/components/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte"

    let htext
    let canSend = $state(true)

    onMount(() => {
        document.title = "District Project"

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
<section class="w-full min-h-screen text-kcblack bg-stone-200 text-kcblack">
    <div class="relative w-full h-[30vh] flex flex-col items-center justify-center">
        <header bind:this={htext} class="relative z-10 text-stone-200 text-4xl">
            DISTRICT PROJECT
        </header>
        <img class="absolute z-0 top-0 left-0 w-full h-full object-cover brightness-50"
             src="/districtproject/cover.jpg" alt=""/>
    </div>

    <p class="p-4 w-full md:w-1/2 mx-auto text-3xl">
        <img style="width: 45%; float: right;" src="/districtproject/logo.png" alt="logo"/>
        In 25-26 year, we’ve partnered with The Ronald McDonald House Charities!
        <br/><br/>
        The Ronald McDonald House Charities (RMHC) is a non-profit organization that supports families with
        sick children who need to travel for medical care. It provides a "home-away-from-home" through programs
        like <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-house-programs">Ronald McDonald Houses</a> and
        <a class="underline" href="https://rmhc.org/our-core-programs/ronald-mcdonald-family-room-programs">Family Rooms</a> near hospitals.
        <br/><br/>
        RMHC's mission is to strengthen families,
        promote healing, and ensure the best health outcomes for children by removing barriers to healthcare.

        <ResponsiveButton init_text="Visit their website" clicked_text="..." on_click={() => window.open("https://rmhc.org/", "_blank")} can_send={canSend} />
    </p>
</section>
<Footer/>