import {FaBrandsDiscord, FaBrandsInstagram, FaBrandsTiktok, FaBrandsYoutube} from "solid-icons/fa";
import {FiLink} from "solid-icons/fi";

export const Footer = () => {

    return (
        <footer class={"w-full h-fit p-[2rem] bg-black text-white flex flex-col items-center space-y-[1rem]"}>
            <header class={"text-6xl font-semibold"}>JHS KEY CLUB</header>
            <h1 class={"l"}>Email: jhskeyclub21@gmail.com</h1>
            <ul class="flex space-x-[1rem]">
                <a target={"_blank"} href={"https://tiktok.com/@jhskeyclub21"}><FaBrandsTiktok class={"size-[1.5em]"}/></a>
                <a target={"_blank"} href={"https://www.youtube.com/@jhskeyclub4870"}><FaBrandsYoutube class={"size-[1.5em]"}/></a>
                <a target={"_blank"} href={"https://discord.gg/2zqfsWXqzm"}><FaBrandsDiscord class={"size-[1.5em]"}/></a>
                <a target={"_blank"} href={"https://www.instagram.com/jhskeyclub21"}><FaBrandsInstagram class={"size-[1.5em]"}/></a>
                <a target={"_blank"} href={"https://linktr.ee/jhskeyclub21"}><FiLink class={"size-[1.5em]"}/></a>
            </ul>

            <h1>© 2025 JHS Key Club.</h1>
        </footer>
    )
}