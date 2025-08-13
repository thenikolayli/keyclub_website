<script>
    import Header from "$lib/components/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte";
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import {onMount} from "svelte";
    import axios from "axios";
    import gsap from "gsap";
    import moment from "moment-timezone"

    const at_goals = [0, 25, 50, 100, 150, 200, 250, 300, 400, 500, 600]
    const yr_goals = [0, 10, 25, 50, 70, 100, 150, 200, 250, 300]

    let at_start = $state(at_goals[0])
    let at_end = $state(at_goals[1])
    let yr_start = $state(yr_goals[0])
    let yr_end = $state(yr_goals[1])
    let at_hours = $state(0)
    let yr_hours = $state(0)
    let name = $state("")

    let wrapper_element
    let at_element
    let yr_element
    let at_hours_element
    let yr_hours_element

    let at_anim = $state(false)
    let yr_anim = $state(false)
    let can_send = $state(true)
    let last_updated = $state("")
    let api_response = $state("")
    let header = $state("")

    // resets progress bars and hides them
    onMount(async () => {
        document.title = "Hour Checker"
        gsap.set([at_element, yr_element], {
            scaleX: 0,
            transformOrigin: "center left",
        })
        gsap.set([wrapper_element, at_hours_element, yr_hours_element], {
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
            last_updated = last_update
        } catch (error) {
            console.error(error)
            last_updated = "never... (error fetching last update)"
        }
    })


    // sends api request to check hours
    const check_hours = async (event) => {
        event.preventDefault()
        if (!can_send) return;
        can_send = false
        api_response = ""

        try {
            header = ""
            gsap.set([at_element, yr_element], {
                scaleX: 0,
                transformOrigin: "center left",
            })
            gsap.set([at_hours_element, yr_hours_element], {
                opacity: 0
            })
            at_start = at_goals[0]
            at_end = at_goals[1]
            yr_start = yr_goals[0]
            yr_end = yr_goals[1]

            const response = await axios({
                url: "/api/get_hours",
                method: "get",
                params: {
                    name: name
                }
            })

            header = `Hours for ${response.data["name"]} - ${response.data["year"]}`
            at_hours = response.data["all_hours"]
            yr_hours = response.data["term_hours"]

            setTimeout(() => {
                gsap.to(wrapper_element, {
                    opacity: 1,
                    duration: 1,
                    ease: "power1.out"
                })

                setTimeout(() => {
                    at_anim = true
                    yr_anim = true
                    animate_pbars(at_element, at_goals, at_hours, at_hours_element, (value) => at_start=value, (value) => at_end=value, (value) => at_anim=value)
                    animate_pbars(yr_element, yr_goals, yr_hours, yr_hours_element, (value) => yr_start=value, (value) => yr_end=value, (value) => yr_anim=value)
                }, 1000)
            }, 2000)

        } catch (error) {
            console.error(error)
            api_response = "error!"
            setTimeout(() => can_send = true, 2000)
        }
    }

    const animate_pbars = (pbar_element, pbar_goals, pbar_hours, pbar_hours_element, set_pbar_start, set_pbar_end, set_anim, current_goal = 1) => {
        set_pbar_start(pbar_goals[current_goal - 1])
        set_pbar_end(pbar_goals[current_goal])

        let scale = pbar_hours > pbar_goals[current_goal] ? 1 : pbar_hours/pbar_goals[current_goal]
        gsap.set(pbar_element, {
            scaleX: 0
        })
        gsap.to(pbar_element, {
            scaleX: scale,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                if (pbar_hours > pbar_goals[current_goal]) {
                    animate_pbars(pbar_element, pbar_goals, pbar_hours, pbar_hours_element, set_pbar_start, set_pbar_end, set_anim, current_goal + 1)
                }
            },
        })

        // if this is the last recursion
        if (scale < 1) {
            gsap.to(pbar_hours_element, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            })

            set_anim(false)
            // if both animations stopped
            if (!at_anim && !yr_anim) can_send = true
        }
    }
</script>

<Header />
<section class="relative w-full h-screen min-h-screen flex flex-col items-center p-4">
    <header class="text-7xl mb-4">HOURS</header>
    <div bind:this={wrapper_element} class="w-full py-8 text-xl mt-8">
        <h1 class="text-3xl text-center w-full">{header}</h1>
        <div class="container relative w-full mt-8">
            <h1 class="absolute left-0">{at_start}</h1>
            <h1 class="absolute right-0">{at_end}</h1>
            <h1 class="mx-auto w-fit">All Time Hours</h1>
            <h1 class="absolute w-full z-10 text-center font-bold" bind:this={at_hours_element}>{at_hours}</h1>
        </div>
        <div class="container relative w-full h-6 bg-gray-400">
            <div bind:this={at_element} class="absolute left-0 top-0 h-full w-full bg-kcyellow"></div>
        </div>
        <div class="container relative w-full mt-4">
            <h1 class="absolute left-0">{yr_start}</h1>
            <h1 class="absolute right-0">{yr_end}</h1>
            <h1 class="mx-auto w-fit">Year Hours</h1>
            <h1 class="absolute w-full z-10 text-center font-bold" bind:this={yr_hours_element}>{yr_hours}</h1>
        </div>
        <div class="container relative w-full h-6 bg-gray-400">
            <div bind:this={yr_element} class="absolute left-0 top-0 h-full w-full bg-kcyellow"></div>
        </div>
        <h1>{api_response}</h1>
    </div>
    <form class="w-full mt-8 p-8" onsubmit={check_hours}>
        <ResponsiveInput oninput={(event) => name=event.target.value} text={"Name"} />
        <ResponsiveButton init_text="Check hours" clicked_text="..." on_click={check_hours} can_send={can_send} />
    </form>
    <div class={"container absolute bottom-8 w-full text-center p-4"}>
        <h1>Hours were last updated on {last_updated}</h1>
    </div>
</section>
<Footer/>
