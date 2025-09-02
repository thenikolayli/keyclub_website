<script>
    import {onMount} from "svelte";
    import Header from "$lib/components/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ResponsiveInput from "$lib/components/ResponsiveInput.svelte";
    import ResponsiveButton from "$lib/components/ResponsiveButton.svelte"
    import axios from "axios"
    import SplitText from "gsap/SplitText";
    import gsap from "gsap";

    let firstName = $state("")
    let lastName = $state("")
    let email = $state("")

    let message = $state("")
    let canSend = $state(true)
    let htext

    onMount(() => {
        document.title = "Contact Us"

        const headerText = SplitText.create(htext).words

        gsap.fromTo(headerText, {
            yPercent: 50,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            stagger: 1/5,
            duration: .5,
            delay: .5,
            ease: "power2.out",
        })
    })

    const send_message = (event) => {
        event.preventDefault()
        if (!canSend) return;
        canSend = false

        try {
            const response = axios({
                method: 'POST',
                url: '/api/misc/message',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    contact: email,
                    message: message
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        setTimeout(() => {
            canSend = true
        }, 2000)
    }
</script>

<Header/>
<section class="w-full min-h-screen flex flex-col">
    <div class="relative w-full h-[30vh] flex flex-col items-center justify-center">
        <header bind:this={htext} class="text-white text-4xl">
            CONTACT US
        </header>
        <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src="/contactus/contact.jpg"
             alt="Contact Us Cover"/>
    </div>

    <form onSubmit={send_message}
          class="flex flex-col w-full md:w-[80%] xl:w-[65%] mx-auto my-16 px-12">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full mt-12 text-2xl">
            <ResponsiveInput oninput={(event) => firstName=event.target.value} getvalue={() => firstName} text="First Name"/>
            <ResponsiveInput oninput={(event) => lastName=event.target.value} getvalue={() => lastName} text="Last Name"/>
            <ResponsiveInput oninput={(event) => email=event.target.value} getvalue={() => email} text="Email *"/>
        </div>

        <div class="w-full mt-8 text-2xl">
            <h1 class="mb-1">Message *</h1>
            <textarea
                    oninput={(event) => message=event.target.value}
                    class="p-4 text-2xl w-full border-3 border-kcyellow resize-y overflow-hidden outline-none"
                    rows={10}
            ></textarea>
        </div>

        <ResponsiveButton init_text="Send" clicked_text="Sent!" on_click={send_message} can_send={canSend}/>
    </form>
</section>
<Footer/>