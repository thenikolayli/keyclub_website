import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import sead from "../assets/districtproject/sead.jpg";
import sead_logo from "../assets/districtproject/sead_logo.png";
import {onMount} from "solid-js";

export const DistrictProject = () => {
    onMount(() => document.title = "District Project")
    return (
        <>
            <section class="w-full h-screen flex flex-col">
                <Header/>
                <div class="relative flex flex-1 p-[2rem] text-white">
                    <div>
                        <header class={"text-6xl"}>The SEAD: End Youth Houselessness Initiative</header>
                        <h1 class={"text-2xl! mt-[1rem] leading-10"}>
                            The 2024-2025 PNW District Project is The SEAD: End Youth Houselessness Initiative.
                            SEAD stands for Support, Empower, Act, and Destigmatize.
                            Chosen by last year's District Governor, Isabella Baldisseri, and approved by the District Board, the SEAD Initiative aims to guide Key Clubbers in serving their community by addressing the widespread pattern of Youth Houselessness within the PNW.
                            Our goal for this District Project is to provide Key Clubbers and Kiwanians with resources, knowledge, and inspiration to make a direct impact locally.
                            The District Project is not limited to specific organizations, so all Key Clubbers can find unique and impactful ways to serve.
                            Some good ways to begin volunteering are hosting a food or collection drive, holding a fundraiser, and volunteering at shelters or food banks.
                            As a District, we hope to raise $15,000 for local nonprofits addressing youth houselessness and serve 10,000 hours.
                        </h1>
                    </div>

                    <img class={"size-[25rem] my-auto"} src={sead_logo} alt="SEAD Logo"/>

                    <img class={"absolute top-0 left-0 -z-10 h-full w-full object-cover"} src={sead} alt="Cover image"/>
                </div>
            </section>
            <Footer/>
        </>
    )
}