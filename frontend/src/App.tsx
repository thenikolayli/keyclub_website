import {Route, Router} from "@solidjs/router";
import {Home} from "./pages/Home.tsx"
import {UtilContextProvider} from "../utils/Context.tsx";
import {About} from "./pages/About.tsx";
import {Events} from "./pages/Events.tsx";
import {DistrictProject} from "./pages/DistrictProject.tsx";
import {Membership} from "./pages/Membership.tsx";

export const App = () => {

    return (
        <UtilContextProvider>
            <Router>
                <Route path={"/"} component={Home}/>
                <Route path={"/about"} component={About}/>
                <Route path={"/events"} component={Events}/>
                <Route path={"/districtproject"} component={DistrictProject} />
                <Route path={"/membership"} component={Membership} />
            </Router>
        </UtilContextProvider>
    )
}