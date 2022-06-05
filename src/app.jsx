import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { MouseCtx } from "./context/mouse";
import { Home, Product, Login, Signup, Orders, Settings } from "./pages";

function App() {
  const { setCorr } = useContext(MouseCtx);
  
  const updateMouseClickedLocation = (e) => {
    setCorr({
      xCorr: e.clientX,
      yCorr: e.clientY,
    });
  };

  return (
    <Router>
      <div className="app" onClick={updateMouseClickedLocation}>
        <Switch>
          <Route
            path="/products/:productId"
            render={(props) => <Product {...props} />}
          />
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/signup"
            exact
            render={(props) => <Signup {...props} />}
          />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <ProtectedRoute exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
