<script>
    import gsap from "gsap";
    import {onMount} from "svelte";

    let {init_text, clicked_text, on_click, can_send} = $props()

    let init_text_element
    let clicked_text_element
    let bg_element

    let timeline

    onMount(() => {
        gsap.set(init_text_element, {yPercent: 0})
        gsap.set(clicked_text_element, {yPercent: 10})

        timeline = gsap.timeline({paused: true})
        timeline.to(init_text_element, {
            yPercent: -110,
            duration: .2,
            ease: "power2.out",
        }, 0)
        timeline.to(clicked_text_element, {
            yPercent: -100,
            duration: .2,
            ease: "power2.out",
        }, 0)
    })

    // hover animation
    const button_animation = (start) => {
        gsap.to(bg_element, {
            transformOrigin: "top center",
            scaleY: start ? 0 : 1,
            ease: "power2.out",
            duration: .1
        })
    }

    // animation
    $effect(() => {
        if (can_send) { // if switched to can send, then replay the animation
            timeline.reverse()
        } else {
            timeline.play()
        }
    })
</script>

<button onclick={on_click}
        class={"relative w-full p-2 px-8 mt-8 border-3 border-kcyellow overflow-hidden text-2xl text-kcblack"}
        onmouseenter={() => button_animation(true)}
        onmouseleave={() => button_animation(false)}
>
    <h1 bind:this={init_text_element} class={"relative z-10"}>{init_text}</h1>
    <h1 bind:this={clicked_text_element} class={"z-10 absolute inset-x-0 mx-auto"}>{clicked_text}</h1>
    <div bind:this={bg_element} class="absolute top-0 left-0 z-0 w-full h-full bg-kcyellow"></div>
</button>