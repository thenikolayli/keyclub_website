import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {createEffect, createSignal, onMount} from "solid-js";
import gsap from "gsap";
import {ResponsiveInput} from "../components/ResponsiveInput.jsx";
import {ResponsiveButton} from "../components/ResponsiveButton.jsx";

export const TestPage = () => {
    const all_time_goals = [0, 25, 50, 100, 150, 200, 250, 300, 400]
    const year_goals = [0, 10, 25, 50, 70, 100, 150, 200]

    let wrapper_ref
    let all_time_ref
    let year_ref

    const [at_start, set_at_start] = createSignal(all_time_goals[0])
    const [at_end, set_at_end] = createSignal(all_time_goals[1])
    const [yr_start, set_yr_start] = createSignal(year_goals[0])
    const [yr_end, set_yr_end] = createSignal(year_goals[1])

    let name_ref
    const [name, set_name] = createSignal("")

    // onMount(() => {
    //     gsap.set([all_time_ref, year_ref], {
    //         scaleX: 0,
    //         transformOrigin: "center left",
    //     })
    //     gsap.set(wrapper_ref, {
    //         opacity: 0
    //     })
    // })
    //
    // const animate_input = (field, selector, is_mouse_inside) => {
    //     console.log("animatew")
    //     gsap.to(selector, {
    //         scale: field() !== "" || is_mouse_inside ? .8 : 1,
    //         y: field() !== "" || is_mouse_inside ? "-80%" : 1,
    //         opacity: field() !== "" || is_mouse_inside ? .8 : 1,
    //         ease: "power2.out",
    //         transformOrigin: "top left",
    //         duration: .2
    //     })
    // }
    //
    // // hover animation
    // const button_animation = (start) => {
    //     gsap.to(".button-background", {
    //         transformOrigin: "top center",
    //         scaleY: start ? 0 : 1,
    //         ease: "power2.out",
    //         duration: .1
    //     })
    // }
    //
    // // animates text when typing and cursor not inside input
    // createEffect(() => {
    //     animate_input(name, name_ref, false)
    // })
    //
    // // sents api request to check hours
    // const check_hours = () => {
    //
    // }

    return (
        <>
            <Header />
            {/*<section class={"w-full h-screen min-h-screen flex flex-col items-center"}>*/}
            {/*    <header class={"text-7xl mb-4"}>HOURS</header>*/}

            {/*    <div ref={wrapper_ref} class={"w-full p-8 text-xl"}>*/}
            {/*        <div class={"container relative w-full"}>*/}
            {/*            <h1 class={"absolute left-0"}>{at_start()}</h1>*/}
            {/*            <h1 class={"absolute right-0"}>{at_end()}</h1>*/}
            {/*            <h1 class={"mx-auto w-fit"}>All Time Hours</h1>*/}
            {/*        </div>*/}
            {/*        <div class={"container relative w-full h-6 bg-gray-400"}>*/}
            {/*            <div ref={all_time_ref} class={"absolute left-0 top-0 h-full w-full bg-kcyellow"}></div>*/}
            {/*        </div>*/}

            {/*        <div class={"container relative w-full mt-4"}>*/}
            {/*            <h1 class={"absolute left-0"}>{yr_start()}</h1>*/}
            {/*            <h1 class={"absolute right-0"}>{yr_end()}</h1>*/}
            {/*            <h1 class={"mx-auto w-fit"}>Year Hours</h1>*/}
            {/*        </div>*/}
            {/*        <div class={"container relative w-full h-6 bg-gray-400"}>*/}
            {/*            <div ref={year_ref} class={"absolute left-0 top-0 h-full w-full bg-kcyellow"}></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <form class="w-full p-8" onsubmit={check_hours}>*/}
            {/*        <div class={"relative border-b-3 border-kcyellow text-3xl"}*/}
            {/*             onmouseenter={() => animate_input(name, name_ref, true)}*/}
            {/*             onmouseleave={() => animate_input(name, name_ref, false)}*/}
            {/*        >*/}
            {/*            <input class={"outline-none relative z-10"} type="text" value={name()}*/}
            {/*                   oninput={(event) => set_name(event.target.value)}*/}
            {/*            />*/}
            {/*            <h1 ref={name_ref} class={"first-name absolute top-0 left-0"}>First Name</h1>*/}
            {/*        </div>*/}

            {/*        <button type={"submit"}*/}
            {/*                class={"relative flex self-end p-2 px-8 mt-8 border-3 border-kcyellow overflow-hidden"}*/}
            {/*                onmouseenter={() => button_animation(true)}*/}
            {/*                onmouseleave={() => button_animation(false)}*/}
            {/*        >*/}
            {/*            <h1 class={"button-text text-2xl text-kcblack z-10"}>Send</h1>*/}
            {/*            <h1 class={"button-text-2 text-2xl text-kcblack z-10 absolute"}>Sent!</h1>*/}
            {/*            <div class="button-background absolute top-0 left-0 z-0 w-full h-full bg-kcyellow"></div>*/}
            {/*        </button>*/}
            {/*    </form>*/}
            {/*</section>*/}
            {/*<Footer/>*/}

            <ResponsiveInput value={name} set_value={set_name} text={"Name"}/>

            <div class="w-1/2 mt-8">
                <ResponsiveButton init_text={"Send"} clicked_text={"Sent!"} on_click={() => console.log("clicked")}/>
            </div>

        </>
    )
}