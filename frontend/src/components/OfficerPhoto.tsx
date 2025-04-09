import {onMount} from "solid-js";
import gsap from "gsap";

const OfficerPhoto = (props: any) => {
    let ref: any

    onMount(() => {
        gsap.set(ref, {opacity: 0})
    })

    const show_secondary = (start: boolean) => {
        gsap.to(ref, {
            opacity: start ? 1 : 0,
            duration: .4,
            ease: "power2.out"
        })
    }

    return (
        <div class={"mx-auto max-w-[18rem] h-fit p-[1rem] bg-white shadow-xl break-words"}>
            <div
                onmouseenter={() => show_secondary(true)}
                onmouseleave={() => show_secondary(false)}
                class="relative w-[16rem] h-[16rem] my-[1rem]">
                <img class={"absolute top-0 left-0 size-[16rem] aspect-square"} src={props.img_src} alt={props.name}/>
                <img ref={ref} class={"z-10 absolute top-0 left-0 size-[16rem] aspect-square"} src={props.img2} alt={props.name}/>
            </div>
            <h1 class={"font-semibold"}>{props.role}</h1>
            <h1 class={"text-2xl!"}>{props.name}</h1>
            <h1 class={"text-lg!"}>{props.email}</h1>
        </div>
    )
}

export default OfficerPhoto;