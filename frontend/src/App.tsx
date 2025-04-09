import {Route, Router} from "@solidjs/router";
import Home from "./pages/Home.tsx"
import About from "./pages/About.tsx";

const App = () => (
    <Router>
        <Route path={"/"} component={Home}/>
        <Route path={"/about"} component={About}/>
    </Router>
)

export default App