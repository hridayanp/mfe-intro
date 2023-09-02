import React, { lazy, Suspense, useState } from 'react';
import Header from './components/Header';
// import { useHistory } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Progress from './components/Progress';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));

const LazyAuthenticationApp = lazy(() =>
  import('./components/AuthenticationApp')
);

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
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
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
