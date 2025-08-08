import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {createEffect, createSignal, onMount} from "solid-js";
import gsap from "gsap";
import {ResponsiveInput} from "../components/ResponsiveInput.jsx";
import {ResponsiveButton} from "../components/ResponsiveButton.jsx";
import axios from "axios";
// import moment from "moment";
import moment from "moment-timezone"

export const TestPage = () => {
    const at_goals = [0, 25, 50, 100, 150, 200, 250, 300, 400, 500, 600]
    const yr_goals = [0, 10, 25, 50, 70, 100, 150, 200, 250, 300]

    const [at_start, set_at_start] = createSignal(at_goals[0])
    const [at_end, set_at_end] = createSignal(at_goals[1])
    const [yr_start, set_yr_start] = createSignal(yr_goals[0])
    const [yr_end, set_yr_end] = createSignal(yr_goals[1])

    const [at_hours, set_at_hours] = createSignal(0)
    const [yr_hours, set_yr_hours] = createSignal(0)

    const [name, set_name] = createSignal("")

    let wrapper_ref
    let at_ref
    let yr_ref
    let at_hours_ref
    let yr_hours_ref

    const [at_anim, set_at_anim] = createSignal(false)
    const [yr_anim, set_yr_anim] = createSignal(false)
    const [can_send, set_can_send] = createSignal(true)
    const [last_updated, set_last_updated] = createSignal("")
    const [api_response, set_api_response] = createSignal("")
    const [header, set_header] = createSignal("")

    // resets progress bars and hides them
    onMount(async () => {
        document.title = "Hour Checker"
        gsap.set([at_ref, yr_ref], {
            scaleX: 0,
            transformOrigin: "center left",
        })
        gsap.set([wrapper_ref, at_hours_ref, yr_hours_ref], {
            opacity: 0
        })

        // gets when the hours were last updated
        try {
            const result = await axios({
                url: "/api/hours_last_updated",
                method: "get"
            })

            let last_update = moment.unix(result.data)
            last_update = last_update.tz("America/Los_Angeles").format("MMMM Do YYYY, h:mm:ss a")
            set_last_updated(last_update)
        } catch (error) {
            console.error(error)
            set_last_updated("Never... (error fetching last update)")
        }
    })


    // sents api request to check hours
    const check_hours = async (event) => {
        event.preventDefault()
        if (!can_send()) return;
        set_can_send(false)
        set_api_response("")

        try {
            set_header("")
            gsap.set([at_ref, yr_ref], {
                scaleX: 0,
                transformOrigin: "center left",
            })
            gsap.set([at_hours_ref, yr_hours_ref], {
                opacity: 0
            })
            set_at_start(at_goals[0])
            set_at_end(at_goals[1])
            set_yr_start(yr_goals[0])
            set_yr_end(yr_goals[1])

            const response = await axios({
                url: "/api/get_hours",
                method: "get",
                params: {
                    name: name()
                }
            })

            set_header(`Hours for ${response.data["name"]} - ${response.data["year"]}`)
            set_at_hours(response.data["all_hours"])
            set_yr_hours(response.data["term_hours"])

            setTimeout(() => {
                gsap.to(wrapper_ref, {
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out"
                })

                setTimeout(() => {
                    set_at_anim(true)
                    set_yr_anim(true)
                    animate_pbars(at_ref, at_goals, at_hours, at_hours_ref, set_at_start, set_at_end, at_anim, set_at_anim)
                    animate_pbars(yr_ref, yr_goals, yr_hours, yr_hours_ref, set_yr_start, set_yr_end, yr_anim, set_yr_anim)
                }, 1000)
            }, 2000)
        } catch (error) {
            console.error(error)
            set_api_response("error!")
            setTimeout(() => set_can_send(true), 2000)
        }
    }

    const animate_pbars = (pbar_ref, pbar_goals, pbar_hours, pbar_hours_ref, set_pbar_start, set_pbar_end, anim, set_anim, current_goal = 1) => {
        set_pbar_start(pbar_goals[current_goal - 1])
        set_pbar_end(pbar_goals[current_goal])

        let scale = pbar_hours() > pbar_goals[current_goal] ? 1 : pbar_hours()/pbar_goals[current_goal]

        gsap.set(pbar_ref, {
            scaleX: 0
        })
        gsap.to(pbar_ref, {
            scaleX: scale,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                if (pbar_hours() > pbar_goals[current_goal]) {
                    animate_pbars(pbar_ref, pbar_goals, pbar_hours, pbar_hours_ref, set_pbar_start, set_pbar_end, anim, set_anim,current_goal + 1)
                }
            },
        })

        // if this is the last recursion
        if (scale < 1) {
            gsap.to(pbar_hours_ref, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            })

            set_anim(false)
            // if both animations stopped
            if (!at_anim() && !yr_anim()) set_can_send(true)
        }
    }

    return (
        <>
            <Header />

            <section class={"relative w-full h-screen min-h-screen flex flex-col items-center"}>
                <header class={"text-7xl mb-4"}>HOURS</header>

                <div ref={wrapper_ref} class={"w-full p-8 text-xl mt-8"}>
                    <h1 class={"text-3xl text-center w-full"}>{header()}</h1>

                    <div class={"container relative w-full mt-8"}>
                        <h1 class={"absolute left-0"}>{at_start()}</h1>
                        <h1 class={"absolute right-0"}>{at_end()}</h1>
                        <h1 class={"mx-auto w-fit"}>All Time Hours</h1>
                        <h1 class={"absolute w-full z-10 text-center font-bold"} ref={at_hours_ref}>{at_hours()}</h1>
                    </div>
                    <div class={"container relative w-full h-6 bg-gray-400"}>
                        <div ref={at_ref} class={"absolute left-0 top-0 h-full w-full bg-kcyellow"}></div>
                    </div>

                    <div class={"container relative w-full mt-4"}>
                        <h1 class={"absolute left-0"}>{yr_start()}</h1>
                        <h1 class={"absolute right-0"}>{yr_end()}</h1>
                        <h1 class={"mx-auto w-fit"}>Year Hours</h1>
                        <h1 class={"absolute w-full z-10 text-center font-bold"} ref={yr_hours_ref}>{yr_hours()}</h1>
                    </div>
                    <div class={"container relative w-full h-6 bg-gray-400"}>
                    <div ref={yr_ref} class={"absolute left-0 top-0 h-full w-full bg-kcyellow"}></div>
                    </div>

                    <h1>{api_response()}</h1>
                </div>

                <form class="w-full mt-8 p-8" onsubmit={check_hours}>
                    <ResponsiveInput value={name} set_value={set_name} text={"Name"} />
                    <ResponsiveButton init_text={"Check hours"} clicked_text={"..."} on_click={check_hours} can_send={can_send} />
                </form>

                <div class={"container absolute bottom-8 w-full text-center"}>
                    <h1>Hours were last updated on {last_updated()}</h1>
                </div>
            </section>
            <Footer/>

        </>
    )
}