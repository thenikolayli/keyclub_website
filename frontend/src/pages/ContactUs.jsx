import {createEffect, createSignal, onMount} from "solid-js";
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
        gsap.set(".button-text-2", {yPercent: 120})
    })

    // hover animation
    const button_animation = (start) => {
        gsap.to(".button-background", {
            transformOrigin: "top center",
            scaleY: start ? 0 : 1,
            ease: "power2.out",
            duration: .1
        })
    }

    const animate_input = (field, selector, is_mouse_inside) => {
        gsap.to(selector, {
            scale: field() !== "" || is_mouse_inside ? .8 : 1,
            y: field() !== "" || is_mouse_inside ? "-80%" : 1,
            opacity: field() !== "" || is_mouse_inside ? .8 : 1,
            ease: "power2.out",
            transformOrigin: "top left",
            duration: .2
        })
    }

    // animates text when typing and cursor not inside input
    createEffect(() => {
        animate_input(first_name, ".first-name", false)
        animate_input(last_name, ".last-name", false)
        animate_input(email, ".email", false)
    })

    const send_message = (event) => {
        event.preventDefault();
        if (!can_send()) return
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

        // sent animation
        const timeline = gsap.timeline()
        timeline.to(".button-text", {
            yPercent: -120,
            duration: .2,
            ease: "power2.out",
        }, 0)
        timeline.to(".button-text-2", {
            yPercent: 0,
            duration: .2,
            ease: "power2.out",
        }, 0)

        setTimeout(() => {
            timeline.reverse()
            set_can_send(true)
        }, 2000)
    }

    return (
        <>
            <Header/>
            <section class="w-full min-h-screen flex flex-col">
                <div class={"relative w-full h-[30rem] flex flex-col items-center justify-center"}>
                    <header class={"text-white text-6xl lg:text-7xl"}>
                        CONTACT US
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src={contact_cover}
                         alt="Contact Us Cover"/>
                </div>

                <form
                    onsubmit={send_message}
                    class={"flex flex-col w-full md:w-[80%] xl:w-[65%] mx-auto my-16 px-12"}>
                    <header class={"text-7xl"}>Let's Chat!</header>

                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full mt-12 text-3xl">

                        <div class={"relative border-b-3 border-kcyellow"}
                             onmouseenter={() => animate_input(first_name, ".first-name", true)}
                             onmouseleave={() => animate_input(first_name, ".first-name", false)}
                        >
                            <input class={"outline-none relative z-10"} type="text" value={first_name()}
                                   oninput={(event) => set_first_name(event.target.value)}
                            />
                            <h1 class={"first-name absolute top-0 left-0"}>First Name</h1>
                        </div>

                        <div class={"relative border-b-3 border-kcyellow"}
                             onmouseenter={() => animate_input(last_name, ".last-name", true)}
                             onmouseleave={() => animate_input(last_name, ".last-name", false)}
                        >
                            <input class={"outline-none relative z-10"} type="text" value={last_name()}
                                   oninput={(event) => set_last_name(event.target.value)}
                            />
                            <h1 class={"last-name absolute top-0 left-0"}>Last Name</h1>
                        </div>

                        <div class={"relative border-b-3 border-kcyellow"}
                             onmouseenter={() => animate_input(email, ".email", true)}
                             onmouseleave={() => animate_input(email, ".email", false)}
                        >
                            <input class={"outline-none relative z-10"} type="text" value={email()}
                                   oninput={(event) => set_email(event.target.value)}
                                // required
                            />
                            <h1 class={"email absolute top-0 left-0"}>Email *</h1>
                        </div>
                    </div>

                    <div class={"w-full mt-8 text-3xl"}>
                        <h1 class="mb-1">Message *</h1>
                        <textarea
                            value={message()}
                            oninput={(event) => set_message(event.target.value)}
                            class={"p-4 text-2xl w-full border-3 border-kcyellow resize-y overflow-hidden outline-none"}
                            rows={10}
                            // required
                        />
                    </div>

                    <button type={"submit"}
                            class={"relative flex self-end p-2 px-8 mt-8 border-3 border-kcyellow overflow-hidden"}
                            onmouseenter={() => button_animation(true)}
                            onmouseleave={() => button_animation(false)}
                    >
                        <h1 class={"button-text text-4xl text-kcblack z-10"}>Send</h1>
                        <h1 class={"button-text-2 text-4xl text-kcblack z-10 absolute"}>Sent!</h1>
                        <div class="button-background absolute top-0 left-0 z-0 w-full h-full bg-kcyellow"></div>
                    </button>
                </form>
            </section>
            <Footer/>
        </>
    )
}