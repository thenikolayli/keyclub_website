<script>
    import {onMount} from "svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ImageHeader from "$lib/components/ImageHeader.svelte";

    onMount(() => {
        document.title = "Membership"
    })
</script>

<Header/>
<section class="w-full min-h-screen text-center text-2xl text-kcblack bg-stone-200">
    <ImageHeader text="Registration is Closed" imageSrc="/membership/membership_cover.jpg"/>

    <section class="p-4 space-y-8 md:space-y-16 w-full my-8 md:text-3xl">

        <div class="w-full flex flex-col md:flex-row">
            <div class="w-full md:w-1/2">
                <img class="object-contain w-[80%] mx-auto" src="/membership/members1.png" alt="Members 1"/>
            </div>
            <div class="w-full md:w-1/2 p-4">
                <header class="text-4xl mb-8">Be a Keyutie</header>
                <p class="text-left w-fit mx-auto">
                    <span class="font-semibold">
                        Registration is closed.
                    </span>
                    <br><br>
                    It will reopen next school year in October of 2026.
                </p>
            </div>
        </div>

        <div class="w-full flex flex-col md:flex-row">
            <div class="md:order-2 w-full md:w-1/2">
                <img class="object-contain w-[80%] mx-auto" src="/membership/members2.png" alt="Members 2"/>
            </div>
            <div class="md:order-1 w-full md:w-1/2 p-4">
                <header class="text-4xl mb-8">Pay Dues</header>
                <div class="text-left w-fit mx-auto">
                    <p>
                        The Key Club dues are <span class="underline">$41</span>.
                        The dues payments are currently closed.
                    </p>
                    <ul class="mx-auto w-fit mt-8 list-disc">
                        <li>International: $10</li>
                        <li>District: $5.50</li>
                        <li>Club: $2.50</li>
                        <li>Hoodie: $23</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="w-full flex flex-col md:flex-row">
            <div class="w-full md:w-1/2">
                <img class="object-contain w-[80%] mx-auto" src="/membership/members3.png" alt="Members 3"/>
            </div>
            <div class="w-full md:w-1/2 p-4">
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