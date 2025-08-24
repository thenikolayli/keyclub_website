<script>
    import {getContext, onMount} from "svelte";
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import axios from "axios";

    let usernameField = $state("")
    let password = $state("")
    let apiResponse = $state("")

    let username = getContext("username")
    let userId = getContext("userId")
    let admin = getContext("admin")

    onMount(() => {
        document.title = "Admin";
    })

    const onsubmit = async (event) => {
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
            apiResponse = "Invalid credentials"
        }
    }
</script>

{#if username.value}
    <section class="relative w-full h-screen bg-kcblack">
        <header>Hello, {username.value}</header>
    </section>
    {:else}
    <section class="relative w-full h-screen bg-kcblack">
        <form onsubmit={onsubmit} class="absolute p-8 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-kcblack border-3 border-kcyellow">
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
    </section>
    {/if}