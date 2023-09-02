import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
// import { useHistory } from 'react-router-dom';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));

const LazyAuthenticationApp = lazy(() =>
  import('./components/AuthenticationApp')
);

const LazyDashboardApp = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <div>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <LazyAuthenticationApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" exact component={LazyMarketingApp} />
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <LazyDashboardApp />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};
