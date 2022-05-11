import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Product, Login, Signup, Orders, Settings } from "./pages";

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
