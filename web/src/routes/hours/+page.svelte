<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte";
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import ImageHeader from "$lib/components/ImageHeader.svelte";
    import { onMount } from "svelte";
    import axios from "axios";
    import gsap from "gsap";
    import moment from "moment-timezone";

    const atGoals = [0, 25, 50, 100, 150, 200, 250, 300, 400, 500, 600];
    const yrGoals = [0, 10, 25, 50, 70, 100, 150, 200, 250, 300];

    let atStart = $state(atGoals[0]);
    let atEnd = $state(atGoals[1]);
    let yrStart = $state(yrGoals[0]);
    let yrEnd = $state(yrGoals[1]);
    let atHours = $state(0);
    let yrHours = $state(0);
    let name = $state("");

    let wrapperElement;
    let atElement;
    let yrElement;
    let atHoursElement;
    let yrHoursElement;

    let atAnim = $state(false);
    let yrAnim = $state(false);
    let canSend = $state(true);
    let lastUpdated = $state("");
    let apiResponse = $state("");
    let header = $state("");

    // resets progress bars and hides them
    onMount(async () => {
        document.title = "Hour Checker";
        gsap.set([atElement, yrElement], {
            scaleX: 0,
            transformOrigin: "center left",
        });
        gsap.set([wrapperElement, atHoursElement, yrHoursElement], {
            opacity: 0,
        });

        // gets when the hours were last updated
        try {
            const result = await axios({
                url: "/api/hours/hours_last_updated",
                method: "get",
            });
            let lastUpdate = moment.unix(result.data);
            lastUpdate = lastUpdate
                .tz("America/Los_Angeles")
                .format("MMMM Do YYYY, h:mm:ss a");
            lastUpdated = lastUpdate;
        } catch (error) {
            console.error(error);
            lastUpdated = "never... (error fetching last update)";
        }
    });

    // sends api request to check hours
    const check_hours = async (event) => {
        event.preventDefault();
        if (!canSend) return;
        canSend = false;
        apiResponse = "";

        try {
            gsap.set(wrapperElement, {
                opacity: 0,
            });
            header = "";
            gsap.set([atElement, yrElement], {
                scaleX: 0,
                transformOrigin: "center left",
            });
            gsap.set([atHoursElement, yrHoursElement], {
                opacity: 0,
            });
            atStart = atGoals[0];
            atEnd = atGoals[1];
            yrStart = yrGoals[0];
            yrEnd = yrGoals[1];

            const response = await axios({
                url: "/api/hours/get_hours",
                method: "get",
                params: { name: name },
            });

            header = `Hours for ${response.data["name"]} - class of ${response.data["grad_year"]}`;
            atHours = response.data["all_hours"];
            yrHours = response.data["term_hours"];

            gsap.to(wrapperElement, {
                opacity: 1,
                duration: 1,
                ease: "power1.out",
            });

            setTimeout(() => {
                atAnim = true;
                yrAnim = true;
                animate_pbars(
                    atElement,
                    atGoals,
                    atHours,
                    atHoursElement,
                    (value) => (atStart = value),
                    (value) => (atEnd = value),
                    (value) => (atAnim = value),
                );
                animate_pbars(
                    yrElement,
                    yrGoals,
                    yrHours,
                    yrHoursElement,
                    (value) => (yrStart = value),
                    (value) => (yrEnd = value),
                    (value) => (yrAnim = value),
                );
            }, 1000);
        } catch (error) {
            console.error(error);
            apiResponse = "Error finding hours.";
            setTimeout(() => (canSend = true), 2000);
        }
    };

    const animate_pbars = (
        pbarElement,
        pbarGoals,
        pbarHours,
        pbarHoursElement,
        setPbarStart,
        setPbarEnd,
        setAnim,
        currentGoal = 1,
    ) => {
        setPbarStart(pbarGoals[currentGoal - 1]);
        setPbarEnd(pbarGoals[currentGoal]);

        // scale is 1 if you've surpassed the current goal or progress from previous goal to current goal
        let scale =
            pbarHours > pbarGoals[currentGoal]
                ? 1
                : (pbarHours - pbarGoals[currentGoal - 1]) /
                  (pbarGoals[currentGoal] - pbarGoals[currentGoal - 1]);
        gsap.set(pbarElement, {
            scaleX: 0,
        });
        gsap.to(pbarElement, {
            scaleX: scale,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                if (pbarHours > pbarGoals[currentGoal]) {
                    animate_pbars(
                        pbarElement,
                        pbarGoals,
                        pbarHours,
                        pbarHoursElement,
                        setPbarStart,
                        setPbarEnd,
                        setAnim,
                        currentGoal + 1,
                    );
                }
            },
        });

        // if this is the last recursion
        if (scale < 1) {
            gsap.to(pbarHoursElement, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
            });

            setAnim(false);
            // if both animations stopped
            if (!atAnim && !yrAnim) canSend = true;
        }
    };
</script>

<Header />
<section class="w-full h-auto bg-stone-200">
    <ImageHeader text="Hours" imageSrc="/hours.png" dim={true} />
    <div
        class="relative w-full lg:w-1/2 mx-auto h-screen min-h-screen flex flex-col items-center p-4 text-kcblack bg-stone-200"
    >
        <div bind:this={wrapperElement} class="w-full py-8 text-xl mt-8">
            <h1 class="text-3xl text-center w-full">{header}</h1>
            <div class="container relative w-full mt-8">
                <h3 class="absolute left-0">{atStart}</h3>
                <h3 class="absolute right-0">{atEnd}</h3>
                <h2 class="mx-auto w-fit">All Time Hours</h2>
                <h2
                    class="absolute w-full z-10 text-center font-bold"
                    bind:this={atHoursElement}
                >
                    {atHours}
                </h2>
            </div>
            <div class="container relative w-full h-6 bg-gray-400">
                <div
                    bind:this={atElement}
                    class="absolute left-0 top-0 h-full w-full bg-kcyellow"
                ></div>
            </div>
            <div class="container relative w-full mt-4">
                <h3 class="absolute left-0">{yrStart}</h3>
                <h3 class="absolute right-0">{yrEnd}</h3>
                <h2 class="mx-auto w-fit">Year Hours</h2>
                <h2
                    class="absolute w-full z-10 text-center font-bold"
                    bind:this={yrHoursElement}
                >
                    {yrHours}
                </h2>
            </div>
            <div class="container relative w-full h-6 bg-gray-400">
                <div
                    bind:this={yrElement}
                    class="absolute left-0 top-0 h-full w-full bg-kcyellow"
                ></div>
            </div>
        </div>
        <form class="w-full mt-8 p-8" onsubmit={check_hours}>
            <ResponsiveInput
                oninput={(event) => (name = event.target.value)}
                getvalue={() => name}
                text="Name"
            />
            <ResponsiveButton
                init_text="Check hours"
                clicked_text="..."
                on_click={check_hours}
                can_send={canSend}
            />
            <p class="text-2xl mt-4">{apiResponse}</p>
        </form>
        <div class={"container absolute bottom-8 w-full text-center p-4"}>
            <p>Hours were last updated on {lastUpdated}</p>
        </div>
    </div>
</section>
<Footer />
