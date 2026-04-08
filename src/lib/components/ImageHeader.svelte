<script>
    import {onMount} from "svelte";
    import {SplitText} from "gsap/SplitText";
    import {gsap} from "gsap";

    let {text, imageSrc, dim} = $props()
    let headerText

    gsap.registerPlugin(SplitText)
    onMount(() => {
        const splitHeaderText = SplitText.create(headerText).words

        gsap.fromTo(splitHeaderText, {
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

<div class="relative w-full h-[30vh] flex flex-col items-center justify-center">
    <header bind:this={headerText} class="relative z-10 text-stone-200 text-4xl">{text}</header>
    {#if dim}
        <img class="absolute z-0 top-0 left-0 w-full h-full object-cover brightness-50" src={imageSrc} alt=""/>
    {:else}
        <img class="absolute z-0 top-0 left-0 w-full h-full object-cover" src={imageSrc} alt=""/>
    {/if}

</div>