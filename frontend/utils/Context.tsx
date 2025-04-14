import {createContext, createSignal, onMount} from "solid-js";
import Lenis from "lenis";

const UtilContext = createContext()

export default UtilContext;

const UtilContextProvider = (props: any) => {
    const [lenis, set_lenis] = createSignal()

    // so lenis methods could be accessed anywhere
    onMount(() => {
        const temp_lenis = new Lenis({
            autoRaf: true
        })
        set_lenis(temp_lenis)
    })

    return (
        <UtilContext.Provider value={{lenis: lenis}}>
            {props.children}
        </UtilContext.Provider>
    )
}

export {UtilContextProvider}