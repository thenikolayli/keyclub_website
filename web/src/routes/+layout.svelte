<script lang="ts">
	import '../app.css';
    import {onMount, setContext} from "svelte";
    import axios from "axios";

	let { children } = $props();

    // user data starts off blank and loads in with /me if user is logged in
    let userId = $state({value: -1})
    let username = $state({value: ""})
    let admin = $state({value: false})

    // served as objects for type safety
    setContext("userId", userId)
    setContext("username", username)
    setContext("admin", admin)

    onMount(async () => {
        await refreshToken()
        await getMe()
        // refreshes token every 4.5 minutes automatically
        setInterval(async () => {
            await refreshToken()
            await getMe()
        }, 4.5 * 60 * 1000)
    })

    const refreshToken = async () => {
        try {
            await axios({
                method: "get",
                url: "/api/auth/refresh",
            })
        } catch (error) {}
    }

    const getMe = async () => {
        try {
            const userData = await axios({
                method: "get",
                url: "/api/auth/me",
            })

            userId.value = userData.data.user_id
            username.value = userData.data.username
            admin.value = userData.data.admin
        } catch (error) {
            console.log(error)
        }
    }
</script>

<svelte:head>
</svelte:head>

{@render children?.()}
