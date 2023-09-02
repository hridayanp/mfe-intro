import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
// import { useHistory } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Progress from './components/Progress';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));

const LazyAuthenticationApp = lazy(() =>
  import('./components/AuthenticationApp')
);

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={LazyAuthenticationApp} />
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
