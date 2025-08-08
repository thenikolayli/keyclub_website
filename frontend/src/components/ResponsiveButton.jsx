import gsap from "gsap";
import {createEffect, onMount} from "solid-js";

export const ResponsiveButton = (props) => {
    const init_text = props.init_text
    const clicked_text = props.clicked_text
    const on_click = props.on_click
    const can_send = props.can_send

    let init_text_ref
    let clicked_text_ref
    let bg_ref

    let timeline

    let bg_color = props.bg_color ? props.bg_color : "kcyellow"


    onMount(() => {
        gsap.set(clicked_text_ref, {yPercent: 20})

        timeline = gsap.timeline({paused: true})
        timeline.to(init_text_ref, {
            yPercent: -120,
            duration: .2,
            ease: "power2.out",
        }, 0)
        timeline.to(clicked_text_ref, {
            yPercent: -100,
            duration: .2,
            ease: "power2.out",
        }, 0)
    })

    // hover animation
    const button_animation = (start) => {
        gsap.to(bg_ref, {
            transformOrigin: "top center",
            scaleY: start ? 0 : 1,
            ease: "power2.out",
            duration: .1
        })
    }

    // animation
    createEffect(() => {
        if (can_send()) { // if switched to can send, then replay the animation
            timeline.reverse()
        } else {
            timeline.play()
        }
    })

    return (
        <button onclick={on_click}
                class={`relative w-full p-2 px-8 mt-8 border-3 border-${bg_color} overflow-hidden text-2xl text-kcblack`}
                onmouseenter={() => button_animation(true)}
                onmouseleave={() => button_animation(false)}
        >
            <h1 ref={init_text_ref} class={"relative z-10"}>{init_text}</h1>
            <h1 ref={clicked_text_ref} class={"z-10 absolute inset-x-0 mx-auto"}>{clicked_text}</h1>
            <div ref={bg_ref} class={`absolute top-0 left-0 z-0 w-full h-full bg-${bg_color}`}></div>
        </button>
    )
}