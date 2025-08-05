import {createSignal, onMount} from "solid-js";
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import axios from "axios";
import gsap from "gsap";
import {ResponsiveInput} from "../components/ResponsiveInput.jsx";
import {ResponsiveButton} from "../components/ResponsiveButton.jsx";

export const ContactUs = () => {
    const [first_name, set_first_name] = createSignal("")
    const [last_name, set_last_name] = createSignal("")
    const [email, set_email] = createSignal("")

    const [message, set_message] = createSignal("")
    const [can_send, set_can_send] = createSignal(true)

    onMount(() => {
        document.title = "Contact Us"
    })

    const send_message = (event) => {
        event.preventDefault()
        if (!can_send()) return;
        set_can_send(false)

        try {
            const response = axios({
                method: 'POST',
                url: '/api/message',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    first_name: first_name(),
                    last_name: last_name(),
                    contact: email(),
                    message: message()
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }

        setTimeout(() => {
            set_can_send(true)
        }, 2000)
    }

    return (
        <>
            <Header/>
            <section class="w-full min-h-screen flex flex-col">
                <div class={"relative w-full h-[30rem] flex flex-col items-center justify-center"}>
                    <header class={"text-white text-4xl"}>
                        CONTACT US
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src="/contactus/contact.jpg"
                         alt="Contact Us Cover"/>
                </div>

                <form onSubmit={send_message}
                    class={"flex flex-col w-full md:w-[80%] xl:w-[65%] mx-auto my-16 px-12"}>
                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full mt-12 text-2xl">
                        <ResponsiveInput value={first_name} set_value={set_first_name} text={"First Name"}/>
                        <ResponsiveInput value={last_name} set_value={set_last_name} text={"Last Name"}/>
                        <ResponsiveInput value={email} set_value={set_email} text={"Email *"}/>
                    </div>

                    <div class={"w-full mt-8 text-2xl"}>
                        <h1 class="mb-1">Message *</h1>
                        <textarea
                            value={message()}
                            oninput={(event) => set_message(event.target.value)}
                            class={"p-4 text-2xl w-full border-3 border-kcyellow resize-y overflow-hidden outline-none"}
                            rows={10}
                        />
                    </div>

                    <ResponsiveButton init_text={"Send"} clicked_text={"Sent!"} on_click={send_message} can_send={can_send}/>
                </form>
            </section>
            <Footer/>
        </>
    )
}