import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="app">
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

          <Route
            path="/orders"
            exact
            render={(props) => <Orders {...props} />}
          />

          <Route
            path="/settings"
            exact
            render={(props) => <Settings {...props} />}
          />

          {/* {routes.map((route, index) => {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.main}
              />
            );
          })} */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
