<script>
    import {getContext, onMount} from "svelte";
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import axios from "axios";
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte";

    let usernameField = $state("")
    let password = $state("")
    let apiResponse = $state("")
    let tab = $state("logEvent")

    let username = getContext("username")
    let userId = getContext("userId")
    let admin = getContext("admin")

    let eventLink = $state("")
    let eventHoursMultiplier = $state(1)
    let eventApiResponse = $state("")
    let canSendEvent = $state(true)
    let eventResponseTitle = $state("")
    let eventResponseVolunteers = $state({})

    let bannerCurrentMessage = $state("")
    let bannerCurrentShow = $state(false)
    let bannerMessage = $state("")
    let bannerShow
    let bannerApiResponse = $state("")
    let canSendBanner = $state(true)

    onMount(async () => {
        document.title = "Admin";

        try {
            const response = await axios({
                method: "get",
                url: "/api/misc/get_banner"
            })

            if (response.status === 200) {
                bannerCurrentMessage = response.data.message
                bannerCurrentShow = response.data.show
            }
        } catch (error) {
            console.log(error)
        }
    })

    const submitLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await axios({
                method: "post",
                url: "/api/auth/login",
                data: {
                    username: usernameField,
                    password: password,
                }
            })

            if (response.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            apiResponse = "Invalid credentials."
        }
    }

    const submitLogEvent = async (event) => {
        event.preventDefault()
        if (!canSendEvent) return
        canSendEvent = false
        eventApiResponse = ""

        try {
            const response = await axios({
                method: "post",
                url: "/api/event/log_event",
                data: {
                    link: eventLink,
                    hours_multiplier: eventHoursMultiplier,
                }
            })

            if (response.status === 200) {
                eventApiResponse = response.data.data
                eventResponseTitle = response.data.event_title
                eventResponseVolunteers = response.data.volunteers
            }

            console.log(response.data)
            console.log(Object.entries(response.data.volunteers))
        } catch (error) {
            console.log(error)
            if (error.response.status === 422) {
                eventApiResponse = "No link."
            }
            eventApiResponse = "Error logging event."
        }

        setTimeout(() => canSendEvent = true, 1000)
    }

    const submitSetBanner = async (event) => {
        event.preventDefault()
        if (!canSendBanner) return
        canSendBanner = false
        bannerApiResponse = ""

        try {
            const response = await axios({
                method: "post",
                url: "/api/misc/update_banner",
                data: {
                    message: bannerMessage,
                    show: bannerShow.checked,
                }
            })

            if (response.status === 200) {
                bannerApiResponse = response.data
                bannerCurrentMessage = bannerMessage
                bannerCurrentShow = bannerShow.checked
            }
        } catch (error) {
            console.log(error)
            bannerApiResponse = "Error setting banner."
        }

        setTimeout(() => canSendBanner = true, 1000)
    }
</script>

