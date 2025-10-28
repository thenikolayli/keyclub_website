<script>
    import gsap from "gsap";
    import {onMount} from "svelte";

    let menu
    let menuButton
    let menuOpen = $state(false)

    onMount(() => {
        gsap.set(menu, {
            transformOrigin: "top left",
            xPercent: 100
        })
        addEventListener("click", (event) => handleClickOutside(event))
        return () => removeEventListener("click", (event) => handleClickOutside(event))
    })

    $effect(() => {
        gsap.to(menu, {
            xPercent: menuOpen ? 0 : 100,
            duration: .3,
            ease: "power2.out"
        })
    })

    // if a user clicks and the menu and menu button don't contain the click, close the menu
    const handleClickOutside = (event) => {
        if (menuOpen && !menu.contains(event.target) && !menuButton.contains(event.target)) {
            menuOpen = false
        }
    }
</script>

<section class="relative flex flex-col w-full h-[110px] md:h-[180px] z-30 text-kcblack bg-stone-200 p-4 flex items-center"
         style="box-shadow: 0px 5px 5px 5px hsl(0 1% 30% / .1)">
    <a class="w-[80%] md:w-auto max-h-full md:h-[80%] self-start md:self-auto" href="/"><img class="h-full object-contain" src="/keyclub_horizontal_black.png" alt="Key Club Logo"/></a>
    <button class="block md:hidden" bind:this={menuButton} onclick={() => menuOpen = !menuOpen} aria-label="Menu button">
        <svg class="absolute right-3 top-2" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
    </button>

    <ul class="hidden md:flex w-full xl:w-[80%] text-xl xl:text-2xl items-center justify-between">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/hours">Hours</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/districtproject">District Project</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</section>

<section bind:this={menu} class="fixed flex flex-col right-0 top-0 z-20 w-[70%] h-screen bg-stone-200 p-4">
    <div class="spacer w-full h-[110px]"></div>
    <ul class="text-kcblack text-3xl space-y-2">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/hours">Hours</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/districtproject">District Project</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
    <div class="spacer flex-1"></div>
    <img class="object-contain" src="/bee.webp" alt="">
</section>