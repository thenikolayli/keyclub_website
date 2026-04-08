<script>
    import gsap from "gsap";

    let {text, oninput, getvalue, textcolor} = $props()
    let text_element

    // Track focus/hover so we can animate from a single place.
    let isHover = false
    let isFocus = false

    textcolor = textcolor || "#000000";

    const animate_input = (shouldFloat) => {
        gsap.to(text_element, {
            scale: shouldFloat ? .8 : 1,
            y: shouldFloat ? "-80%" : 1,
            opacity: shouldFloat ? .8 : 1,
            ease: "power2.out",
            transformOrigin: "top left",
            duration: .2
        })
    }

    // Animate whenever value/focus/hover changes.
    $effect(() => {
        const currentValue = String(getvalue?.() ?? "")
        const hasValue = currentValue !== ""
        animate_input(hasValue || isHover || isFocus)
    })
</script>

<div class="relative border-b-3 border-kcyellow text-3xl" style="color: {textcolor};"
     onmouseover={() => (isHover = true)} onmouseout={() => (isHover = false)}
     role="group"
>
    <input class="outline-none relative z-10 w-full" type="text" value={getvalue()}
           oninput={oninput}
           onfocus={() => (isFocus = true)}
           onblur={() => (isFocus = false)}
    />
    <span bind:this={text_element} class="first-name absolute top-0 left-0">{text}</span>
</div>