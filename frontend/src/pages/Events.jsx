import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import {FiArrowUp} from "solid-icons/fi";

export const Events = () => {

    // @ts-ignore
    return (
        <>
            <section class={"w-full h-screen flex flex-col items-center"}>
                <Header/>
                <header class={"text-7xl"}>EVENTS</header>

                <div class={"my-auto"}>
                    <iframe
                        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTz=0&showCalendars=0&src=ZjIzOGY1NzgyYWIwNjg5M2FhMGQ0MzM3YWNhZjBkZjg5ZDU3YTI4ZDI0NTk1OGMyZGIyNzc0Mjc5OWNlMzgzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F4511E"
                        style="border-width:0" width="814" height="600" frameborder="0" scrolling="no">
                    </iframe>
                    <h1 class="ml-[1rem] text-lg! flex flex-col items-left">
                        <FiArrowUp class={"size-[1.25em]"}/>
                        Click this button to add it <br/>
                        to your Google calendar!
                    </h1>
                </div>
            </section>
            <Footer/>
        </>
    )
}