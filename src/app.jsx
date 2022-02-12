import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './routes';

function App () {
  const switchRoute = routes => {
    var result = null;
    if (routes) {
      result = routes.map ((route, index) => {
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.main}
          />
        );
      });
    }
    return result;
  };

  return (
    <Router>
      <div className="app">
        <Switch>{switchRoute (routes)}</Switch>
      </div>
    </Router>
  );
}

export default App;