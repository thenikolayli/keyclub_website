import {Route, Router} from "@solidjs/router";
import Home from "./pages/Home.tsx"
import {UtilContextProvider} from "../utils/Context.tsx";
import About from "./pages/About.tsx";

const App = () => {

    return (
        <UtilContextProvider>
            <Router>
                <Route path={"/"} component={Home}/>
                <Route path={"/about"} component={About}/>
            </Router>
        </UtilContextProvider>
    )
}

export default App