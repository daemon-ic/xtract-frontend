import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login_folder/LoginPage";
import Dashboard from "./pages/dashboard_folder/Dashboard";
import LandingPage from "./pages/landing_folder/LandingPage";

// NOTE: router own component, seperate from app
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/landing" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
