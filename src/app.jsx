import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getCurrentUserRequest } from "./actions/user";
import { isEmpty } from "lodash";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";

import ProtectedRoute from "./components/ProtectedRoute";

// import routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const { currentUser, token, userLoading, userErr } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  if (userLoading) return <Loading errMsg={userLoading} />;
  if (!isEmpty(userErr)) return <Loading errMsg={userErr} />;

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home {...props} currentUser={currentUser} token={token} />
            )}
          />

          <Route path="/login" exact render={(props) => <Login {...props} />} />

          <Route
            path="/signup"
            exact
            render={(props) => <Signup {...props} />}
          />

          <Route
            path="/:productId"
            render={(props) => (
              <Product {...props} currentUser={currentUser} token={token} />
            )}
          />

          <ProtectedRoute token={token}>
            <Route
              path="/orders"
              exact
              render={(props) => (
                <Orders {...props} currentUser={currentUser} token={token} />
              )}
            />
          </ProtectedRoute>

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