<section class="relative w-full h-screen min-h-screen bg-kcblack text-kcblack">
    {#if username.value && admin.value}
        <header class="w-full bg-stone-200 min-h-[120px] text-3xl px-8 pt-8 pb-4 text-center">
            <h1>Hello, {username.value}!</h1>

            <section class="mt-4 flex space-x-4 mx-auto w-fit">
                <div>
                    <label for="logEvent" class="text-xl border-2 p-2 font-light border-kcblack text-kcblack has-checked:text-white has-checked:bg-kcblack transition duration-100 cursor-pointer">
                        Log Events
                        <input type="radio" name="tab" id="logEvent" class="hidden" onclick={() => tab = "logEvent"} checked/>
                    </label>
                </div>
                <div>
                    <label for="logMeeting" class="text-xl border-2 p-2 font-light border-kcblack text-kcblack has-checked:text-white has-checked:bg-kcblack transition duration-100 cursor-pointer">
                        Log Meetings
                        <input type="radio" name="tab" id="logMeeting" class="hidden" onclick={() => tab = "logMeeting"} />
                    </label>
                </div>
                <div>
                    <label for="photos" class="text-xl border-2 p-2 font-light border-kcblack text-kcblack has-checked:text-white has-checked:bg-kcblack transition duration-100 cursor-pointer">
                        Check Photos
                        <input type="radio" name="tab" id="photos" class="hidden" onclick={() => tab = "photos"} />
                    </label>
                </div>
                <div>
                    <label for="banner" class="text-xl border-2 p-2 font-light border-kcblack text-kcblack has-checked:text-white has-checked:bg-kcblack transition duration-100 cursor-pointer">
                        Banner
                        <input type="radio" name="tab" id="banner" class="hidden" onclick={() => tab = "banner"} />
                    </label>
                </div>
            </section>
        </header>

        <section class="mx-auto bg-stone-800 w-full md:w-1/2 p-8 mt-8 border-3 border-stone-700 text-stone-300">
            {#if tab === "logEvent"}
                <header class="text-3xl">Log Events</header>

                <p class="mt-4">
                    NOTE! If the sign up sheet already has hours filled out, the multiplier will be applied twice!
                    Don't set the hours multiplier if the event sign up sheet already has hours calculated.
                </p>

                <form action="submit" onsubmit={submitLogEvent} class="mt-10 space-y-12">
                    <ResponsiveInput text="Link" oninput={(event) => eventLink = event.target.value} getvalue={() => eventLink} textcolor="#d6d3d1"/>
                    <ResponsiveInput text="Hours Multiplier" oninput={(event) => eventHoursMultiplier = event.target.value} getvalue={() => eventHoursMultiplier} textcolor="#d6d3d1"/>
                    <ResponsiveButton init_text="Submit" clicked_text="..." on_click={submitLogEvent} can_send={canSendEvent} />

                    <span class="text-xl">{eventApiResponse}</span>
                </form>

                {#if eventResponseVolunteers.length > 0}
                    <table class="w-full mt-8">
                        <thead>
                        <tr>
                            <th class="font-light">Name</th>
                            <th class="font-light">Logged</th>
                            <th class="font-light">Hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each Object.values(eventResponseVolunteers) as entry}
                            <tr>
                                <th class="font-light">{entry["name"]}</th>
                                <th class="font-light">
                                    {#if entry["logged"]}
                                        ✅
                                    {:else}
                                        ❌
                                    {/if}
                                </th>
                                <th class="font-light">{entry["hours"]}</th>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                {/if}
            {:else if tab === "logMeeting"}
                <header class="text-3xl">Log Meetings</header>
                Not implemented yet...
            {:else if tab === "photos"}
                <header class="text-3xl">Photos</header>
                Not implemented yet...
            {:else if tab === "banner"}
                <header class="text-3xl">Banner</header>

                <div class="text-2xl mt-4">
                    <h1>Current banner message: "{bannerCurrentMessage}"</h1>
                    <h1>Current banner shown:
                        {#if bannerCurrentShow}
                            ✅
                        {:else}
                            ❌
                        {/if}
                    </h1>
                </div>

                <form action="submit" onsubmit={submitSetBanner} class="mt-14 space-y-12">
                    <ResponsiveInput text="Message" oninput={(event) => bannerMessage = event.target.value} getvalue={() => bannerMessage} textcolor="#d6d3d1"/>
                    <div class="flex">
                        <label class="text-3xl mr-2" for="showBanner">Show banner?</label>
                        <input bind:this={bannerShow} class="size-8" type="checkbox" name="showBanner" id="showBanner">
                    </div>
                    <ResponsiveButton init_text="Submit" clicked_text="..." on_click={submitSetBanner} can_send={canSendBanner} />

                    <span class="text-xl">{bannerApiResponse}</span>
                </form>
            {/if}
        </section>

        <section class="w-fit mx-auto mt-16">
            <button class="text-3xl underline text-stone-200" onclick={async () => {
                await axios({
                    method: "get",
                    url: "/api/auth/logout",
                })
                window.location.reload()
            }
            }>Log out</button>
        </section>
    {:else if username.value && !admin.value}
        <div class="absolute w-full md:w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div class="relative p-8 bg-kcblack border-3 border-kcyellow">
                <header class="text-5xl text-kcyellow">Hello, {username.value}</header>

                <p class="text-3xl text-stone-200 mt-8">
                    You do not have admin priveleges.
                </p>
            </div>

            <button class="text-3xl underline text-stone-200 mt-8" onclick={async () => {
                await axios({
                    method: "get",
                    url: "/api/auth/logout",
                })
                window.location.reload()
            }
            }>Log out</button>
        </div>
    {:else}
        <div class="absolute w-full md:w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <form onsubmit={submitLogin} class="relative p-8 bg-kcblack border-3 border-kcyellow">
                <header class="text-5xl text-kcyellow">Login</header>

                <div class="mt-12 space-y-8">
                    <ResponsiveInput text="Username" oninput={(event) => usernameField = event.target.value} getvalue={() => usernameField} textcolor="#FFFFFF"/>
                    <ResponsiveInput text="Password" oninput={(event) => password = event.target.value} getvalue={() => password} textcolor="#FFFFFF"/>
                </div>

                <button formaction="submit" class="bg-kcyellow text-kcblack w-full text-3xl mt-12 p-4">
                    Log in
                </button>
                <p class="text-white w-full text-xl mt-4">{apiResponse}</p>
            </form>

            <a class="relative text-stone-200 text-center w-full text-xl underline mt-8 block" href="/admin/create">Create an account</a>
        </div>

    {/if}
</section>