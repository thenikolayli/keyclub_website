<script>
    import gsap from "gsap";

    let {text, oninput, getvalue, textcolor} = $props()
    let text_element

    textcolor = textcolor || "#000000";

    const animate_input = (is_mouse_inside) => {
        gsap.to(text_element, {
            scale: getvalue() !== "" || is_mouse_inside ? .8 : 1,
            y: getvalue() !== "" || is_mouse_inside ? "-80%" : 1,
            opacity: getvalue() !== "" || is_mouse_inside ? .8 : 1,
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

<div class="relative border-b-3 border-kcyellow text-3xl" style="color: {textcolor};"
     onmouseover={() => animate_input(true)} onfocus={() => animate_input(true)}
     onmouseout={() => animate_input(false)} onblur={() => animate_input(false)}
     role="button" tabindex="-1"
>
    <input class="outline-none relative z-10 w-full" type="text" value={getvalue()}
           oninput={oninput}
    />
    <span bind:this={text_element} class="first-name absolute top-0 left-0">{text}</span>
</div>