<script>
    import gsap from "gsap";

    let {value, text, oninput} = $props()
    let text_element

    const animate_input = (is_mouse_inside) => {
        gsap.to(text_element, {
            scale: value !== "" || is_mouse_inside ? .8 : 1,
            y: value !== "" || is_mouse_inside ? "-80%" : 1,
            opacity: value !== "" || is_mouse_inside ? .8 : 1,
            ease: "power2.out",
            transformOrigin: "top left",
            duration: .2
        })
    }

    // animates text when typing and cursor not inside input
    $effect(() => {
        animate_input(false)
    })
</script>

<div class="relative border-b-3 border-kcyellow text-3xl"
     onmouseover={() => animate_input(true)} onfocus={() => animate_input(true)}
     onmouseout={() => animate_input(false)} onblur={() => animate_input(false)}
>
    <input class="outline-none relative z-10" type="text" value={value}
           oninput={oninput}
    />
    <h1 bind:this={text_element} class="first-name absolute top-0 left-0">{text}</h1>
</div>