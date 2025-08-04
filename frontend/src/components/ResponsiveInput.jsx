import gsap from "gsap";
import {createEffect} from "solid-js";

export const ResponsiveInput = (props) => {
    const value = props.value
    const set_value = props.set_value
    const text = props.text
    let text_ref

    const animate_input = (is_mouse_inside) => {
        gsap.to(text_ref, {
            scale: value() !== "" || is_mouse_inside ? .8 : 1,
            y: value() !== "" || is_mouse_inside ? "-80%" : 1,
            opacity: value() !== "" || is_mouse_inside ? .8 : 1,
            ease: "power2.out",
            transformOrigin: "top left",
            duration: .2
        })
    }

    // animates text when typing and cursor not inside input
    createEffect(() => {
        animate_input(value, text_ref, false)
    })

    return (
        <div class={"relative border-b-3 border-kcyellow text-3xl"}
             onmouseenter={() => animate_input(true)}
             onmouseleave={() => animate_input(false)}
        >
            <input class={"outline-none relative z-10"} type="text" value={value()}
                   oninput={(event) => set_value(event.target.value)}
            />
            <h1 ref={text_ref} class={"first-name absolute top-0 left-0"}>{text}</h1>
        </div>
    )
}