import gsap from "gsap";
import {createSignal, onMount} from "solid-js";

export const ResponsiveButton = (props) => {
    const [can_send, set_can_send] = createSignal(true)

    const init_text = props.init_text
    const clicked_text = props.clicked_text
    const on_click = props.on_click

    let init_text_ref
    let clicked_text_ref
    let bg_ref

    onMount(() => {
        gsap.set(clicked_text_ref, {yPercent: 20})
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

    const handle_click = () => {
        on_click()
        if (!can_send()) {
            return;
        }
        set_can_send(false)

        // sent animation
        const timeline = gsap.timeline()
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

        setTimeout(() => {
            timeline.reverse()
            set_can_send(true)
        }, 2000)
    }

    return (
        <button onclick={handle_click}
                class={"relative p-2 px-8 mt-8 border-3 border-kcyellow overflow-hidden text-2xl text-kcblack"}
                onmouseenter={() => button_animation(true)}
                onmouseleave={() => button_animation(false)}
        >
            <h1 ref={init_text_ref} class={"relative z-10"}>{init_text}</h1>
            <h1 ref={clicked_text_ref} class={"z-10 absolute"}>{clicked_text}</h1>
            <div ref={bg_ref} class="absolute top-0 left-0 z-0 w-full h-full bg-kcyellow"></div>
        </button>
    )
}