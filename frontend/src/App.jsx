import {Route, Router} from "@solidjs/router";
import {Home} from "./pages/Home.jsx"
import {UtilContextProvider} from "../utils/Context.jsx";
import {About} from "./pages/About.jsx";
import {Events} from "./pages/Events.jsx";
import {DistrictProject} from "./pages/DistrictProject.jsx";
import {Membership} from "./pages/Membership.jsx";
import {ContactUs} from "./pages/ContactUs.jsx";
import {TestPage} from "./pages/TestPage.jsx";
import Lenis from "lenis";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import {Gallery} from "./pages/Gallery.jsx";

export const App = () => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0)

    return (
        <UtilContextProvider>
            <Router>
                <Route path={"/"} component={Home}/>
                <Route path={"/about"} component={About}/>
                <Route path={"/events"} component={Events}/>
                <Route path={"/districtproject"} component={DistrictProject} />
                <Route path={"/membership"} component={Membership} />
                <Route path={"/contact"} component={ContactUs} />
                <Route path={"/gallery"} component={Gallery} />
                <Route path={"/test"} component={TestPage} />
            </Router>
        </UtilContextProvider>
    )
}