import {createSignal, onMount} from "solid-js";
import {Header} from "../components/Header.jsx";
import contact_cover from "../assets/contactus/contact.jpg";
import {Footer} from "../components/Footer.jsx";
import axios from "axios";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const ContactUs = () => {
    const [first_name, set_first_name] = createSignal("")
    const [last_name, set_last_name] = createSignal("")
    const [email, set_email] = createSignal("")
    const [message, set_message] = createSignal("")
    const [can_send, set_can_send] = createSignal(true)

    onMount(() => {
        document.title = "Contact Us"
        gsap.set(".sent-text", {y: "-150%"})
    })

    const send_message = (event) => {
        event.preventDefault();
        if (!can_send()) return
        set_can_send(false)

        const text_animation = gsap.timeline({
            defaults: {
                duration: .2,
                ease: "power2.out",
            }
        })
        let split_text = SplitText.create(".send-button")
        split_text.chars.reverse()
        text_animation.to(split_text.chars, {
            y: "150%",
            stagger: .05
        })
        let split_text_sent = SplitText.create(".sent-text")
        split_text_sent.chars.reverse()
        text_animation.to(split_text_sent.chars, {
            y: "0%",
            stagger: .05
        })


        // try {
        //     const response = axios({
        //         method: 'POST',
        //         url: '/api/message',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         data: {
        //             first_name: first_name(),
        //             last_name: last_name(),
        //             contact: email(),
        //             message: message()
        //         }
        //     })
        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }

        set_can_send(true)
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

                    <form
                        onsubmit={send_message}
                        class={"flex flex-col flex-1 w-full xl:w-[65%] mx-auto"}>
                        <header class={"text-7xl"}>Let's Chat!</header>
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
                                    // required
                                />
                            </div>
                        </div>

                        <div class={"w-full mt-[2rem] flex flex-col flex-1"}>
                            <h1 class="text-gray-600 mb-[.25rem]">Message *</h1>
                            <textarea
                                value={message()}
                                oninput={(event) => set_message(event.target.value)}
                                class={"p-[1rem] text-2xl w-full border-[.2rem] border-black flex resize-y overflow-hidden"}
                                // required
                            />
                        </div>

                        <button type={"submit"}
                                class={"send-button relative flex self-end mt-[2rem] w-[12rem] h-[4rem] text-4xl bg-[#ffde71] rounded-full hover:shadow-lg transition duration-300"}>
                            {/*<h1 class={"sent-text text-4xl! relative"}>Sent</h1>*/}
                            {/*<h1 class={"send-text text-4xl! relative"}>Send</h1>*/}
                        </button>
                    </form>

                </section>
            </section>
            <Footer/>
        </>
    )
}