import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {FiArrowUp} from "solid-icons/fi";
import {onMount} from "solid-js";

export const Events = () => {
    onMount(() => {
        document.title = "Events";
    })

    return (
        <>
            <Header/>
            <section class={"w-full h-screen min-h-screen flex flex-col items-center"}>
                <header class={"text-7xl mb-4"}>EVENTS</header>

                <div class={"h-full w-full lg:w-[70%] flex flex-col items-center justify-center p-4"}>
                    <iframe
                        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTz=0&showCalendars=0&src=ZjIzOGY1NzgyYWIwNjg5M2FhMGQ0MzM3YWNhZjBkZjg5ZDU3YTI4ZDI0NTk1OGMyZGIyNzc0Mjc5OWNlMzgzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E"
                        class={"h-full w-full"}>
                    </iframe>
                    <h1 class="mt-2 text-lg flex flex-col self-end">
                        <FiArrowUp class={"size-6 flex self-end"}/>
                        Click this button to add it <br/>
                        to your Google calendar!
                    </h1>
                </div>
            </section>
            <Footer/>
        </>
    )
}