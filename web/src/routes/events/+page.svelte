<script>
    import {onMount} from "svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import ImageHeader from "$lib/components/ImageHeader.svelte";

    onMount(() => {
        document.title = "Events"
    })
</script>

<Header/>

<section class="w-full h-screen min-h-screen flex flex-col items-center bg-stone-200">
    <ImageHeader text="Events" imageSrc="/events.jpeg" dim={true}/>

    <div class="h-[100vh] lg:w-[70%] flex flex-col items-center justify-center p-4">
        <iframe title=""
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTz=0&showCalendars=0&src=ZjIzOGY1NzgyYWIwNjg5M2FhMGQ0MzM3YWNhZjBkZjg5ZDU3YTI4ZDI0NTk1OGMyZGIyNzc0Mjc5OWNlMzgzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E"
                class="h-full w-full">
        </iframe>
    </div>

    <p class="text-kcblack p-8 text-xl">
        You must add a specific event or the entire calendar to your personal Google Calendar to see the event sign up Google Doc.
    </p>
</section>

<Footer/>