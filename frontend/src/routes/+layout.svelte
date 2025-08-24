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
        // attempts to refresh tokens
        try {
            await axios({
                method: "get",
                url: "/api/auth/refresh",
            })
        } catch (error) {}

        // attempts to get user info
        try {
            const userData = await axios({
                method: "get",
                url: "/api/auth/me",
            })

            // console.log(userData.data.username)

            userId.value = userData.data.user_id
            username.value = userData.data.username
            admin.value = userData.data.admin
        } catch (error) {
            console.log(error)
        }
    })
</script>

<svelte:head>
</svelte:head>

{@render children?.()}
