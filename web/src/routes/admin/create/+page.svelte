<script>
    import {getContext, onMount} from "svelte";
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import axios from "axios";

    let usernameField = $state("")
    let password = $state("")
    let apiResponse = $state("")
    let tab = $state("logEvent")

    let username = getContext("username")
    let userId = getContext("userId")
    let admin = getContext("admin")

    onMount(() => {
        document.title = "Create an account";
    })

    // context may not load on mount, may be late
    $effect(() => {
        if (username.value && userId.value) {
            window.location.href = "/admin"
        }
    })

    const submitLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await axios({
                method: "post",
                url: "/api/users/",
                data: {
                    username: usernameField,
                    password: password,
                }
            })

            if (response.status === 201) {
                apiResponse = "Account created, log in."
            }
        } catch (error) {
            console.log(error.response.data)
            apiResponse = "Error creating account."
            if (error.status === 422) {
                apiResponse = error.response.data.detail[0].msg
            }
        }
    }
</script>

<section class="relative w-full h-screen min-h-screen bg-kcblack text-kcblack">
    <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <form onsubmit={submitLogin} class="relative p-8 bg-kcblack border-3 border-kcyellow">
            <header class="text-5xl text-kcyellow">Create an account</header>

            <div class="mt-12 space-y-8">
                <ResponsiveInput text="Username" oninput={(event) => usernameField = event.target.value} getvalue={() => usernameField} textcolor="#FFFFFF"/>
                <ResponsiveInput text="Password" oninput={(event) => password = event.target.value} getvalue={() => password} textcolor="#FFFFFF"/>
            </div>

            <button formaction="submit" class="bg-kcyellow text-kcblack w-full text-3xl mt-12 p-4">
                Submit
            </button>
            <p class="text-white w-full text-xl mt-4">{apiResponse}</p>
        </form>

        <a class="relative text-stone-200 text-center w-full text-xl underline mt-8 block" href="/admin/">Login</a>
    </div>
</section>