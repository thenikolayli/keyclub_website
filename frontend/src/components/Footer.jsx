import {FaBrandsDiscord, FaBrandsInstagram, FaBrandsTiktok, FaBrandsYoutube} from "solid-icons/fa";
import {FiLink, FiMail} from "solid-icons/fi";
import {A} from "@solidjs/router"


export const Footer = () => {

    return (
        <footer class={"w-full h-fit p-8 bg-kcblack text-white"}>
            <header class={"text-4xl"}>Henry M. Jackson High School Key Club</header>

            <h1 class={"text-xl text-white/80 flex items-center"}><FiMail/>
            <span class={"ml-2"}>jhskeyclub21@gmail.com</span></h1>

            <ul class="flex space-x-4 my-8 mx-auto w-fit">
                <A target={"_blank"} href={"https://tiktok.com/@jhskeyclub21"}><FaBrandsTiktok class={"size-[1.5em]"}/></A>
                <A target={"_blank"} href={"https://www.youtube.com/@jhskeyclub4870"}><FaBrandsYoutube class={"size-[1.5em]"}/></A>
                <A target={"_blank"} href={"https://discord.gg/2zqfsWXqzm"}><FaBrandsDiscord class={"size-[1.5em]"}/></A>
                <A target={"_blank"} href={"https://www.instagram.com/jhskeyclub21"}><FaBrandsInstagram class={"size-[1.5em]"}/></A>
                <A target={"_blank"} href={"https://linktr.ee/jhskeyclub21"}><FiLink class={"size-[1.5em]"}/></A>
            </ul>

            <h1 class="text-xl">©2025 Henry M. Jackson High School Key Club.</h1>
        </footer>
    )
}