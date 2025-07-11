import {onMount} from "solid-js";
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import membeship_cover from "../assets/membership/membership_cover.jpg";
import members_1 from "../assets/membership/members1.png";
import members_2 from "../assets/membership/members2.png";
import members_3 from "../assets/membership/members3.png";

import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);
export const Membership = () => {
    onMount(() => {
        document.title = "Membership"

        const header_text = SplitText.create(".header-text").words

        gsap.fromTo(header_text, {
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

    return (
        <>
            <Header/>
            <section class={"w-full min-h-screen text-center text-2xl"}>
                <div class={"relative w-full h-[30rem] flex flex-col items-center justify-center"}>
                    <header class={"header-text text-white text-6xl lg:text-7xl"}>
                        REGISTRATION IS CLOSED
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src={membeship_cover}
                         alt="Membership Cover"/>
                </div>

                <section class={"hidden md:block text-xl lg:text-2xl"}>
                    <section class="flex w-full h-[50vh] items-center p-4">
                        <img class={"object-contain h-full w-[40%]"} src={members_1} alt="Members 1"/>
                        <div class={"w-[60%] px-8"}>
                            <header class={"text-4xl mb-8"}>Be a Keyutie</header>
                            <h1>
                                <span class="underline">Get an ASB card!</span> If you don't already have one, go to the
                                ASB office for assistance.
                                <br/><br/>
                                Start your service!
                                <br/><br/>
                                Participate in club events/socials, go to DCMs, and attend club
                                meetings. Requirements are listed below.
                            </h1>
                        </div>
                    </section>

                    <section class="flex w-full h-[50vh] items-center p-4">
                        <div class={"w-[60%] px-8"}>
                            <header class={"text-4xl mb-8"}>Pay Dues</header>
                            <h1>
                                The official dues payments are closed.
                                <br/><br/>
                                Check back next year!
                            </h1>
                        </div>
                        <img class={"object-contain h-full w-[40%]"} src={members_2} alt="Members 2"/>
                    </section>

                    <section class="flex w-full h-[50vh] items-center p-4">
                        <img class={"object-contain h-full w-[40%]"} src={members_3} alt="Members 3"/>
                        <div class={"w-[60%] px-8"}>
                            <header class={"text-4xl mb-8"}>Stay in the Hive</header>
                            <h1>
                                Complete your annual hour requirement of <span class={"underline"}>25 hours</span>!
                                <br/><br/>
                                Attend <span class={"underline"}>50%</span> of the general meetings.
                                <br/><br/>
                                Attend all events you've signed up for. Give a <span
                                class={"underline"}>24 hour notice</span> if you can't make it to an
                                event.
                                Misbehavior or failure to show up to 3 events without advanced notice gets you suspended
                                from Key Club.
                            </h1>
                        </div>
                    </section>
                </section>

                <section class={"block md:hidden p-4"}>
                    <div class={"w-full h-screen flex flex-col items-center justify-center"}>
                        <img class={"object-contain w-[80%]"} src={members_1} alt="Members 1"/>
                        <div class={"w-full"}>
                            <header class={"text-4xl mb-8"}>Be a Keyutie</header>
                            <h1>
                                <span class="underline">Get an ASB card!</span> If you don't already have one, go to the
                                ASB office for assistance.
                                <br/><br/>
                                Start your service!
                                <br/><br/>
                                Participate in club events/socials, go to DCMs, and attend club
                                meetings. Requirements are listed below.
                            </h1>
                        </div>
                    </div>

                    <div class={"w-full h-screen flex flex-col items-center justify-center"}>
                        <img class={"object-contain w-[80%]"} src={members_2} alt="Members 2"/>
                        <div class={"w-full"}>
                            <header class={"text-4xl mb-8"}>Pay Dues</header>
                            <h1>
                                The official dues payments are closed.
                                <br/><br/>
                                Check back next year!
                            </h1>
                        </div>
                    </div>

                    <div class={"w-full h-screen flex flex-col items-center justify-center"}>
                        <img class={"object-contain w-[80%]"} src={members_3} alt="Members 3"/>
                        <div class={"w-full"}>
                            <header class={"text-4xl mb-8"}>Stay in the Hive</header>
                            <h1>
                                Complete your annual hour requirement of <span class={"underline"}>25 hours</span>!
                                <br/><br/>
                                Attend <span class={"underline"}>50%</span> of the general meetings.
                                <br/><br/>
                                Attend all events you've signed up for. Give a <span
                                class={"underline"}>24 hour notice</span> if you can't make it to an
                                event.
                                Misbehavior or failure to show up to 3 events without advanced notice gets you suspended
                                from Key Club.
                            </h1>
                        </div>
                    </div>
                </section>
            </section>
            <Footer/>
        </>
    )
}