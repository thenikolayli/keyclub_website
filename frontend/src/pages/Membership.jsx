import {onMount} from "solid-js";
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import membeship_cover from "../assets/membership/membership_cover.jpg";
import members_1 from "../assets/membership/members1.png";
import members_2 from "../assets/membership/members2.png";
import members_3 from "../assets/membership/members3.png";

export const Membership = () => {
    onMount(() => document.title = "Membership")

    return (
        <>
            <Header/>
            <section class={"w-full min-h-screen  text-center"}>
                <div class={"relative w-full h-[30rem] flex flex-col items-center justify-center"}>
                    <header class={"text-white text-7xl"}>
                        REGISTRATION IS OPEN
                    </header>
                    <img class={"absolute -z-10 top-0 left-0 w-full h-full object-cover"} src={membeship_cover}
                         alt="Membership Cover"/>
                </div>

                <section class="flex flex-col lg:flex-row p-[4rem] justify-center">
                    <img class={"hidden lg:block object-contain mb-0 lg:w-[40%] mx-auto"} src={members_1}
                         alt="Members 1"/>
                    <div class={"flex flex-col items-center justify-center px-[4rem]"}>
                        <header class={"text-6xl mb-[2rem]"}>Be a Keyutie</header>
                        <h1>
                            Get an ASB card! If you don't already have one, go to the ASB office for assistance.
                            Start your service! Participate in club events/socials, go to DCMs, and attend club
                            meetings. Requirements are listed below.
                        </h1>
                    </div>
                    <img class={"block lg:hidden object-contain mt-[2rem] w-[80%] mx-auto"} src={members_1}
                         alt="Members 1"/>
                </section>

                <section class="flex flex-col lg:flex-row p-[4rem] justify-center">
                    <div class={"flex flex-col items-center justify-center px-[4rem]"}>
                        <header class={"text-6xl mb-[2rem]"}>Pay Dues</header>
                        <h1>
                            The official dues payments are closed.
                            <br/>
                            Check back next year!
                        </h1>
                    </div>
                    <img class={"object-contain mt-[2rem] lg:mt-0 w-[80%] lg:w-[40%] mx-auto"} src={members_2} alt="Members 2"/>
                </section>

                <section class="flex flex-col lg:flex-row p-[4rem] justify-center">
                    <img class={"hidden lg:block object-contain mb-0 lg:w-[40%] mx-auto"} src={members_3}
                         alt="Members 3"/>
                    <div class={"flex flex-col items-center justify-center px-[4rem]"}>
                        <header class={"text-6xl mb-[2rem]"}>Stay in the Hive!</header>
                        <h1>
                            Complete your annual hour requirement of 25 hours!
                            <br/><br/>
                            Attend 50% of the general meetings (exceptions for sports apply).
                            <br/><br/>
                            Attend all events you've signed up for. Give a 24 hour notice if you can't make it to an
                            event.
                            Misbehavior or failure to show up to 3 events without advanced notice gets you suspended
                            from Key Club.
                        </h1>
                    </div>
                    <img class={"block lg:hidden object-contain mt-[2rem] w-[80%] my-auto mx-auto"} src={members_3}
                         alt="Members 3"/>
                </section>
            </section>
            <Footer/>
        </>
    )
}