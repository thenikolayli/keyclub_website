import {createSignal, onMount} from "solid-js";
import {Header} from "../components/Header.tsx";
import contact_cover from "../assets/contactus/contact.jpg";
import {Footer} from "../components/Footer.tsx";
import axios from "axios";

export const ContactUs = () => {
    const [first_name, set_first_name] = createSignal("")
    const [last_name, set_last_name] = createSignal("")
    const [email, set_email] = createSignal("")
    const [message, set_message] = createSignal("")

    onMount(() => document.title = "Contact Us")

    const send_message = (event: any) => {
        event.preventDefault();

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
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <Header/>
            <section class="w-full h-screen flex flex-col">
                <div class={"relative w-full h-[13rem] flex flex-col items-center justify-center"}>
                    <header class={"text-white text-7xl"}>
                        CONTACT US
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src={contact_cover}
                         alt="Contact Us Cover"/>
                </div>

                <section class={"p-[6rem] flex flex-col flex-1"}>
                    <header class={"text-7xl"}>Let's Chat!</header>

                    <form
                        onsubmit={send_message}
                        class={"flex flex-col flex-1"}>
                        <div class="grid grid-cols-3 gap-[2rem] w-full mt-[2rem]">
                            <div class={"w-full"}>
                                <h1 class="text-gray-600 mb-[.25rem]">First Name</h1>
                                <input
                                    value={first_name()}
                                    oninput={(event) => set_first_name(event.target.value)}
                                    type="text"
                                    class={"p-[1rem] text-2xl w-full border-[.2rem] border-black"}/>
                            </div>

                            <div class={"w-full"}>
                                <h1 class="text-gray-600 mb-[.25rem]">Last Name</h1>
                                <input
                                    value={last_name()}
                                    oninput={(event) => set_last_name(event.target.value)}
                                    type="text"
                                    class={"p-[1rem] text-2xl w-full border-[.2rem] border-black"}/>
                            </div>

                            <div class={"w-full"}>
                                <h1 class="text-gray-600 mb-[.25rem]">Email/Phone *</h1>
                                <input
                                    value={email()}
                                    oninput={(event) => set_email(event.target.value)}
                                    type="text"
                                    class={"p-[1rem] text-2xl w-full border-[.2rem] border-black"}
                                    required/>
                            </div>
                        </div>

                        <div class={"w-full mt-[2rem] flex flex-col flex-1"}>
                            <h1 class="text-gray-600 mb-[.25rem]">Message *</h1>
                            <textarea
                                value={message()}
                                oninput={(event) => set_message(event.target.value)}
                                class={"p-[1rem] text-2xl w-full border-[.2rem] border-black flex resize-y overflow-hidden"}
                                required
                            />
                        </div>

                        <button type={"submit"} class={"relative flex self-end mt-[2rem] w-fit text-4xl bg-[#ffde71] p-[1rem] px-[6rem] rounded-full hover:shadow-lg transition duration-300"}>Send</button>
                    </form>

                </section>
            </section>
            <Footer/>
        </>
    )
}