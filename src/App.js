import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CityPage from "./components/CityPage";

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="main-header">Weather-Radar</h1>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route path="/:cityId" component={CityPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
