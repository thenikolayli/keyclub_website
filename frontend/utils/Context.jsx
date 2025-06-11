import {createContext} from "solid-js";

const UtilContext = createContext()

export default UtilContext;

const UtilContextProvider = (props) => {
    return (
        <UtilContext.Provider value={{value: null}}>
            {props.children}
        </UtilContext.Provider>
    )
}

export {UtilContextProvider}