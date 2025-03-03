import { Switch, Route } from "wouter";
import Calculator from "@/pages/calculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Calculator} />
    </Switch>
  );
}

function App() {
  return (
    <Router />
  );
}

export default App;